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
import { Routes, Route } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../../utils/protected-route';
import { Preloader } from '@ui';

const App = () => {
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = false;
  const ingredients = [];
  const error = null;
  let isAuth = true;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/feed'>
          <Route index element={<Feed />} />
          <Route
            path=':number'
            element={
              <Modal
                title='TITLE'
                onClose={() => console.log('модалка')}
                children={<OrderInfo />}
              />
            }
          />
        </Route>

        <Route
          path='/login'
          element={
            <ProtectedRoute isAuth={isAuth} onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute isAuth={isAuth} onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute isAuth={isAuth} onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute isAuth={isAuth} onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders/:number'
            element={
              <Modal
                title='TITLE'
                onClose={() => console.log('модалка')}
                children={<OrderInfo />}
              />
            }
          />
        </Route>

        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='TITLE'
              onClose={() => console.log('модалка')}
              children={<IngredientDetails />}
            />
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute isAuth={isAuth}>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <ConstructorPage />
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </div>
  );
};

export default App;
