import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { TUser } from '@utils-types';

type ProtectedRouteProps = {
  children: React.ReactElement;
  user: TUser | null;
  isAuthChecked: boolean;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  user,
  isAuthChecked,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  const { from } = location.state || { from: { pathname: '/' } };

  if (onlyUnAuth && user) {
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
