import type { InventoryDtoStatusEnum } from '@horpynka/api-sdk';

export const isInventoryReadOnly = (status: InventoryDtoStatusEnum) => status !== 'IN_PROGRESS';

export const inventoryStatusLabel = (status: InventoryDtoStatusEnum) =>
  status === 'IN_PROGRESS' ? 'Чернетка' : 'Завершена';
