import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Avatar from '@mui/material/Avatar';

import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import profile from 'src/assets/images/profile.jpeg'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import math from 'src/assets/images/math.jpeg'
import chem from 'src/assets/images/chembeak.jpeg'
import chem2 from 'src/assets/images/chem2.jpeg'
import biology from 'src/assets/images/biology.jpeg'
import english from 'src/assets/images/english.jpeg'
import philosophy from 'src/assets/images/philoslib.jpeg'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';

import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import SmallerCardPage from './SmallerCardPage';

function OtherCoursesPage() {
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

 
  const topics = [
    {title:"Chemie ",author:"Sidiki...",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem2},
    {title:"Anglais ",author:"Kabinet...",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie ",author:"Elhadj... ",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie",author:"Sidiki...",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques",author:"Fode...",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie",author:"Sidiki...",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
  ]



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
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray",fontSize:"0.85rem"}}> 
    

    <Grid container xs={12} style={{marginTop:"2rem",padding:"1.5rem", background:`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(${chem})`,borderRadius:"0.5rem",}}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem",color:"white"}}>
      
      <h3 style={{fontSize:"0.9rem"}}>CHIMIE TSE/TSM</h3>
      
       <p style={{marginTop:"0.5rem"}}>
       Conçu par le MENA en collaboration avec L’INRAP, 
       ce programme de chimie Terminales est un programme harmonisé.
       </p>

       <p style={{marginTop:"2rem"}}>
         <p style={{marginBottom:"1rem"}}> Ce cours couvre ce qui suit:</p>
        <ol>

          <li>1.) La notion de pH de quantité et concentration</li>
          <li>2.) Un acide fort, une base forte, un acide </li>
          <li>3.) La constante d’acidité</li>
          <li>4.) L’évolution des systèmes</li>
          <li>5.) La stéréochimie,</li>
        </ol>
       </p>

       <p style={{marginTop:"2rem",display:"flex",gap:"1rem",justifyContent:"flex-start"}}>
        <Avatar alt="placeholder avatar" sx={{ width: 48, height: 48 }} src={profile}/>
        
        <p>
          BAFODE BANGOURA
          <br/>
          Terminales
        </p>
       </p>
    

      </Grid>
    </Grid>
   
    <center>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center',alignItems:"center",marginBottom:"2rem",marginTop:"2rem",flexDirection:"column",gap:"1rem",border:"1px solid lightgrey",width:"85%",padding:"1rem",borderRadius:"0.5rem"}}>
   
    <center >
    <b style={{fontSize:"1.2rem"}}> 30,000 GNF</b> <s>50,000 GNF</s>
    </center>
    
    <p >
    Achat unique, accès à toutes les leçons
    </p>

    <Button   variant="contained" 
            style={{ backgroundColor: "red",color:"#FFFFFF", fontSize:"0.9rem",width:"100%",
            padding: '8px'}}
            
            >
            Acheter maintenant
            </Button>
   
    </Grid>
    </center>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem"}}>
    <center>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",borderBottom:"3px solid red",width:"max-content"}}>Curriculum</p>
    </center>
    </Grid>

  <Grid container xs={12} style={{paddingTop:"1.5rem"}}>
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
      Chapitre 1: Acide et base en solution aqueuese
     <PictureAsPdfIcon style={{fontSize:"2.2rem"}} />
     </p>
    
    </Grid>
    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p><PlayCircleFilledWhiteIcon style={{color:"red",fontSize:"2.2rem"}}/>&nbsp; 1.)</p>
     <p>  Dissociation et produit ionique</p>
     <p>8:00</p>
    
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p><PlayCircleFilledWhiteIcon style={{color:"red",fontSize:"2.2rem"}}/>&nbsp; 2.) </p>
     <p> Dissociation et produit ionique</p>
     <p>8:00</p>
    
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p><PlayCircleFilledWhiteIcon style={{color:"red",fontSize:"2.2rem"}}/> &nbsp; 3.)</p>
     <p>  Dissociation et produit ionique</p>
     <p>8:00</p>
    
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p><PlayCircleFilledWhiteIcon style={{color:"red",fontSize:"2.2rem"}}/>&nbsp; 4.) </p>
     <p> Dissociation et produit ionique</p>
     <p>8:00</p>
    
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p><PlayCircleFilledWhiteIcon style={{color:"red",fontSize:"2.2rem"}}/>&nbsp; 5.) </p>
     <p> Dissociation et produit ionique</p>
     <p>8:00</p>
    
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p><PlayCircleFilledWhiteIcon style={{color:"red",fontSize:"2.2rem"}}/>&nbsp; 6.)</p>
     <p>  Dissociation et produit ionique</p>
     <p>8:00</p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"1rem",paddingBottom:"1rem"}}>
   
    <p style={{position:"relative",display: 'flex', justifyContent: 'flex-start',paddingBottom:"0.5rem",alignItems:"center",gap:"1rem"}}>
    <PictureAsPdfIcon style={{color:"blue",fontSize:"2.2rem"}} />
     QCM - Chapitre 1
     </p>
     <Divider/>
    
    </Grid>


   </Grid>


   <Grid container xs={12} style={{paddingTop:"1.5rem"}}>
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",display: 'flex',marginLeft:"0.4rem", justifyContent: 'space-between',fontWeight:"bold",fontSize:"1rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
      Chapitre 2: Acide et base en solution aqueuese
     <PictureAsPdfIcon style={{fontSize:"2.2rem"}} />
     </p>
    
    </Grid>
    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p><PlayCircleFilledWhiteIcon style={{color:"red",fontSize:"2.2rem"}}/>&nbsp;  1.)</p>
     
     <p > Dissociation et produit ionique</p>
     <p>8:00</p>
    
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p><PlayCircleFilledWhiteIcon style={{color:"red",fontSize:"2.2rem"}}/>&nbsp; 2.) </p>
     <p> Dissociation et produit ionique</p>
     <p>8:00</p>
    
    </Grid>




    <Grid item xs={12} style={{paddingTop:"1rem",paddingBottom:"1rem"}}>
   
    <p style={{position:"relative",display: 'flex', justifyContent: 'flex-start',paddingBottom:"0.5rem",alignItems:"center",gap:"1rem"}}>
    <PictureAsPdfIcon style={{color:"blue",fontSize:"2.2rem"}} />
     QCM - Chapitre 2
     </p>
     <Divider/>
    
    </Grid>
   </Grid>
       

</Container>
    </>
  );
}

export default OtherCoursesPage;