import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import profileImg from 'src/assets/images/randomwoman2.jpg'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';
import {FaCaretDown} from 'react-icons/fa'


import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';


function ExternalLoginPage() {
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

 

  /*const [releaseDate,setReleaseDate] =useState('')
  const [director,setDirector] =useState('')
  const [cast,setCast] =useState([])
  const [description,setDescription] =useState('')
  const [trivia,setTrivia] =useState('')*/
  



  const handleselectedFile = event => {
    console.log("these are the picture deets!",event.target.files[0])
    setSelectedFile({
        selectedFile: event.target.files[0],
        selectedFileName: event.target.files[0].name
    });
    
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileSize(event.target.files[0].size)
};
 /* const handleselectedFile2 = event => {
    console.log("these are the video deets!",event.target.files[0])
    setSelectedFile2({
        selectedFile2: event.target.files[0],
        selectedFileName2: event.target.files[0].name
    });
    setFile2(URL.createObjectURL(event.target.files[0]));
    setFileSize2(event.target.files[0].size)
};*/



const uploadMovie = (movieData = 0,image = 0,) => {
if(!companySize.length && !newPassword.length &&  file === undefined ){
  console.log("THE EMPTY FIELDS ARE:",file)
  notifyErrorFxn("Please fill in the field(s) you want to update!")
}else{
 if( fileSize  > 300000){
  notifyErrorFxn("Image size too large! please upload a smaller picture.")
 }
 /*else if( fileSize2  > 20000000){
  notifyErrorFxn("Video size too large! please upload a smaller video.")
 }*/else{
  dispatch(uploadUserSettings(movieData,image))
 }
}
}

  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

    

    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
   
     <br/> 
     <h1>Bienvenue,</h1>
    <p style={{color:"gray"}}>Sidike Keita</p>
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
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
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
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
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
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
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
        //onChange = {(e)=>{setConfirmPassword(e.target.value)}}
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

       

      


        <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#f00c44",color:"#FFFFFF",width:"100%",height:"3rem",fontSize:"12px",
          }}
          //onClick ={()=>{navigate('/login')}}
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
          
        </Grid>

    
        
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center',alignItems:"center", flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <Button   variant="contained" 
            style={{ backgroundColor: "transparent",color:"#000000",width:"50%",height:"2.5rem",fontSize:"12px",
            }}
            //onClick ={()=>{navigate('/login')}}
            >
            Se déconnecter
            </Button>
   
    </Grid>
    

</Container>
    </>
  );
}

export default ExternalLoginPage;