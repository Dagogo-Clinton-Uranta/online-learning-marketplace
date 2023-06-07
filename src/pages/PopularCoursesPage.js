import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import math from 'src/assets/images/math.jpeg'
import MathCover from 'src/assets/images/mathcover.jpeg'
import library from 'src/assets/images/library.jpeg'
import DNA  from 'src/assets/images/DNA.jpeg'

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
import SampleCardPage from './SampleCardPage';

function PopularCoursesPage() {
  const navigate = useNavigate();
  const [chosen,setChosen] = useState(1);

 
  const topics = [
    {title:"Chemie 10e Annee ",author:"Sidiki Keita",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem},
    {title:"Anglais 10e Annee ",author:"Kabinet Keita",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie 10e Annee ",author:"Elhadj Keita",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie 10e Annee",author:"Sidiki Keita",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques 10e Annee",author:"Fode Keita",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie 10e Annee",author:"Sidiki Keita",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
  ]



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
            onClick={()=>{navigate('/dashboard/other-courses')}}
            >
            Tous
            </Button>

            <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{setChosen(1)}}
            >
            Terminales
            </Button>

   
    </center>



    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"10px" }}>
    
           <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{setChosen(2)}}
            >
             6eme Année
            </Button>

            <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{setChosen(3)}}
            >
            10eme Année
            </Button>

    
    </center>
    </Grid>

    
   

     <Grid container spacing={2} >

     
     <Grid container item xs={12} spacing={1} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px"}}>
      
     {topics.slice(0,1).map((topic)=>(   
         <Grid item xs={11} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px"}}>
          <SampleCardPage title={topic.title} image = {chosen===1?MathCover:(chosen===2?DNA:library)} author ={topic.author} price={topic.price} lessons={topic.lessons} time={topic.time} /> 
         </Grid>
      ))}


     </Grid>
         
       <Grid container item xs={12} spacing={3} style={{ display: 'flex', justifyContent: 'center',marginBottom:"20px" }}>
         
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

export default PopularCoursesPage;