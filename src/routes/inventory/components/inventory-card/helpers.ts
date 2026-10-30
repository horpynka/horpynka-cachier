import { InventoryDto } from "@horpynka/api-sdk";

export const getStatusLabel = (status: InventoryDto['status']) => {
  if (status === 'COMPLETED') {
    return 'Завершена';
  }

  if (status === 'WITH_DIFFERENCES') {
    return 'Є розбіжності';
  }

  return 'Чернетка';
};

export const getStatusClassName = (status: InventoryDto['status']) => {
  if (status === 'COMPLETED') {
    return 'bg-success/15 text-success';
  }

  if (status === 'WITH_DIFFERENCES') {
    return 'bg-warning/15 text-warning';
  }

  return 'bg-muted text-muted-foreground';
};