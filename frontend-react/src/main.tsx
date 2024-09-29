import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QuizStart from './pages/QuizStart';
import QuizPage from './pages/QuizPage';
import './index.css';
import HomePage from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/start',
    element: <QuizStart />,
  },
  {
    path: '/quiz',
    element: <QuizPage />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
