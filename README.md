# Dog Club

[![CI](https://github.com/dugasova/dog-club/actions/workflows/ci.yml/badge.svg)](https://github.com/dugasova/dog-club/actions/workflows/ci.yml)

A pet food e-commerce SPA built with React, TypeScript and Vite. Users can browse and search a nutrition catalogue, add products to a cart, place orders, and view their order history, with Firebase handling authentication and data persistence.

## Features

- Nutrition catalogue with sorting (popularity, price, name) and live search
- Shopping cart with quantity controls and checkout
- Firebase Auth for login and sign-up, with a protected account page
- Order history per user account stored in Firestore
- Ukrainian / English language toggle that remembers the user's choice
- Contact and expert consultation forms with validation
- Route-level code splitting, with Firestore loaded on demand

## Tech Stack

| Layer   | Libraries                                        |
| ------- | ------------------------------------------------ |
| UI      | React 19, TypeScript, Vite, SCSS                 |
| Routing | React Router 7                                   |
| State   | useReducer + Context API                         |
| Backend | Firebase Auth + Firestore                        |
| Forms   | react-hook-form + Zod                            |
| i18n    | react-i18next                                    |
| Testing | Vitest + Testing Library                         |
| Quality | ESLint, Prettier, husky, lint-staged, commitlint |

## Getting Started

Requires Node.js 22 (see `.nvmrc`) and a Firebase project with Authentication and Firestore enabled.

```bash
npm install
cp .env.example .env
npm run dev
```

Fill in `.env` with the values from your Firebase project settings. The app stops at startup and names the missing variables if any of these are empty:

- `VITE_REACT_APP_FIREBASE_API_KEY`
- `VITE_REACT_APP_FIREBASE_AUTH_DOMAIN`
- `VITE_REACT_APP_FIREBASE_PROJECT_ID`
- `VITE_REACT_APP_APP_ID`

## Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start the development server        |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Serve the production build locally  |
| `npm run lint`         | Check the code with ESLint          |
| `npm run lint:fix`     | Fix ESLint problems where possible  |
| `npm run format`       | Format the code with Prettier       |
| `npm run format:check` | Check formatting                    |
| `npm run typecheck`    | Run the TypeScript compiler         |
| `npm run test`         | Run tests in watch mode             |
| `npm run test:run`     | Run tests once                      |
| `npm run test:ui`      | Run tests with the Vitest UI        |
| `npm run coverage`     | Run tests with a coverage report    |

## Project Structure

```text
src/
├── components/   UI components with their styles and tests
├── config/       Environment variable validation
├── context/      Auth, cart and nutrition providers and hooks
├── hooks/        Shared custom hooks
├── layouts/      Page layout (header, content, footer)
├── locales/      English and Ukrainian translations
├── routes/       Route pages and the protected route
├── services/     Firestore operations for orders and users
├── store/        Reducers and selectors for the cart and search
└── utils/        Shared helpers
```

Imports from outside a component's folder use the `@/` alias for `src/`.

## Quality Checks

Before each commit, husky runs ESLint and Prettier on staged files and commitlint checks the message against Conventional Commits. GitHub Actions runs formatting, lint, type and test checks plus the build on every push and pull request to `master`.
