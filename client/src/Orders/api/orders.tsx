import useSWR from 'swr'
import type { Order } from '@shared/model/Order';
const ORDERS_URL = "/api/orders";
const ORDER_CREATE_URL = "/api/order";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

async function addOrder(order: Order) {
  try {
    throw new Error("Test");

    // const orders = await fetch(ORDER_CREATE_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(order),
    // }).then((res) => res.json());
    // return orders
  } catch (err) {
    console.error('Failed to add item:', err);
  }
}

export const useOrders = (config?: any) => {
  const { data, mutate, isLoading, ...props } = useSWR(ORDERS_URL, fetcher, { refreshInterval: 1000, ...config });
  const addItem = async (newOrder: Order) => {
    console.log('add item')
    try {
      await mutate(addOrder(newOrder), {
        optimisticData: [...data, newOrder],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
      });
      console.log("Successfully added the new item.");
    } catch (e) {
      console.error(e, "Failed to add the new item.");
    }
  };
  console.log(data, isLoading, props)
  return { data, addItem, isLoading }
}




