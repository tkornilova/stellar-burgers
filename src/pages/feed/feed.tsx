import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getFeeds } from '../../slices/ordersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getFeeds());
    }
  }, [dispatch, orders.length]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
