import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

//import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
//import HomePage from './pages/HomePage';
//import HomePage1 from './pages/HomePage1';
//import HomePage2 from './pages/HomePage2';
import FeedPage from './pages/FeedPage';
import VideoPage from './pages/VideoPage';
import VideoDetailsPage from './pages/VideoDetailsPage';
import DocsPage from './pages/DocsPage';
//import MembersPage from './pages/MembersPage';
//import MyCoolersPage from './pages/MyCoolersPage';
//import CoolersPage from './pages/CoolersPage';
//import JoinCoolerPage from './pages/JoinCoolerPage';
import InboxPage from './pages/InboxPage';
import SettingsPage from './pages/SettingsPage';
//import PublicCoolerPage from './pages/PublicCoolerPage';
//import PrivateCoolerPage from './pages/PrivateCoolerPage';
//import PublicCoolerJoin from './pages/PublicCoolerJoin';
//import PrivateCoolerJoin from './pages/PrivateCoolerJoin';
//import CreateCoolerPage from './pages/CreateCoolerPage';
import Login from './pages/Login';
import MobileLoginPage from './pages/MobileLoginPage';
import MobileRegisterPage from './pages/MobileRegisterPage';
import MobileChatPage from './pages/MobileChatPage';
import MobileWelcomePage from './pages/MobileWelcomePage';
import LoginUpdatedPage from './pages/LoginUpdatedPage/LoginUpdatedPage'
import RegisterUpdatedPage from './pages/RegisterUpdatedPage/RegisterUpdatedPage'
import CategoriesVideoPage from './pages/CategoriesVideosPage';
import IncubatorVideoPage from './pages/IncubatorVideosPage';
import ViewIncubatorPage from './pages/ViewIncubatorPage';
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
import PurchasedCourse from './pages/PurchasedCourse';
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

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="home" />, index: true },
        { path: 'home', element: <MobileWelcomePage /> },
        { path: 'feed', element: <FeedPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'logout', element: <LogoutPage /> },
        { path: 'video', element: <VideoPage /> },
        { path: 'terms', element: <TermsPage /> },
        { path: 'privacy', element: <PrivacyPage /> },
        { path: 'video-details', element: <VideoDetailsPage /> },
        { path: 'docs', element: <DocsPage /> },
        { path: 'categories-videos', element: <CategoriesVideoPage /> },
        { path: 'incubator-videos', element: <IncubatorVideoPage /> },
        { path: 'view-incubator', element: <ViewIncubatorPage /> },
        { path: 'sample-card', element: <SampleCardPage /> },
        { path: 'popular-courses', element: <PopularCoursesPage /> },
        { path: 'other-courses', element: <OtherCoursesPage /> },
        { path: 'selected-course', element: <SelectedCoursePage /> },
        { path: 'selected-quiz', element: <SelectedQuizPage /> },
        { path: 'saved-courses', element: <SavedCoursesPage /> },
        { path: 'my-cart', element: <MyCartPage /> },
        { path: 'payment-callback', element: <PaymentCallBackPage /> },
        { path: 'omcb', element: <PaymentCallBackPageOM /> },
        { path: 'payment-method', element: <PaymentTypePage /> },
        { path: 'purchased-courses', element: <PurchasedCourse /> },
        { path: 'payment-options', element: <PaymentOptions /> },
        { path: 'payment-options-mtn', element: <PaymentOptionsMtn /> },
        { path: '10e', element: <TenePage /> },
        { path: '6e', element: <SixePage /> },
        { path: 'packs', element: <PacksPage /> },
        { path: 'pack-courses', element: <PackCoursesPage /> },
        // { path: 'test-payment', element: <TestPayment /> },

         
        { path: 'chat', element: <MobileChatPage /> },
        { path: 'settings', element: <SettingsPage /> },
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
