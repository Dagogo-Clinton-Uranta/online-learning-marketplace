// routes
import { useEffect,useState } from 'react';
import Router from './routes';
import theme from './theme'
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import './index.css';
import { ToastContainer } from 'react-toastify';

import { notifyInfoFxn ,notifySuccessFxn} from './utils/toast-fxn';

import { useDispatch, useSelector } from 'react-redux';
import { Offline, Online,Detector } from "react-detect-offline";

// ----------------------------------------------------------------------

export default function App() {

 // usePrompt("you will have to come online again",true)


 // useEffect(() => {
 //   window.addEventListener("beforeunload", HandleUnload());
 //  
 //   return () => {
 //     window.removeEventListener("beforeunload", HandleUnload());
 //   };
 // }, []);

  
   //const HandleUnload = (e) => {
   //
   //
   // if(!window.navigator.onLine){
   //
   // 
   // setTimeout( ()=>{if(window.confirm("You are offline,if you leave the page now,you may have to reload, continue?")){
   //   //console.log("THEY LEFT ANYWAY, POOR USER")
   //  
   //  }
   // },2000)
   //  
   // 
   //} 
   //};
   const { user,error } = useSelector((state) => state.auth);
   const [isOnline, setIsOnline] = useState(navigator.onLine);
 
   const [wentOffline,setWentOffline] = useState(false)

   useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);

      if(!navigator.onLine){
        setWentOffline(true)
      }

    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
}, [isOnline,navigator.onLine]);



  


  return (
    
    <ThemeProvider theme={theme}>
       <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      <ScrollToTop />
      <StyledChart />

      
      <Router />
    
        
         {!isOnline && 
          <>
          {notifyInfoFxn(`you are ${"offline"}, only saved courses are available now.`)}
          </>
         
         }

         {isOnline && wentOffline &&
          <>
          {notifySuccessFxn(`Back online`)}
          </>
         
         }

          
    </ThemeProvider>
  
  );
}
