import { useCallback, useState } from 'react'
import { Select, Input, Field, Label, Button } from '@headlessui/react'
import type { Product } from '../model/Product';

interface OrderFormProps {
  initialValue?: {
    clientName: string,
    productId: string
  }
  onSubmit: any;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 },
  { id: 4, name: 'Tablet', price: 499 },
];

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const [formData, setFormData] = useState({ clientName: '', productId: '' });
  const handleSubmit = useCallback(() => {
    onSubmit(formData);
    setFormData({ clientName: '', productId: '' });
  }, [formData, onSubmit]);

  return (
    <form id="orderForm" action={handleSubmit} >
      <div className="space-y-12" >
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <Field className="col-span-full">
              <Label htmlFor="clientName" className="block text-sm/6 font-medium text-gray-900">Custom Name: </Label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-600">
                  <Input
                    id="clientName"
                    name="clientName"
                    placeholder="Type..."
                    type="text"
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    value={formData.clientName}
                    onChange={e => setFormData(d => ({ ...d, clientName: e.target.value }))} />
                </div>
              </div>
            </Field>
            <Field className="col-span-full">
              <Label htmlFor="productId" className="block text-sm/6 font-medium text-gray-900">Product: </Label>
              <div className="mt-2">
                <Select
                  id="productId"
                  name="productId"
                  aria-label="Product Item"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6"
                  value={formData.productId}
                  onChange={e => setFormData(d => ({ ...d, productId: e.target.value }))}>
                  {products.map(p => <option key={p.id} value={p.id}>{`${p.name} ($ ${p.price})`}</option>)}
                </Select>
              </div>
            </Field>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Button
          disabled={!formData?.clientName || !formData?.productId}
          type="submit"
          className="rounded-md px-3 py-2 text-sm font-semibold shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 text-green-900"
        >
          Submit
        </Button>
      </div>
    </form>
  )
}