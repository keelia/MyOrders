import { Request, Response } from 'express';
const express = require('express');
const app = express();
const port = 3001;

const usersDB = [];

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
