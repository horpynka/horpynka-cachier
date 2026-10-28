import { type FindAllStatusEnum, type Order, useOrdersApi } from '@horpynka/api-sdk';
import { useQueries, type UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { Text, View } from 'react-native';

import {
  ArchivePeriodFilter,
  archivePeriodRange,
  type ArchivePeriod,
} from '@/src/routes/archive/components/archive-period-filter';
import { ArchiveReceiptList } from '@/src/routes/archive/components/archive-receipt-list';
import { ArchiveSearch } from '@/src/routes/archive/components/archive-search';
import { ArchiveSort, type ArchiveSortMode } from '@/src/routes/archive/components/archive-sort';
import { isClosedOrder } from '@/src/routes/archive/order-labels';
import { dateFns } from '@/src/utils/date-fns';

const CLOSED_STATUSES = ['PAID', 'CANCELLED', 'REFUNDED', 'COMPLETED'] as const satisfies readonly FindAllStatusEnum[];

const sortOrders = (orders: Order[], sort: ArchiveSortMode): Order[] => {
  return [...orders].sort((left, right) => {
    if (sort === 'old') {
      return dateFns.compareAsc(left.createdAt, right.createdAt);
    }

    if (sort === 'sum_asc') {
      return left.orderPrice - right.orderPrice;
    }

    if (sort === 'sum_desc') {
      return right.orderPrice - left.orderPrice;
    }

    return dateFns.compareDesc(left.createdAt, right.createdAt);
  });
};

export default function ArchiveScreen() {
  const [period, setPeriod] = useState<ArchivePeriod>('all');
  const [sort, setSort] = useState<ArchiveSortMode>('new');
  const [search, setSearch] = useState('');
  const { from, to } = archivePeriodRange(period);
  const trimmedSearch = search.trim();
  const { getOrdersQuery } = useOrdersApi();

  const orderQueries: UseQueryResult<Order[]>[] = useQueries({
    queries: CLOSED_STATUSES.map((status) =>
      getOrdersQuery({
        status,
        search: trimmedSearch || undefined,
        from,
        to,
        limit: 100,
      }),
    ),
  });

  const orders = sortOrders(
    orderQueries.flatMap((query) => query.data ?? []).filter(isClosedOrder),
    sort,
  );
  const isLoading = orderQueries.some((query) => query.isLoading);

  return (
    <View className="h-full w-full max-w-6xl gap-4 self-center">
      <Text className="text-2xl font-bold tracking-tight">Архів чеків</Text>
      <ArchiveSearch value={search} onChange={setSearch} />
      <ArchivePeriodFilter value={period} onChange={setPeriod} />
      <ArchiveSort value={sort} onChange={setSort} />
      <ArchiveReceiptList orders={orders} isLoading={isLoading} />
    </View>
  );
}
