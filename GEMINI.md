# Yatsapp Project Overview

Yatsapp is a modern chat application built with a high-performance, full-stack architecture. It leverages **TanStack Start** (React) for the frontend, **Vite** for the build pipeline, and **Convex** for the backend database and serverless functions. The project follows a **Feature-Sliced Design (FSD)** architectural pattern to ensure scalability and maintainability.

## Main Technologies

- **Frontend:** React 19, TanStack Start (Router + SSR), TanStack Query.
- **Backend:** Convex (Real-time database, serverless functions).
- **Styling:** Tailwind CSS 4, Lucide React (icons), Motion (animations).
- **State Management:** Zustand, TanStack Query.
- **Validation:** Zod, React Hook Form (with @hookform/resolvers).
- **Development:** Vite, Vitest (testing), ESLint, Prettier.

## Architecture & Project Structure

The project is organized into two main parts:

### 1. Backend (`/convex`)
The backend is built on Convex and handles data storage, real-time updates, and server-side logic.
- `schema.ts`: Defines the database schema.
- `users/`, `conversations/`, `messages/`, etc.: Scoped Convex functions (mutations, queries, internal).
- `lib/`: Shared backend utilities (auth, permissions, validation).

### 2. Frontend (`/src`)
The frontend follows the **Feature-Sliced Design (FSD)** pattern:
- `app/`: Global providers, styles, and entry points.
- `routes/`: TanStack Router file-based routing.
- `features/`: Discrete business functionalities (e.g., `send-message`, `add-friend`).
- `entities/`: Domain-specific entities and business logic (e.g., `user`, `message`).
- `widgets/`: Complex UI components combining features and entities (e.g., `chat-window`, `sidebar`).
- `shared/`: Generic UI components (`ui/`), hooks, and utilities.

## Building and Running

### Development
Start the development server (Vite):
```bash
npm run dev
# or
bun dev
```

Run Convex functions in development mode:
```bash
npx convex dev
```

### Route Generation
TanStack Router uses file-based routing. To regenerate routes:
```bash
npm run generate-routes
```

### Testing
Run unit and integration tests:
```bash
npm run test
```

### Linting and Formatting
```bash
npm run lint
npm run format
```

## Development Conventions

- **Feature-Sliced Design (FSD):** Adhere to the FSD structure. Avoid tight coupling between features.
- **Real-time Data:** Use Convex hooks (`useQuery`, `useMutation`) for real-time data fetching and updates.
- **Form Management:** Use **React Hook Form** with **Zod** and `@hookform/resolvers` for robust form validation and state management.

- **Route Definitions:** Define routes in `src/routes/` and ensure the route generator is running or executed after changes.
- **UI Components:** Use the shared UI components in `src/components/ui/` (built with CVA and Tailwind CSS).
- **Type Safety:** Ensure all data models and functions are strictly typed using TypeScript and Zod.
- **Atomic Commits:** Follow conventional commit messages.

## Key Files
- `package.json`: Project dependencies and scripts.
- `vite.config.ts`: Vite and TanStack plugin configuration.
- `convex/schema.ts`: Backend database schema.
- `src/routes/__root.tsx`: Root layout and application structure.
- `src/app/providers/`: Context providers for Auth, Convex, and Query.
