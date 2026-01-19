# Vuex Authentication Implementation

## Overview

This implementation provides a complete Vuex-based authentication system for the memory card game, replacing the previous useState-based approach with a centralized state management solution.

## Architecture

### 1. Store Structure

```
app/
├── store/
│   ├── index.ts          # Main Vuex store configuration
│   └── auth.ts           # Auth module with state, getters, mutations, actions
├── composables/
│   └── useAuth.ts        # Composable that interfaces with Vuex store
├── plugins/
│   └── store.client.ts   # Plugin to initialize Vuex store
└── types/
    └── vuex.d.ts         # TypeScript declarations for better typing
```

### 2. Auth Store Module (`app/store/auth.ts`)

**State:**

- `user`: Current user object (User | null)
- `token`: Authentication token (string | null)
- `isLoading`: Loading state for async operations (boolean)
- `error`: Error messages (string | null)

**Getters:**

- `isAuthenticated`: Boolean indicating if user is logged in
- `getUser`: Returns current user
- `getToken`: Returns current token
- `isLoading`: Returns loading state
- `getError`: Returns current error

**Actions:**

- `initAuth()`: Initialize auth from localStorage
- `login(email, password)`: Authenticate user
- `register(name, email, password)`: Register new user
- `logout()`: Clear auth state and redirect
- `clearError()`: Clear error messages

### 3. useAuth Composable

The composable provides a clean interface to the Vuex store:

```typescript
const auth = useAuth();

// Reactive state
auth.user; // computed ref to user
auth.token; // computed ref to token
auth.isAuthenticated; // computed ref to auth status
auth.isLoading; // computed ref to loading state
auth.error; // computed ref to error messages

// Actions
await auth.login(email, password);
await auth.register(name, email, password);
auth.logout();
auth.clearError();
```

## Usage Examples

### In Components

```vue
<template>
  <div>
    <div v-if="auth.isLoading">Loading...</div>
    <div v-if="auth.error" class="error">{{ auth.error }}</div>
    <div v-if="auth.isAuthenticated">Welcome, {{ auth.user.name }}!</div>
  </div>
</template>

<script setup>
const auth = useAuth();

onMounted(() => {
  auth.clearError();
});

const handleLogin = async (credentials) => {
  try {
    await auth.login(credentials.email, credentials.password);
    // Navigation handled automatically
  } catch (error) {
    // Error handled by store
  }
};
</script>
```

### Direct Store Access (if needed)

```vue
<script setup>
import { useStore } from "vuex";

const store = useStore();

// Direct access to store
const user = computed(() => store.getters["auth/getUser"]);
const isLoading = computed(() => store.getters["auth/isLoading"]);

// Direct dispatch
await store.dispatch("auth/login", { email, password });
</script>
```

## Benefits

1. **Centralized State**: All auth state is managed in one place
2. **Better Error Handling**: Consistent error handling across the app
3. **Loading States**: Built-in loading indicators for better UX
4. **Type Safety**: Full TypeScript support with proper typing
5. **Automatic Navigation**: Login/register automatically redirect users
6. **Persistence**: State persisted in localStorage
7. **Clean API**: Simple composable interface for components

## Migration Notes

Existing components using `useAuth()` will continue to work without changes, as the composable maintains the same interface but now uses Vuex internally.

New features available:

- `auth.isLoading` for loading states
- `auth.error` for error messages
- `auth.clearError()` for clearing errors
- Better error handling in login/register flows
