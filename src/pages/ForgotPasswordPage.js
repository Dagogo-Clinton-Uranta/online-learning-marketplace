import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useEffect,useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';
import Alert from '@mui/material/Alert';

import {  uploadUserSettings} from 'src/redux/actions/main.action';
import { passwordResetEmail, signin,signInWithGoogle} from 'src/redux/actions/auth.action';
import { logoutSuccess} from 'src/redux/reducers/auth.slice';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';


function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileSize2, setFileSize2] = useState();
  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [selectedFile2, setSelectedFile2] = useState({selectedFile2: [], selectedFileName2: []});
  const dispatch = useDispatch();

  const [newPassword,setNewPassword] =useState('')
  const [confirmPassword,setConfirmPassword] =useState('')
  const [companySize,setCompanySize] =useState('')

 

  const [email,setEmail] = useState('')
 
  const [password,setPassword] = useState('')
  const [submitLoading,setSubmitLoading] = useState(false)

  const externalSetSubmit = (input) =>{
    setSubmitLoading(input)
  }

  const existingUser = 
  {
    email
  }

  const { user,error } = useSelector((state) => state.auth);
 
  //console.log("error is",error)

  useEffect(()=>{
     if(user){
      navigate('/dashboard/home')
     }
  },[user])




  const PasswordResetFxn = (userEmail,externalSetSubmit) =>{
    if(!email){
      notifyErrorFxn("Veuillez entrer votre adresse e-mail avant de soumettre")
    }else{
      setSubmitLoading(true)
      dispatch(passwordResetEmail(userEmail,externalSetSubmit))
    }
  }

  







  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <center>
    <h1 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>Bienvenue à Bonécole!</h1>
    </center>

    </Grid>

  
   

     <Grid container spacing={2} >
  
         <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <img style={{width:"80%"}} src={bonecoleIntro}/>
            </Grid>
         
        </Grid>

      </Grid>

  
     <p style={{marginTop:"5rem"}}>Entrez l'adresse e-mail pour réinitialiser le mot de passe</p>
  
      {/*error && error.length &&  <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(logoutSuccess())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '14px' }}><b>{error}</b></p>
      </Alert><br/></div>*/}


      <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:"20px",marginBottom:"40px" }}>
         
      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
     <TextField
          sx ={{width:"100%"}}
          id="outlined-basic"
          label="adresse e-mail"
          type="email"
          autoComplete="current-email"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </Grid>  
     
     
     
     
      {/*<Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
      <TextField 
         sx ={{width:"100%"}}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </Grid>*/} 
         
         
         
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
             <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",width:"75%",height:"3rem",fontSize:"15px",
            }}
            onClick ={()=>{PasswordResetFxn(email,externalSetSubmit)}}

            >
            {submitLoading?"loading...":"SOUMETTRE"}
            </Button>
         
          
            <br/><br/><br/>
  
          </Grid>


   
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"10px"}}>
         <br/>

         <center style={{marginBottom:"0.7rem"}}>
         <span onClick ={()=>{navigate('/external-login')}} style={{color:"red",cursor:"pointer",textDecoration:"underline"}}>revenir à la page de connexion</span>
      </center>

       

       {/*<center>
        <p> Vous n'avez pas déjà un compte? &nbsp; <span onClick ={()=>{navigate('/external-register')}} style={{color:"red",cursor:"pointer",textDecoration:"underline"}}>S'inscrire</span> </p>
          </center>*/}

        </Grid>





          
    </Grid>

    
      
    

</Container>
    </>
  );
}

export default ForgotPasswordPage;