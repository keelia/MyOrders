const express = require('express');
const crypto = require('crypto');
const cluster = require('cluster');
import { Request, Response } from 'express';
import type { Order } from '@shared/model/Order';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ordersDB: Order[] = [
  {
    id: crypto.randomUUID(),
    clientName: '122',
    status: 'Pending',
    productId: '1',
    createAt: Date.now(),
  },
];
if (cluster.isMaster) {
  cluster.fork();
  processOrders();
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!!!!');
  });

  app.get('/orders', (req: Request, res: Response) => {
    console.log('getting data');
    processOrders();
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
}

function processOrders() {
  for (const order of ordersDB) {
    processOrderStatus(order);
  }
}

function processOrderStatus(order: Order) {
  if (order.createAt) {
    const now = Date.now();
    if (order.status === 'Pending') {
      if ((now - order.createAt) / 1000 >= 2) {
        order.status = 'Processing';
        order.updateAt = now;
      }
    } else if (order.status === 'Processing' && order.updateAt) {
      if ((now - order.updateAt) / 1000 >= 8) {
        order.status = 'Completed';
      }
    }
  }
  console.log('after process', order.id, order.status);
}
