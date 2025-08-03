import { useCallback, useState } from 'react'
import List from '../components/List/List'
import Model from '../components/Model/Model'
import OrderItem from './OrderItem'
import OrderForm from './OrderForm'
import { useOrders, type OnAddCallbackParam } from './api/orders'
import type { Order } from '../../../shared/model/Order'
import Alert from 'src/components/Alert/Alert'

export default function Orders() {
  const [error, setError] = useState<string | undefined>();
  const onAdd = useCallback(({ success, error }: OnAddCallbackParam) => {
    if (!success) {
      setError(String(error))
    }
  }, [])
  const { data, addItem, isLoading } = useOrders({ onAdd });
  const [open, setOpen] = useState(false);
  return (
    <div className='mt-2'>
      <Alert message={error} />
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
