
interface OrderItemProps {
  name: string;
  status: string
}

export default function OrderItem(props: OrderItemProps) {
  return (
    <div className="w-full flex justify-between">
      <p className="text-sm/6 font-semibold text-gray-900">{props.name}</p>
      <p className="truncate text-xs/5 text-gray-500">{props.status}</p>
    </div>
  )
}

