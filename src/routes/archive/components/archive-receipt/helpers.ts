import type { Order, OrderItem } from '@horpynka/api-sdk';

export const getStatusLabel = (status: Order['status']) => {
  if (status === 'COMPLETED') return 'Завершений';
  if (status === 'REFUNDED') return 'Повернений';
  if (status === 'CANCELLED') return 'Скасований';
  return 'Чернетка';
};

export const getPaymentLabel = (order: Order) => {
  const cash = order.paidWithCash > 0;
  const card = order.paidWithCard > 0;
  if (cash && card) return 'Комбі';
  if (cash) return 'Готівка';
  if (card) return 'Картка';
  return '—';
};

export const getItemName = (item: OrderItem) => item.product?.name ?? item.dish?.name ?? '—';

export const getItemUnit = (item: OrderItem) => {
  const unit = item.product?.measurementUnit;
  if (unit === 'g') return 'г';
  if (unit === 'ml') return 'мл';
  if (unit === 'pcs' || item.dish) return 'шт';
  return '—';
};
