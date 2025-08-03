const OrderStatus = {
  Pending: 'Pending',
  Processing: 'Processing',
  Completed: 'Completed',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface Order {
  id?: number;
  clientName: string;
  productId: string;
  status: OrderStatus;
  createAt?: number;
  updateAt?: number;
}
