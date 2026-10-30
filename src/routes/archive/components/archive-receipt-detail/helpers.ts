import type { OrderItem } from '@horpynka/api-sdk';

import { moneyService } from '@/src/utils/money-service';

export type BoughtLine = {
  key: string;
  name: string;
  meta: string;
  quantity: number;
  unitPrice: number;
  discountLabel: string | null;
};

const itemName = (item: OrderItem) => item.product?.name ?? item.dish?.name ?? 'Без назви';

const itemKind = (item: OrderItem) => {
  if (item.dishId != null) {
    return 'Страва';
  }

  if (item.productId != null) {
    return 'Товар';
  }

  return null;
};

const itemMeta = (item: OrderItem) => {
  const category = item.product?.category?.name ?? item.dish?.category?.name ?? null;

  return [itemKind(item), category].filter((part) => part).join(' · ');
};

export const boughtQuantityLabel = (quantity: number) => {
  const lastTwo = quantity % 100;
  const last = quantity % 10;

  if (last === 1 && lastTwo !== 11) {
    return `${quantity} позиція`;
  }

  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) {
    return `${quantity} позиції`;
  }

  return `${quantity} позицій`;
};

const discountLabel = (item: OrderItem): string | null => {
  const value = item.discount?.trim() ?? '';

  switch (item.discountType) {
    case 'NONE':
      return null;
    case 'PERCENT':
      if (value === '') {
        return null;
      }

      return value.endsWith('%') ? `Знижка ${value}` : `Знижка ${value}%`;
    case 'AMOUNT':
      if (value === '') {
        return null;
      }

      if (/^\d+$/.test(value)) {
        return `Знижка ${moneyService.toMoney(Number(value))}`;
      }

      return `Знижка ${value}`;
    default: {
      const exhaustive: never = item.discountType;
      return exhaustive;
    }
  }
};

export const groupBoughtLines = (items: OrderItem[]): BoughtLine[] => {
  const groups = new Map<string, BoughtLine>();

  for (const item of items) {
    const name = itemName(item);
    const meta = itemMeta(item);
    const discount = discountLabel(item);
    const key = [
      item.productId ?? '',
      item.dishId ?? '',
      name,
      item.sellingPrice,
      item.discountType,
      item.discount ?? '',
    ].join(':');
    const existing = groups.get(key);

    if (existing) {
      existing.quantity += 1;
      continue;
    }

    groups.set(key, {
      key,
      name,
      meta,
      quantity: 1,
      unitPrice: item.sellingPrice,
      discountLabel: discount,
    });
  }

  return [...groups.values()];
};
