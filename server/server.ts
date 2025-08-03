const express = require('express');
const crypto = require('crypto');
import { Request, Response } from 'express';
import type { Order } from '@shared/model/Order';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ordersDB: Order[] = [
  {
    id: crypto.randomUUID(),
    clientName: 'Example Client',
    status: 'Pending',
    productId: '1',
    createAt: Date.now(),
  },
];
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!!');
});

app.get('/orders', (req: Request, res: Response) => {
  res.send(ordersDB);
});

app.post('/order', (req: Request, res: Response) => {
  const { clientName, productId } = req.body as Order;
  ordersDB.push({
    id: crypto.randomUUID(),
    clientName,
    productId,
    status: 'Pending',
    createAt: Date.now(),
  });
  res.send(ordersDB);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

startProcessOrders();

async function startProcessOrders() {
  console.log('Order processor started...');
  while (true) {
    await processOrders();
    await new Promise((r) => setTimeout(r, 1000));
  }
}

async function processOrders() {
  const now = Date.now();
  for (const order of ordersDB) {
    if (order.createAt) {
      if (order.status === 'Pending' && now - order.createAt >= 2000) {
        order.status = 'Processing';
        order.updateAt = now;
      } else if (
        order.status === 'Processing' &&
        order.updateAt &&
        now - order.updateAt >= 8000
      ) {
        order.status = 'Completed';
      }
    }
  }
}
