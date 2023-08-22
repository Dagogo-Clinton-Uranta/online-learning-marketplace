import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';

import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import FacebookLogin from 'react-facebook-login';
import './facebookLogin.css';

function ExternalLoginPage() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')

  const { user,error } = useSelector((state) => state.auth);

  
  

  useEffect(()=>{
    if(user){
     navigate('/dashboard/home')
    }
 },[])


 
const responseFacebook = (response) => {
  console.log(response);
}

const componentClicked = (data)=>{
   console.log("data from facebook",data)
}


  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <center>
    <h1 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>Bienvenue sur bonÉcole!</h1>
     <br/> 
    <p>Plateforme de cours en ligne sur - demande</p>
    </center>
   
    </Grid>

  
  

      <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:"10px",marginBottom:"40px" }}>
         
      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#483c94",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
          }}
          onClick ={()=>{navigate('/login')}}
          >
          Se connecter avec Facebook
          </Button>
       
        
       

        </Grid>


       
        <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#483c94",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
          }}
          onClick ={()=>{navigate('/login')}}
          >
                 <FacebookLogin
           appId="1482147535954732" // sotre this in an environment vairable app secret - ad921b0cff5668ec822354f6e4758f28
           autoLoad={true}
           fields="name,email,picture"
           onClick={componentClicked}
           callback={responseFacebook} 
           cssClass="my-facebook-button-class"/>
             
             Se connecter avec Facebook   

          </Button>
       
        
       

        </Grid>

      


        <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#f00c44",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
          }}
          onClick ={()=>{navigate('/login')}}
          >
          Se connecter avec Google
          </Button>
       
        </Grid>




    
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
             <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
            }}
            onClick ={()=>{navigate('/login')}}
            >
            Se connecter avec Email
            </Button>
         
          
            <br/><br/><br/>
  
          </Grid>
          
        </Grid>

    
        
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <center>
    
    <p style={{textDecoration:"underline"}} onClick ={()=>{navigate('/login')}}>En vous connectant, vous acceptez nos conditions generales d'utilisation et notre politique de confidentialite </p>
   
   <br/>
   
  
   
    </center>

    <p> Vous n'avez pas déjà un compte? &nbsp; <span onClick ={()=>{navigate('/external-register')}} style={{color:"red"}}>S'inscrire</span> </p>
   
    </Grid>
    

</Container>
    </>
  );
}

export default ExternalLoginPage;