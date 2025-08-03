import { useState } from 'react'
import List from '../components/List/List'
import Model from '../components/Model/Model'
import OrderItem from './OrderItem'
import OrderForm from './OrderForm'
import { useOrders } from './api/orders'
import type { Order } from '../../../shared/model/Order'

export default function Orders() {
  const { data, addItem, isLoading } = useOrders({ refreshInterval: 1000 });
  const [open, setOpen] = useState(false);
  return (
    <div className='mt-2'>
      {isLoading ? <p>Loading</p> : (
        !!data?.length ? <List
          header={<div className='flex justify-between items-center'>
            <div>
              Orders
            </div>
            <Model buttonTitle='Add Order' title='Order Form' open={open}
              setOpen={setOpen}>
              <OrderForm onSubmit={(order: Order) => {
                addItem(order)
                setOpen(false)
              }} />
            </Model>
          </div>}
          dataSource={data as Order[]}
          renderItem={(item: Order) => <OrderItem name={item.clientName} status={item.status} />} /> : <p>No Orders</p>
      )}
    </div>
  )
}
