import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';
import { signin,signInWithGoogle} from 'src/redux/actions/auth.action';
import googleSI from 'src/assets/images/googleSI.svg'



import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';


function ExternalLoginPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
 
  const [fileSize, setFileSize] = useState();
  
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')

  const { user,error } = useSelector((state) => state.auth);

  const googleLoginFxn = (navigate) =>{
    dispatch(signInWithGoogle(navigate))
  }
  

  useEffect(()=>{
    if(user){
     navigate('/dashboard/home')
    }
 },[user])





  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <center>
    <h1 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>Bienvenue sur Bonécole!</h1>
     <br/> 
    <p>Plateforme de cours en ligne sur - demande</p>
    </center>
   
    </Grid>

  
  

      <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:"10px",marginBottom:"40px" }}>
         
      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#483c94",color:"#FFFFFF",width:"55%",height:"3rem",fontSize:"12px",borderRadius:"5rem",
          }}
          onClick ={()=>{navigate('/login')}}
          >
          Se connecter avec Facebook
          </Button>
        </Grid>



      


        <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#FFFFFF",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",boxShadow:"none",
          }}
          onClick ={()=>{googleLoginFxn(navigate)}}
          >
         <img src={googleSI} style={{width:"60%"}}/>
          </Button>
       
        </Grid>




    
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
             <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",width:"55%",height:"3rem",fontSize:"12px",borderRadius:"5rem",
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
    
    <p style={{textDecoration:"underline"}} onClick ={()=>{navigate('/dashboard/privacy')}}>En vous connectant, vous acceptez nos conditions generales d'utilisation et notre politique de confidentialite </p>
   
   <br/>
   
  
   
    </center>

    <p> Vous n'avez pas déjà un compte? &nbsp; <span onClick ={()=>{navigate('/external-register')}} style={{color:"red"}}>S'inscrire</span> </p>
   
    </Grid>
    

</Container>
    </>
  );
}

export default ExternalLoginPage;