import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../slices/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();

  const { items } = useSelector((store) => store.ingredients);
  const { orders } = useSelector((store) => store.orders);
  const { orderInfo } = useSelector((store) => store.order);

  const { number } = useParams();

  const currentOrder = orders.find((i) => i.number === Number(number));

  useEffect(() => {
    if (!currentOrder && !orderInfo && number) {
      dispatch(getOrderByNumber(Number(number)));
    }
  }, [dispatch, currentOrder, orderInfo, number]);

  const finalOrder = currentOrder || orderInfo;
  const ingredients: TIngredient[] = items;

  /* Готовим данные для отображения */
  const orderInfoData = useMemo(() => {
    if (!finalOrder || !ingredients.length) return null;

    const date = new Date(finalOrder.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = finalOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...finalOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [finalOrder, ingredients]);

  if (!orderInfoData) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfoData} />;
};
