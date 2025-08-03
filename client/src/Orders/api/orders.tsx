import useSWR from 'swr';
import type { Order } from '@shared/model/Order';
import type { SWRConfiguration } from 'swr';

const ORDERS_URL = "/api/orders";
const ORDER_CREATE_URL = "/api/order";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    return res.json();
  });

async function addOrder(order: Order): Promise<Order> {
  const response = await fetch(ORDER_CREATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create order: ${response.status} ${errorText}`);
  }

  return response.json();
}

export interface OnAddCallbackParam {
  success: boolean;
  error?: unknown;
}
interface UseOrdersOptions {
  onAdd?: (result: OnAddCallbackParam) => void;
  config?: SWRConfiguration<Order[]>;
}

export const useOrders = ({ onAdd, config }: UseOrdersOptions = {}) => {
  const { data, mutate, isLoading, } = useSWR(ORDERS_URL, fetcher, { refreshInterval: 1000, ...config });
  const addItem = async (newOrder: Order) => {
    try {
      await mutate(addOrder(newOrder), {
        optimisticData: [...data, newOrder],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
      });
      onAdd?.({ success: true });
    } catch (e) {
      onAdd?.({ success: false, error: e });
    }
  };
  return { data, addItem, isLoading }
}




