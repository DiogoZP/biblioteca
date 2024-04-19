import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import Router from "./Router.tsx";



ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <Router />
  </MantineProvider>,
)