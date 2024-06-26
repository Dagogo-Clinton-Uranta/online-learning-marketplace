import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

//import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';




import MobileLoginPage from './pages/MobileLoginPage';
import MobileRegisterPage from './pages/MobileRegisterPage';
import MobileChatPage from './pages/MobileChatPage';
import MobileWelcomePage from './pages/MobileWelcomePage';



import SampleCardPage from './pages/SampleCardPage';
import PopularCoursesPage from './pages/PopularCoursesPage';
import TenePage from './pages/TenePage';
import SixePage from './pages/SixePage';
import TerminalesPage from './pages/TerminalesPage';
import OtherCoursesPage from './pages/OtherCoursesPage';
import SelectedCoursePage from './pages/SelectedCoursePage';
import SavedCoursesPage from './pages/SavedCoursesPage';

import ExternalLoginPage from './pages/ExternalLoginPage';
import ExternalRegisterPage from './pages/ExternalRegisterPage';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import SelectedQuizPage from './pages/SelectedQuizPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import MyCartPage from './pages/MyCartPage';
import PurchasedCoursePage from './pages/PurchasedCoursePage';
import PackCoursesPage from './pages/PackCoursesPage';
import PacksPage from './pages/PacksPage';
import TestPayment from './pages/TestPayment';
import PaymentCallBackPage from './pages/PaymentCallBackPage';
import PaymentTypePage from './pages/PaymentTypePage';
import LoginDesktopViewPage from './pages/LoginDesktopViewPage';
import MainPage from './pages/MainPage';
import CoursePage from './pages/CoursePage';
import PaymentOptions from './pages/PaymentOptions';
import PaymentOptionsMtn from './pages/PaymentOptionsMtn';
import PaymentCallBackPageOM from './pages/PaymentCallBackOM';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="home" />, index: true },
        { path: 'home', element: <MobileWelcomePage /> },
       
        { path: 'profile', element: <ProfilePage /> },
        { path: 'logout', element: <LogoutPage /> },
       
        { path: 'terms', element: <TermsPage /> },
        { path: 'privacy', element: <PrivacyPage /> },
        
       
        
        { path: 'popular-courses', element: <PopularCoursesPage /> },
        { path: 'other-courses', element: <OtherCoursesPage /> },
        { path: 'selected-course', element: <SelectedCoursePage /> },
        { path: 'selected-quiz', element: <SelectedQuizPage /> },
        { path: 'saved-courses', element: <SavedCoursesPage /> },
        { path: 'my-cart', element: <MyCartPage /> },
        { path: 'payment-callback', element: <PaymentCallBackPage /> },
        { path: 'omcb', element: <PaymentCallBackPageOM /> },
        { path: 'payment-method', element: <PaymentTypePage /> },
        { path: 'purchased-courses', element: <PurchasedCoursePage /> },
        { path: 'payment-options', element: <PaymentOptions /> },
        { path: 'payment-options-mtn', element: <PaymentOptionsMtn /> },
        { path: '10e', element: <TenePage /> },
        { path: '6e', element: <SixePage /> },
        { path: 'packs', element: <PacksPage /> },
        { path: 'pack-courses', element: <PackCoursesPage /> },
       
        //PAGES BELOW ARE, FOR DESKTOP DISPLAY - NOT CURRENTLY IN USE
       // { path: 'test-payment', element: <TestPayment /> },  
        { path: 'chat', element: <MobileChatPage /> },
        { path: 'sample-card', element: <SampleCardPage /> },
        { path: 'login-desktop', element: <LoginDesktopViewPage /> },
        { path: 'main-page', element: <MainPage /> },
        { path: 'course-page', element: <CoursePage /> },
       
       
      ],
    },
    {
      path: 'login',
      element: <DashboardLayout />,
      children:[
        {path:'', element:<MobileLoginPage/>}
      ]
    },

    {
      path: 'forgot-password',
      element: <DashboardLayout />,
      children:[
        {path:'', element:<ForgotPasswordPage/>}
      ]
    },
    {
      path: 'external-login',
      element: <DashboardLayout />,
      children:[
        {path:'', element:<ExternalLoginPage/>}
      ]
     
    },
    {
      path: 'external-register',
      element: <DashboardLayout />,
      children:[
        {path:'', element:<ExternalRegisterPage/>}
      ]
     
    },

    {
      path: 'register',
      element:/* <Login />*/<MobileRegisterPage/>,
    },

   
    
   
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to="/login" />, index: true },
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
