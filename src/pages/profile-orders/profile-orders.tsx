import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getUserOrders } from '../../slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
