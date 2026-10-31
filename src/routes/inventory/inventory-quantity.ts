import type {
  InventoryItemDto,
  InventoryItemDtoMeasurementUnitEnum,
  SaveInventoryDto,
  SaveInventoryItemDto,
} from '@horpynka/api-sdk';

export const UNIT_LABEL: Record<InventoryItemDtoMeasurementUnitEnum, string> = {
  g: 'г',
  ml: 'мл',
  pcs: 'шт',
};

export const CATEGORY_CHIPS: {
  id: InventoryItemDtoMeasurementUnitEnum;
  name: string;
}[] = [
  { id: 'g', name: 'г' },
  { id: 'ml', name: 'мл' },
  { id: 'pcs', name: 'шт' },
];

export type InventoryCategory = 'all' | InventoryItemDtoMeasurementUnitEnum;

export type CountFormValues = {
  quantities: Record<string, string>;
};

export const parseActualQuantity = (raw: string | undefined): number | null | undefined => {
  if (raw == null) {
    return null;
  }

  const trimmed = raw.trim();

  if (trimmed === '') {
    return null;
  }

  if (!/^\d+$/.test(trimmed)) {
    return undefined;
  }

  const value = Number(trimmed);

  if (!Number.isSafeInteger(value)) {
    return undefined;
  }

  return value;
};

export const countedDifference = (
  actual: number | null | undefined,
  expected: number,
): number | null => {
  if (typeof actual !== 'number') {
    return null;
  }

  return actual - expected;
};

export const formatDifference = (difference: number | null, unit: string) => {
  if (difference === null) {
    return '—';
  }

  if (difference > 0) {
    return `+${difference} ${unit}`;
  }

  return `${difference} ${unit}`;
};

export const differenceClassName = (difference: number | null) => {
  if (difference === null || difference === 0) {
    return 'text-muted-foreground';
  }

  return difference > 0 ? 'text-success' : 'text-destructive';
};

export const quantitiesFromItems = (items: InventoryItemDto[]): CountFormValues['quantities'] =>
  Object.fromEntries(
    items.map((item) => [
      String(item.id),
      item.actualQuantity === null ? '' : String(item.actualQuantity),
    ]),
  );

/**
 * The generated client types `items` as Set, and JSON turns a Set into {}.
 * The API accepts an array of counted rows.
 */
export const toSaveInventoryDto = (items: SaveInventoryItemDto[]): SaveInventoryDto => ({
  items: items as unknown as SaveInventoryDto['items'],
});

export const mutationErrorMessage = (error: unknown, fallback: string) => {
  if (!error || typeof error !== 'object' || !('response' in error)) {
    return fallback;
  }

  const response = error.response;

  if (!response || typeof response !== 'object' || !('data' in response)) {
    return fallback;
  }

  const data = response.data;

  if (!data || typeof data !== 'object' || !('message' in data)) {
    return fallback;
  }

  const message = data.message;

  if (typeof message === 'string' && message.trim()) {
    return message;
  }

  if (Array.isArray(message)) {
    const lines = message.filter(
      (line): line is string => typeof line === 'string' && line.trim().length > 0,
    );

    if (lines.length > 0) {
      return lines.join(' ');
    }
  }

  return fallback;
};
