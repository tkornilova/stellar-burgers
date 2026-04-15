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
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Location
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../../utils/protected-route';
import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/ingredientsSlice';
import { getUser } from '../../slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { background?: Location };
  const background = state?.background;

  const { items, isLoading, errorMessage } = useSelector(
    (store) => store.ingredients
  );
  const { user, isAuthChecked } = useSelector((store) => store.user);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {isLoading ? (
        <Preloader />
      ) : errorMessage ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {errorMessage}
        </div>
      ) : items.length === 0 ? (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет ингредиентов
        </div>
      ) : (
        <>
          {/* Main routes */}
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />

            <Route path='/feed' element={<Feed />} />

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
                path='/profile/orders'
                element={
                  <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                    <ProfileOrders />
                  </ProtectedRoute>
                }
              />
              <Route path='orders/:number' element={<OrderInfo />} />
            </Route>

            <Route
              path='/ingredients/:id'
              element={
                <div className={styles.detailPageWrap}>
                  <p
                    className={`text text_type_main-large ${styles.detailHeader}`}
                  >
                    Детали ингредиента
                  </p>
                  <IngredientDetails />
                </div>
              }
            />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {/* Modals */}
          {background && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal onClose={handleModalClose} title=''>
                    <OrderInfo />
                  </Modal>
                }
              />

              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={handleModalClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />

              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute user={user} isAuthChecked={isAuthChecked}>
                    <Modal onClose={handleModalClose} title=''>
                      <OrderInfo />
                    </Modal>
                  </ProtectedRoute>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
