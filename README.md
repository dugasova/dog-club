# Dog Club

A pet food e-commerce SPA built with React, TypeScript and Vite. Users can browse and search a nutrition catalogue, add products to a cart, place orders, and view their order history — with Firebase handling authentication and data persistence.

## Features

- Nutrition catalogue with sorting (popularity, price, name) and live search
- Shopping cart with quantity controls and checkout
- Firebase Auth for login / sign-up
- Order history per user account stored in Firestore
- Ukrainian / English language toggle
- Contact and expert consultation forms with validation

## Tech Stack

| Layer | Libraries |
|---|---|
| UI | React 18, TypeScript, Vite |
| Routing | React Router |
| State | useReducer + Context API |
| Backend | Firebase Auth + Firestore |
| Forms | react-hook-form + Zod |
| i18n | react-i18next |
| Testing | Vitest + Testing Library |

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run test suite |
| `npm run test:ui` | Run tests with UI |

## Testing

107 tests across 23 files covering reducers, hooks, services, and components.

```bash
npm run test
```
