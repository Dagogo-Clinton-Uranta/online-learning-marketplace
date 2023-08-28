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

export default function Router() {
  const routes = useRoutes([
   
     
   
   
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="external-login" />, index: true },
        { path: 'home', element: <MobileWelcomePage /> },
        { path: 'feed', element: <FeedPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'logout', element: <LogoutPage /> },
        { path: 'video', element: <VideoPage /> },
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
        { path: '10e', element: <TenePage /> },
        { path: '6e', element: <SixePage /> },

        
        { path: 'chat', element: <MobileChatPage /> },
        { path: 'settings', element: <SettingsPage /> },
        // { path: 'my-cooler', element: <MyCoolersPage /> },
       
       
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
      path: 'register',
      element: <DashboardLayout />,
      children:[
        {path:'', element:<MobileRegisterPage/>}
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
      path: 'regTest',
      element:/* <Login />*/<RegisterUpdatedPage/>,
    },

   
    
   
    {
      element: <SimpleLayout />,
      children: [
        // { element: <Navigate to="/login" />, index: true },
        { element: <Navigate to="/external-login" />, index: true },
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
