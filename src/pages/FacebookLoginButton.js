import React, { useEffect } from 'react';
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { UseFacebookDetailsToSignIn } from 'src/redux/actions/auth.action';
import { useDispatch } from 'react-redux';




const FacebookLoginButton = () => {
   const dispatch  = useDispatch()
  
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '1025666841349330',
        cookie: true,
        status:true,
        xfbml: true,
        version: 'v19.0'
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleLogin = () => {
    window.FB.login(function(response) {
      if (response.authResponse) {
        console.log('You are logged in:', response.authResponse);
        // USING THE SUCCESSFUL FACEBOOK LOGIN DETAILS TO SIGN UP TO FIREBASE
           dispatch(UseFacebookDetailsToSignIn(response.authResponse))


      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { /*scope: 'email'*/  config_id: '<CONFIG_ID>'  }); // CONFIG ID GOES HERE

  };
  
  return (
  
     <Button   variant="contained" 
          style={{ backgroundColor: "#483c94",color:"#FFFFFF",width:"55%",height:"3rem",fontSize:"12px",borderRadius:"5rem",
          }}
          onClick ={()=>{handleLogin()}}
          >
          Se connecter avec Facebook
        </Button>
  );
};

export default FacebookLoginButton;