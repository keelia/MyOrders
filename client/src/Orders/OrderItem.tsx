import type { Order } from "@shared/model/Order";

export default function OrderItem(props: Order) {
  return (
    <div className="w-full flex justify-between">
      <p className="text-sm/6 font-semibold text-gray-900">{props?.id}</p>
      <p className="text-sm/6 font-semibold text-gray-900">{props.clientName}</p>
      <p className="truncate text-xs/5 text-gray-500">{props.status}</p>
    </div>
  )
}

