import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './redux/store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';



const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

const warnIfOffline = ()=>{

  if(window.navigator.onLine){
  if(window.confirm("you are about to leave the page, you will have to go online to get back, proceed ?")){
   console.log("THEY LEFT ANYWAY, POOR THEM")
  }
}
}

root.render(
  <HelmetProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <App onUnload={()=>{warnIfOffline()}} />
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
