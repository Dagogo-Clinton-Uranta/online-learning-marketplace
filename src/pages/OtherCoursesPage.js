import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useEffect,useRef, useState } from 'react';
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
    {title:"Chemie 10e Annee ",author:"Sidiki Keita",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem},
    {title:"Anglais 10e Annee ",author:"Kabinet Keita",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie 10e Annee ",author:"Elhadj Keita",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie 10e Annee",author:"Sidiki Keita",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques 10e Annee",author:"Fode Keita",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie 10e Annee",author:"Sidiki Keita",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
  ]


  




const { user,error } = useSelector((state) => state.auth);
//console.log("error is",error)

useEffect(()=>{
   if(!user){
    navigate('/login')
   }


},[])



  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 
    
  


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


    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"10px" }}>
  

     <Button   variant="contained" 
     style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
     padding: '8px'}}
     onClick={()=>{navigate('/dashboard/saved-courses')}}
     >
     My Courses
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
         
        </Grid>
      </Grid>
    
  
</Container>
    </>
  );
}

export default OtherCoursesPage;