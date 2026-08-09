import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ordersApi } from "../client"

export const useOrdersApi = () => {
  const queryClient = useQueryClient()

  const mutateDeleteReceipt = useMutation({
    mutationFn: ({ params: { id } }: { params: { id: number }; onSettledCallback?: () => void }) =>
      ordersApi.removeActiveReceipt(id),
    onSettled: (_data, _error, { onSettledCallback }) => {
      queryClient.invalidateQueries({ queryKey: ["receipts"] })
      onSettledCallback && onSettledCallback?.()
    },
  })

  return {
    mutateDeleteReceipt,
  }
}
