import React, { useEffect } from 'react';
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';

const FacebookLoginButton = () => {
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
        // Handle the successful login here
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email' }); // Add any additional permissions you need

  

  };
  {/* OLD BUTTON THAT CAME WITH THE CHAT GPT CODE <button onClick={handleLogin}>Login with Facebook for Business</button>*/}


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