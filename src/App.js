// routes
import { useEffect } from 'react';
import Router from './routes';
import theme from './theme'
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { Beforeunload } from 'react-beforeunload';
import { notifyInfoFxn } from './utils/toast-fxn';
import { usePrompt } from './pages/pageBlocker';

// ----------------------------------------------------------------------

export default function App() {

 // usePrompt("you will have to come online again",true)


  useEffect(() => {
    window.addEventListener("beforeunload", HandleUnload());
   
    return () => {
      window.removeEventListener("beforeunload", HandleUnload());
    };
  }, []);
  
  const HandleUnload = (e) => {
    //e.preventDefault()
   
    if(!window.navigator.onLine){
   
     // notifyInfoFxn("please wait..")

    setTimeout( ()=>{if(window.confirm("You are offline,if you leave the page now,you may have to reload, continue?")){
      console.log("THEY LEFT ANYWAY, POOR USER")
     
     }
    },2000)
     
    
    } 
  };
  


  return (
    <Beforeunload onBeforeunload={(e)=>{HandleUnload(e)}}>
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
    

    </ThemeProvider>
    </Beforeunload>
  );
}
