import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useEffect,useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import profileImg from 'src/assets/images/randomwoman2.jpg'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';
import {FaCaretDown} from 'react-icons/fa'


import {updateProfile} from 'src/redux/actions/group.action';
import {logout} from 'src/redux/actions/auth.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';


function ProfilePage() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
 

  const { user,error,registeredWithSocials } = useSelector((state) => state.auth);
console.log("registered with socials is",registeredWithSocials)


useEffect(()=>{
   if(!user){
    navigate('/login')
   }

   
  
},[])


const [telephone,setTelephone] = useState(user && user.telephone?user.telephone:"")
const [pvExamen,setPvExamen] = useState(user && user.pvExamen?user.pvExamen:"")
const [classes,setClasses] = useState(user && user.classOption?user.classOption:"")
const [school,setSchool] = useState(user && user.schoolOrigin?user.schoolOrigin:"")
const [firstName,setFirstName] = useState(user && user.firstName?user.firstName:"")
const [lastName,setLastName] = useState(user && user.lastName?user.lastName:"")
const [facebook,setFacebook] = useState(user && user.facebook?user.facebook:"")

const updateObject = {
  telephone,
  pvExamen,
  classes,
  school,
  firstName,
  lastName,
  facebook,
}




  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

    

    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
   
     <br/> 
     <h1>Bienvenue,</h1>
    {user && user.firstName && user.firstName.length > 0 && user.lastName && user.lastName.length > 0 &&  <p style={{color:"gray"}}>{user.firstName + " " + user.lastName }</p>}

  
   { registeredWithSocials &&
     <>
     <br/> 
     <h1 style={{color:"red"}}>Please Include the rest of your data now, or at another time.</h1>

     </>
    }
    </Grid>

  
  

      <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:"10px",marginBottom:"40px" }}>
         
      <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
           
          
       <p style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center" ,width:"95%"}}>  <span>MON PROFIL</span> <FaCaretDown/></p>
       <Divider variant="fullWidth" sx={{backgroundColor:"#000000",width:"100%"}}  />
        
       <img src={profileImg} alt="profile image" style={{borderRadius:"10px",height:"100px",width:"150px"}}/>

        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=""
        variant="outlined"
        multiline
        maxRows={2}
        value={firstName}
        onChange = {(e)=>{setFirstName(e.target.value)}}
        label= "NOM"
        />
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=""
        variant="outlined"
        multiline
        maxRows={2}
        value={lastName}
        onChange = {(e)=>{setLastName(e.target.value)}}
        label= "NOM DE FAMILLE"
        />
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=""
        variant="outlined"
        multiline
        maxRows={2}
        value={user && user.email.length > 0 &&user.email}
        disabled={true}
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        label= "EMAIL"
        />
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={facebook}
        onChange = {(e)=>{setFacebook(e.target.value)}}
        label= "Facebook"
        />
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={school}
        onChange = {(e)=>{setSchool(e.target.value)}}
        label= "Ecole d'origine"
        />
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={classes}
        onChange = {(e)=>{setClasses(e.target.value)}}
        label= "Classe et option"
        />
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={pvExamen}
        onChange = {(e)=>{setPvExamen(e.target.value)}}
        label= "PV examen"
        />
        </Grid>

        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={telephone}
        onChange = {(e)=>{setTelephone(e.target.value)}}
        label= "Numero de Telephone"
        />
        </Grid>

       {/* WE WILL USE THESE TWO GRID ITEMS BELOW FOR UPDATING PASSWORD, BUT LATER

        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        label= "PV examen"
        />
        </Grid>

        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
        label= "Numero de Telephone"
        />
        </Grid>

  */}
        

       

      

     
      <>
        <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#f00c44",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
          }}
          onClick ={()=>{dispatch(updateProfile(user.uid,updateObject,navigate))}}
          >
          Sauvegarder changement
          </Button>
       
        </Grid>
       


    
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
             <Button   variant="contained" 
            style={{ backgroundColor: "gray",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
            }}
            //onClick ={()=>{navigate('/login')}}
            >
            Annuler
            </Button>
         
          
            <br/><br/><br/>
  
          </Grid>

          </>

          
        </Grid>

    
        
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center',alignItems:"center", flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <Button   variant="contained" 
            style={{ backgroundColor: "transparent",color:"#000000",width:"50%",height:"2.5rem",fontSize:"12px",
            }}
            onClick ={()=>{dispatch(logout(navigate))}}
            >
            Se déconnecter
            </Button>
   
    </Grid>
    

</Container>
    </>
  );
}

export default ProfilePage;