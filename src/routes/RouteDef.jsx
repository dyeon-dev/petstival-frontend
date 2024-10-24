import LoginPage from '../pages/LoginPage';
import CheckoutPage from '../pages/PaymentsPage/CheckoutPage';
import SuccessPage from '../pages/PaymentsPage/SuccessPage';
import FailPage from '../pages/PaymentsPage/FailPage';
import MyPage from '../pages/MyPage/MyPage';
import OrderPage from '../pages/MyPage/OrderPage/OrderPage';
import OrderDetailPage from '../pages/MyPage/OrderDetailPage/OrderDetailPage';
import PetProfileSurveyPage from '../pages/PetProfileSurveyPage/PetProfileSurveyPage';

// 페이지 URL 및 렌더링할 페이지 컴포넌트 정보를 저장하는 객체
export const Screens = {
  Login: {
    path: '/login',
    element: <LoginPage />,
  },
  Checkout: {
    path: '/payment',
    element: <CheckoutPage />,
  },
  Success: {
    path: '/success',
    element: <SuccessPage />,
  },
  Fail: {
    path: '/fail',
    element: <FailPage />,
  },
  MyPage: {
    path: '/mypage',
    element: <MyPage />,
  },
  Order: {
    path: '/mypage/order',
    element: <OrderPage />,
  },
  OrderDetail: {
    path: '/mypage/order/detail',
    element: <OrderDetailPage />,
  },
  PetProfileSurvey: {
    path: '/survey',
    element: <PetProfileSurveyPage />,
  },
};

export const RouteDef = {
  ...Screens,
};
