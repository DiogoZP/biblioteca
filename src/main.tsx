import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ModalsProvider } from "@mantine/modals";
import Router from "./Router.tsx";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <ModalsProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ModalsProvider>
  </MantineProvider>,
)
