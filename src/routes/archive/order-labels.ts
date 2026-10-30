import type { Order, OrderStatusEnum } from '@horpynka/api-sdk';

type StatusTone = {
  label: string;
  containerClassName: string;
  textClassName: string;
};

export const archiveStatusTone = (status: OrderStatusEnum): StatusTone => {
  switch (status) {
    case 'COMPLETED':
      return {
        label: 'Завершений',
        containerClassName: 'bg-success/15',
        textClassName: 'text-success',
      };
    case 'PAID':
      return {
        label: 'Оплачений',
        containerClassName: 'bg-success/15',
        textClassName: 'text-success',
      };
    case 'REFUNDED':
      return {
        label: 'Повернений',
        containerClassName: 'bg-warning/20',
        textClassName: 'text-warning-foreground',
      };
    case 'CANCELLED':
      return {
        label: 'Скасований',
        containerClassName: 'bg-destructive/15',
        textClassName: 'text-destructive',
      };
    case 'CREATED':
      return {
        label: 'Чернетка',
        containerClassName: 'bg-muted',
        textClassName: 'text-muted-foreground',
      };
    case 'DELETED':
      return {
        label: 'Видалений',
        containerClassName: 'bg-destructive/15',
        textClassName: 'text-destructive',
      };
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
};

export const paymentLabel = (order: Pick<Order, 'paidWithCash' | 'paidWithCard'>): string => {
  const cash = order.paidWithCash > 0;
  const card = order.paidWithCard > 0;

  if (cash && card) {
    return 'Комбі';
  }

  if (cash) {
    return 'Готівка';
  }

  if (card) {
    return 'Картка';
  }

  return '—';
};

export const isClosedOrder = (order: Pick<Order, 'status'>): boolean => {
  return order.status !== 'CREATED' && order.status !== 'DELETED';
};
