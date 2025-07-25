import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './pages/Root.tsx';
import Search from './components/Search/Search.tsx';
import NotFound from './pages/NotFound.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Search />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const root = document.getElementById('root');

if (!root) {
  throw new Error('The root element was not found in the DOM.');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
