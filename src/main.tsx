import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import '@mantine/notifications/styles.css';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Notifications } from '@mantine/notifications';
import Router from "./Router.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <ModalsProvider>
      <Notifications/>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
    </ModalsProvider>
  </MantineProvider>,
)

export { queryClient };
