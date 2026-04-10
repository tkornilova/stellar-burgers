import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  isAuth: boolean;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  isAuth,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (onlyUnAuth) {
    return isAuth ? <Navigate to='/' replace /> : children;
  }

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
