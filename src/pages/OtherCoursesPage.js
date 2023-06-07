import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import bonLogo from 'src/assets/images/bonlogo.png'
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
    {title:"Chemie ",author:"Sidiki Keita",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem2},
    {title:"Anglais ",author:"Kabinet Keita",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie ",author:"Elhadj Keita",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie",author:"Sidiki Keita",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques",author:"Fode Keita",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie",author:"Sidiki Keita",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
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
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 
    
   {/* i AM USING THE DASHBOARD LAYOUT NOW WHICH APPEARS ON ALL PAGES
   
   <Grid item xs={12} style={{display: 'flex', gap:"11rem",justifyContent: 'space-between', padding:"5px"}}>
     
       <img src ={bonLogo}/> 
       
      <ShortDashboardLayout/>
     

    </Grid>

    <Divider/>
  <br/><br/>*/}


    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column"}}>
   

    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"10px" }}>
    
           <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{navigate('/dashboard/popular-courses')}}
            >
            Tous
            </Button>

            <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{navigate('/dashboard/popular-courses')}}
            >
            Terminales
            </Button>

   
    </center>



    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"10px" }}>
    
           <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{navigate('/dashboard/popular-courses')}}
            >
             6eme Année
            </Button>

            <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{navigate('/dashboard/popular-courses')}}
            >
            10eme Année
            </Button>

    
    </center>
    </Grid>

    
   

     <Grid container spacing={2} >
         
       <Grid container item xs={12} spacing={3} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",marginBottom:"40px" }}>
         
     {topics.map((topic)=>(   
         <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' ,marginBottom:"20px",marginTop:"20px"}}>
          <SmallerCardPage title={topic.title} image = {topic.image} author ={topic.author} price={topic.price} lessons={topic.lessons} time={topic.time} /> 
         </Grid>
      ))}
         
         {/*<Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <SampleCardPage/> 
         </Grid>

         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <SampleCardPage/> 
         </Grid>*/}

         
        </Grid>
      </Grid>
    
  
</Container>
    </>
  );
}

export default OtherCoursesPage;