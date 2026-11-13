
import React from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import UsersScreen from './src/screens/UsersScreen';

// Cliente global de TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersScreen />
    </QueryClientProvider>
  );
}
