import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box,CardMedia, MenuItem, Select} from '@mui/material';
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



import {logout} from 'src/redux/actions/auth.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import {  uploadImage, uploadProfileImage,updateProfile} from 'src/redux/actions/auth.action';

import DEFAULTIMG from '../assets/images/rec.png';


function ProfilePage() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { user,error,registeredWithSocials } = useSelector((state) => state.auth);
  console.log("registered with socials is",registeredWithSocials)

  const [selectedFile, setSelectedFile] = useState({selectedFile: [], selectedFileName: []});
  const [file, setFile] = useState();
  
 const [state, setState] = useState({
    paymentLink: user?.paymentLink ? user?.paymentLink : "",
    password: "",
    imageUrl: user?.imageUrl ? user?.imageUrl : "",
  })

  const handleselectedFile = event => {
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    setFile(URL.createObjectURL(event.target.files[0]));
};


const settingsUpdate = (e) => {
  e.preventDefault();
//   console.log("OLD SATE: ",state);
  state.paymentLink = state.paymentLink == "" ? user?.paymentLink : state.paymentLink;
  state.imageUrl = selectedFile.selectedFile == "" ? user?.imageUrl : selectedFile.selectedFile;
//   return;
  setLoading(true);
  const id = user.uid;
  const imageUrl = user.imageUrl;
  if(selectedFile.selectedFile.length == 0){
    // notifyErrorFxn("You have not uploaded Image");
    //dispatch(updateProfile(state, id, '', navigate, setLoading, imageUrl));
   // dispatch(updateProfile(user.uid,updateObject,navigate))

    dispatch(updateProfile(updateObject, user.uid, '', navigate, setLoading, imageUrl));
  }else{
    dispatch(uploadProfileImage(updateObject, selectedFile.selectedFile, user.uid, navigate, setLoading));
  }
 
}
 




useEffect(()=>{
   if(!user){
    navigate('/login')
   }

   
  
},[])


const [telephone,setTelephone] = useState(user && user.telephone?user.telephone:(user && user.phone?user.phone:""))
const [pvExamen,setPvExamen] = useState(user && user.pvExamen?user.pvExamen:"")
const [classes,setClasses] = useState(user && user.classOption?user.classOption:"")
const [school,setSchool] = useState(user && user.schoolOrigin?user.schoolOrigin:"")
const [firstName,setFirstName] = useState(user && user.firstName?user.firstName:"")
const [lastName,setLastName] = useState(user && user.lastName?user.lastName:"")
const [facebook,setFacebook] = useState(user && user.facebook?user.facebook:"")
const [affiliate,setAffiliate] = useState(user && user.affiliate?user.affiliate:"")

const updateObject = {
  telephone,
  pvExamen,
  classes,
  school,
  firstName,
  lastName,
  facebook,
  affiliate
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
     <h1 style={{color:"red"}}>Veuillez inclure le reste de vos données maintenant</h1>

     </>
    }
    </Grid>

  
  

      <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:"10px",marginBottom:"40px" }}>
         
      <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
           
          
       <p style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center" ,width:"95%"}}>  <span>MON PROFIL</span> <FaCaretDown/></p>
       <Divider variant="fullWidth" sx={{backgroundColor:"#000000",width:"100%"}}  />
        
       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
          <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '200px' }}
            component="img"
            height="200"
            width="300"
            image={file ? file : state.imageUrl !== "" ? state.imageUrl : DEFAULTIMG}
            alt="IMG"
          />
          <Button component="label" variant="contained" style={{ minHeight: '45px', minWidth: '145px', backgroundColor: '#000000', marginTop: '15px' }}>
            <b>TÉLÉCHARGER</b>
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleselectedFile}
            />
          </Button>
        </div>



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
        {<Select
          style={{backgroundColor:"#FFFFFF",borderRadius:"0.1rem",width:"100%"}}
         inputProps={{
          classes: {
              icon: classes.icon,
          },
      }}
        
          labelId="hi-label"
          id="hi"
          value={classes}
          label="Classe et option"
          onChange={(event) => {
            setClasses(event.target.value);
          }}
        >
       
      
  <MenuItem  value={"6eme Annee"}>6eme Annee</MenuItem>
  <MenuItem   value={"10eme Annee"}>10eme Annee</MenuItem>
  <MenuItem   value={"Terminales"}>Terminales</MenuItem>

       
        </Select>}
        </Grid>


        <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
        <TextField
        fullWidth
        placeholder=" "
        variant="outlined"
        multiline
        maxRows={2}
        value={affiliate}
        onChange = {(e)=>{setAffiliate(e.target.value)}}
        label= "Identifiant Affilié"
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
          onClick ={(e)=>{settingsUpdate(e)}}
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