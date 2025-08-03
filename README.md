# MyOrders

## Description

A full-stack web application that provides a simple and responsive interface for order processing with real-time status updates. It is built using React, Vite, Express, and TypeScript.

## Features

### Frontend (React + Vite)

- **Order Form (opens in modal from "Add Order" button)**:

  - Text input for client name
  - Dropdown for selecting one of the following products:
    ```ts
    const PRODUCTS = [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Phone', price: 699 },
      { id: 3, name: 'Headphones', price: 199 },
      { id: 4, name: 'Tablet', price: 499 },
    ];
    ```
  - "Submit Order" button

- **Orders List**:
  - Displays submitted orders with:
    - Order ID
    - Client name
    - Current status (`Pending → Processing → Completed`)
  - **Live status updates** without page refresh (via polling with SWR)

### Backend (Node.js + Express)

- **Order API**:

  - POST `/order`: Submit a new order (initial status: `Pending`)
  - GET `/orders`: Fetch all orders

- **Automatic Order Status Progression by runing startProcessOrders function in server.ts**:
  - Orders start as `Pending`
  - Transition to `Processing` after **2 seconds**
  - Transition to `Completed` after an additional **8 seconds**

## Project Structure

This project is structured as a monorepo with separate client and server folders. The root folder uses `concurrently` to run both client and server in development mode.

```
myorders/
├── client/         # React + Vite frontend (TypeScript)
├── server/         # Express backend (TypeScript)
├── package.json    # Root-level scripts and dependencies (concurrently)
└── README.md       # Project documentation
```

### Server

- Runtime: Node.js v22.11.0
- Package Manager: npm v10.9.0
- Framework: Express
- Language: TypeScript

### Client

- Build Tool: Vite
- Framework: React
- Template: React + TypeScript (react-ts)

## Scripts

### From the root:

`npm run dev # Run client and server concurrently (development)`

### From client/:

`npm run dev # Start Vite dev server`

### From server/:

`npm run dev # Start Express server with ts-node`

## Notes

- Data is mocked and stored in memory (no database)
- Status updates are handled entirely on the backend
- Designed for local development only (no deployment required)
