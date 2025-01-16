import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  // Rotas protegidas
  {
    path: '/',
    element: (
      <PrivateRoute>
        {/* Seu layout principal aqui */}
      </PrivateRoute>
    ),
  },
]); 