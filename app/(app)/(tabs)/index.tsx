import { ActiveReceiptList } from '@/src/routes/home/components/active-receipt-list';
import { CreateReceiptButton } from '@/src/routes/home/components/create-receipt-button';
import { HomeStatCards } from '@/src/routes/home/components/home-stat-cards';
import { OpenReceiptsHeader } from '@/src/routes/home/components/open-receipts-header';
import { QuickLinks } from '@/src/routes/home/components/quick-links';
import { useStore } from '@/src/store';
import { CashShiftDto, DashboardStatsDto, Order, useCashShiftsApi, useDashboardApi, useOrdersApi } from '@horpynka/api-sdk';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const DRAFT_STATUS = 'CREATED' as const;

export default function Index() {
  const router = useRouter();
  const setReceipt = useStore((s) => s.setReceipt);
  const { getOrdersQuery, mutateCreateOrder } = useOrdersApi();
  const { getCashShiftsQuery } = useCashShiftsApi();
  const { getStatsQuery } = useDashboardApi();

  const { data: orders = [] } = useQuery<Order[]>(getOrdersQuery({ status: DRAFT_STATUS, limit: 100 }));
  const { data: shifts = [] } = useQuery<CashShiftDto[]>(getCashShiftsQuery());
  const { data: stats } = useQuery<DashboardStatsDto>(getStatsQuery());

  const isShiftOpen = shifts.some((shift) => shift.status === 'OPEN');

  const onCreateReceipt = () => {
    mutateCreateOrder.mutate(
      {
        params: {
          createOrderDto: {
            status: DRAFT_STATUS,
            orderPrice: 0,
            paidWithCash: 0,
            paidWithCard: 0,
            refundedWithCash: 0,
            refundedWithCard: 0,
          },
        },
      },
      {
        onSuccess: (response) => {
          setReceipt(response.data);
          router.push(`/receipts/${response.data.id}`);
        },
      },
    );
  };

  return (
    <View className="flex-1 flex-row gap-5">
      <View className="min-w-0 flex-1 gap-4">
        <OpenReceiptsHeader count={orders.length} />
        <ActiveReceiptList receipts={orders} />
      </View>
      <View className="w-[360px] gap-3">
        <CreateReceiptButton onPress={onCreateReceipt} disabled={mutateCreateOrder.isPending} />
        <HomeStatCards isShiftOpen={isShiftOpen} stats={stats} />
        <QuickLinks />
      </View>
    </View>
  );
}
