import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useEffect,useRef, useState } from 'react';
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
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function MobileWelcomePage() {
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

const { user,error } = useSelector((state) => state.auth);
console.log("error is",error)

useEffect(()=>{
   if(!user){
    navigate('/login')
   }
},[])


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

    {/* I am using the navbar in Dashboard layout now, 
    
    <Grid item xs={12} style={{display: 'flex', gap:"7rem",justifyContent: 'space-between', padding:"5px"}}>
     
       <img src ={bonLogo}/> 
       
      <ShortDashboardLayout/>
     

    </Grid>

    <Divider/>
    <br/><br/>*/}

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column"}}>
    <center>
    <h1 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>Préparez le BAC,</h1>
    </center>

    <center>
    <h1 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>BREVET et CEE</h1>
    </center>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px" }}>
      
            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', }}>
              
              <center>
              <Typography variant="h4" component="p">
              Convenablement avec les meilleurs enseignants
              </Typography>
              </center>

            </Box>
           
       </Grid>
   

     <Grid container spacing={2} >
         
     <Grid container item xs={12} spacing={2} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",marginBottom:"40px" }}>
          <Grid item xs={9} spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
           
          
             <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",border:"1px solid black", width:"70%",fontSize:"15px",
            paddingRight: '8px', paddingLeft: '8px'}}
            onClick ={()=>{navigate('/dashboard/other-courses')}}
            >
            S'inscrire maintenant
            </Button>
          
            <br/><br/><br/>
  
          </Grid>
          
        </Grid>



         <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={bonecoleIntro}/>
            </Grid>
         
        </Grid>

        
      
       

      </Grid>
    
      
      <div container xs={12} md={12}  lg={12} spacing={0} style={{width:"100%",backgroundColor:"#485FEB",marginTop:"30px",marginBottom:"30px",fontSize:"0.8rem" ,display: 'flex', justifyContent: 'center',position:"relative",paddingLeft:"0.5rem",paddingTop:"0.5rem",paddingBottom:"0.5rem",borderRadius:"1rem" }}>
      <div item xs={12} spacing={0}  md={12}  lg={12} style={{color:"white" , display: 'flex',flexDirection:"column", justifyContent: 'center',gap:"30px",paddingTop:"1rem",paddingLeft:"20px",paddingRight:"20px"}}>
       
     
       <div  className="cursive" style={{position:"relative"}}>
       <img style={{height:"20px",position:"absolute",top:"-10%",left:"-7.5%"}} src={startQuote}/>
        Le monde dans lequel vivrent les futures generations est different
        de celui auquel nous sommes habituer, Il est primordial que nous preparius nos 
        enfants ainsi que nous-memes pour ce monde. 
        <img style={{height:"20px",position:"absolute",right:"55%", bottom:"-8%"}} src={endQuote}/>
       </div>
       

     

       <div style={{display: 'flex',gap:"1rem", flexDirection:"column", justifyContent: 'center',alignItems:"center"}}>
         <p>Etudiez sans limites!</p>

         <div  style={{display: 'flex', justifyContent: 'center',alignItems:"center",}}>
         <FacebookIcon style={{height:"16px"}}/>  <InstagramIcon style={{height:"16px"}}/> <span style={{fontSize:"11px"}}>/@bonecole</span>
         </div>

       </div>



      </div>

        
    </div>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"2rem"}}>

{/* INSTEAD OF THIS, I AM USING THE NAVBAR IN DASHBOARD PAGES, WHICH SHOWS UP IN EVERY PAGE

<Grid item xs={12} style={{display: 'flex', gap:"11rem",justifyContent: 'space-between', padding:"5px"}}>
 
   <img src ={bonLogo}/> 
   
  <ShortDashboardLayout/>
 

</Grid>

<Divider/>
<br/><br/>*/}


<center>
<h2 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>Cours Populaires</h2>
</center>

<center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"15px" }}>

       <Button   variant="contained" 
        style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",
        paddingRight: '4px', paddingLeft: '4px',width:"30%"}}
        onClick={()=>{navigate('/dashboard/popular-courses')}}
        >
        Terminales
        </Button>

        <Button   variant="contained" 
        style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",
        paddingRight: '4px', paddingLeft: '4px',width:"30%"}}
        onClick={()=>{navigate('/dashboard/10e')}}
        >
        10e Année
        </Button>

        <Button   variant="contained" 
        style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",
        paddingRight: '4px', paddingLeft: '4px',width:"30%"}}
        onClick={()=>{navigate('/dashboard/6e')}}
        >
        6e Année
        </Button>


</center>
</Grid>

</Container>
    </>
  );
}

export default MobileWelcomePage;