import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';
import Alert from '@mui/material/Alert';

import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { signup} from 'src/redux/actions/auth.action';
import { logoutSuccess} from 'src/redux/reducers/auth.slice';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';

import profileImg from 'src/assets/images/randomwoman2.jpg'

import {FaCaretDown} from 'react-icons/fa'


function MobileRegisterPage() {
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
  const [fullName,setFullName] = useState('')
  const [password,setPassword] = useState('')
 
  const [facebook,setFacebook] = useState('')
 const [pvExamen,setPvExamen] = useState('')
 const [classOption,setClassOption] = useState('')
 const [telephone,setTelephone] = useState('')
 const [schoolOrigin,setSchoolOrigin] = useState('')


  const [page2,setPage2] = useState(false)
  const [page1,setPage1] = useState(true)


  const { user,error } = useSelector((state) => state.auth);
  console.log("error is",error)

  useEffect(()=>{
     if(user){
      navigate('/dashboard/home')
     }
  },[])

  const newUser = 
  {
    email,
    fullName,
    password ,
    facebook,
    pvExamen,
    telephone,
    classOption,
    schoolOrigin
  }
 

  const registerFxn = (user,navigate) =>{
    if(!email || !fullName || !password ||!facebook ||!pvExamen ||!telephone ||!classOption ||!schoolOrigin ||!classOption ||!schoolOrigin ){
      notifyErrorFxn("Please make sure to fill in all fields")
    }else{
      dispatch(signup(user,navigate))
    }
  }

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
    {page1 &&
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"40px"}}>
    <center>
    <h1 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>Bienvenue à bonÉcole!</h1>
    </center>

    </Grid>

  
   

     <Grid container spacing={2} >
  
         <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <img style={{width:"80%"}} src={bonecoleIntro}/>
            </Grid>
         
        </Grid>

      </Grid>



      {error && <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(logoutSuccess())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '14px' }}><b>{error.errorMessage}</b></p>
      </Alert><br/></div>}



      <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:error && error.errorMessage?"20px":"80px",marginBottom:"40px" }}>

      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
     <TextField
          sx ={{width:"100%"}}
          id="outlined-basic"
          label="Full name"
          type="text"
          autoComplete="full name"
          onChange={(e)=>{setFullName(e.target.value)}}
        />
      </Grid>  



      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
     <TextField
          sx ={{width:"100%"}}
          id="outlined-basic"
          label="Email address"
          type="email"
          autoComplete="current-email"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </Grid>  
     
     
     
     
      <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>     
      <TextField 
         sx ={{width:"100%"}}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </Grid> 
         
         
         
          <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
             <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",width:"75%",height:"3rem",fontSize:"15px",
            }}
            onClick ={()=>{if(email && fullName && password){
              setPage2(true);setPage1(false)
            }
            else{
              notifyErrorFxn("please fill in all fields before proceeding!")
            }
                 
          }}
            >
            REGISTER
            </Button>
         
          
            <br/><br/><br/>
  
          </Grid>



          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"10px"}}>
         <br/>
       <center>
       <p> Vous avez déjà un compte? &nbsp; <span onClick ={()=>{navigate('/external-login')}}  style={{color:"red",cursor:"pointer",textDecoration:"underline"}}>Se connecter</span> </p>
      </center>

        </Grid>
          

        </Grid>

    
      
    

</Container>
}

{ page2 &&

<Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

<Button   style={{ backgroundColor: "#000000",color:"#FFFFFF",marginTop:"20px",width:"6rem",height:"3rem",fontSize:"15px",
          }}
 onClick={()=>{setPage2(false);setPage1(true)}}>Back</Button>
    
{fullName &&
<Grid item xs={12} style={{display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"0rem",paddingBottom:"0px"}}>

 <br/> 
 <h1>Bienvenue,</h1>
<p style={{color:"gray"}}>{fullName}</p>
</Grid>
}



  <Grid container item xs={12} spacing={2} style={{ display: 'flex',flexDirection:"column" ,justifyContent: 'center',marginTop:"10px",marginBottom:"40px" }}>
     
  <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
       
      
   <p style={{ display: 'flex', justifyContent: 'space-between',alignItems:"center" ,width:"95%"}}>  <span>REGISTRATION (2)</span> <FaCaretDown/></p>
   <Divider variant="fullWidth" sx={{backgroundColor:"#000000",width:"100%"}}  />
    




   <Grid item xs={12} md={8} lg={6}>
    
      <Typography variant="p" component="p">
      Profile Picture
       </Typography>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 200,
          border: '1px solid grey'
        }}
      >
        <center>
        <Typography
            color="textPrimary"
            variant="h3"
            component="p"
          >
          <Button component="label" style={{backgroundColor: 'white' }}>
         <img src={UPLOADIMG} width='100px' height='100px' />
         <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleselectedFile}
            />
            </Button>
      </Typography>
      <Typography
            color="textPrimary"
            variant="p"
            component="p"
          >
        Browse files to upload
      </Typography>
      </center>
      </Paper>
      <p>{selectedFile?.selectedFileName}</p>
    </Grid>


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
    value={facebook}
    onChange={(e)=>{setFacebook(e.target.value)}}
    />
    </Grid>


    <Grid item xs={12} spacing={2} style={{marginTop:"1rem",gap:"10px", display: 'flex',flexDirection:"column", justifyContent: 'space-between',alignItems:"space-between" }}>
    <TextField
    fullWidth
    placeholder=" "
    variant="outlined"
    multiline
    maxRows={2}
    value={schoolOrigin}
    onChange={(e)=>{setSchoolOrigin(e.target.value)}}
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
    value={classOption}
    onChange={(e)=>{setClassOption(e.target.value)}}
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
    onChange={(e)=>{setPvExamen(e.target.value)}}
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
    onChange={(e)=>{setTelephone(e.target.value)}}
    label= "Numero de Telephone"
    />
    </Grid>

   

  


   


    <Grid item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',alignItems:"center" }}>
           
          
           <Button   variant="contained" 
          style={{ backgroundColor: "#000000",color:"#FFFFFF",width:"75%",height:"3rem",fontSize:"15px",
          }}
          onClick ={()=>{registerFxn(newUser,navigate)}}
          >
          SUBMIT
          </Button>
       
        
          <br/><br/><br/>

     </Grid>

   
    </Grid>



{error && <div><Alert
        severity="error" color="error"
        action={
          <Button color="inherit" size="small" style={{ fontSize: '15px' }} onClick={() => {dispatch(logoutSuccess())}}>
            <b>X</b>
          </Button>
        }
      >
        <p style={{ fontSize: '14px' }}><b>{error.errorMessage}</b></p>
      </Alert><br/></div>}


<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",paddingTop:"1rem",paddingBottom:"10px"}}>
         <br/>
       <center>
       <p> Vous avez déjà un compte? &nbsp; <span onClick ={()=>{navigate('/external-login')}}  style={{color:"red",cursor:"pointer",textDecoration:"underline"}}>Se connecter</span> </p>
      </center>

        </Grid>


</Container>
 }

    </>
  );
}

export default MobileRegisterPage;