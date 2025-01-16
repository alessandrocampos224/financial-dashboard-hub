import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Você pode criar um componente de loading
    return <div>Carregando...</div>;
  }

  if (!user) {
    // Redireciona para o login mantendo a URL original como state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 