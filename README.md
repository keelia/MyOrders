# MyOrders

## Description

A full-stack web application that provides a simple and responsive interface for order processing with real-time status updates. It is built using React, Vite, Express, and TypeScript.

## Project Structure

The root folder is configured to run both the client and server simultaneously using concurrently. This setup allows for easy local development with automatic updates.

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
