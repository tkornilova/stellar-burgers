import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../../utils/protected-route';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { getUser } from '../../slices/userSlice';

const App = () => {
  const { items, isLoading, errorMessage } = useSelector(
    (store) => store.ingredients
  );
  const { user, isAuthChecked } = useSelector((store) => store.user);
  const isIngredientsLoading = isLoading;
  const ingredients = items;
  const error = errorMessage;

  const dispatch = useDispatch();
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length === 0 ? (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<ConstructorPage />} />

          <Route path='/feed'>
            <Route index element={<Feed />} />
            <Route
              path=':number'
              element={
                <Modal
                  title=''
                  onClose={() => navigate(-1)}
                  children={<OrderInfo />}
                />
              }
            />
          </Route>

          <Route
            path='/login'
            element={
              <ProtectedRoute
                user={user}
                isAuthChecked={isAuthChecked}
                onlyUnAuth
              >
                <Login />
              </ProtectedRoute>
            }
          />

          <Route
            path='/register'
            element={
              <ProtectedRoute
                user={user}
                isAuthChecked={isAuthChecked}
                onlyUnAuth
              >
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute
                user={user}
                isAuthChecked={isAuthChecked}
                onlyUnAuth
              >
                <ForgotPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path='/reset-password'
            element={
              <ProtectedRoute
                user={user}
                isAuthChecked={isAuthChecked}
                onlyUnAuth
              >
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route path='/profile'>
            <Route
              index
              element={
                <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='orders/:number'
              element={
                <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                  <Modal
                    title=''
                    onClose={() => navigate(-1)}
                    children={<OrderInfo />}
                  />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => navigate(-1)}
                children={<IngredientDetails />}
              />
            }
          />

          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NotFound404 />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
