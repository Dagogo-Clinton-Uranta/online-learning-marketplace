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

import { fetchCurrentSubject} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import SmallerCardPage from './SmallerCardPage';
import SampleCardPage from './SampleCardPage';
import {fetchCategorySubjects} from 'src/redux/actions/group.action';

function SixePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chosen,setChosen] = useState('');
  

  const { categorySubjects, allCategories} = useSelector((state) => state.group);


  const { user,error } = useSelector((state) => state.auth);
console.log("error is",error)

const [topics,setTopics] = useState(categorySubjects);
console.log("category subs are ",categorySubjects)


useEffect(()=>{
   if(!user){
    navigate('/login')
   }

   setTopics(categorySubjects)
   setChosen(categorySubjects[0].category)
},[categorySubjects])

 
  const oldTopics = [
    {title:"Chemie 10e Annee ",author:"Sidiki Keita",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem},
    {title:"Anglais 10e Annee ",author:"Kabinet Keita",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie 10e Annee ",author:"Elhadj Keita",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie 10e Annee",author:"Sidiki Keita",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques 10e Annee",author:"Fode Keita",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie 10e Annee",author:"Sidiki Keita",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
  ]

  const populateCategory = (category) => {
   
    dispatch(fetchCategorySubjects(category))
    console.log(`NOW REDIRECTING to ${category}!!!`)
      
    setTimeout(()=>{ navigate('/dashboard/6e')},1000)

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
    


    {allCategories.length > 0 ?
     

   <center  style={{ display: 'flex', width:"100%",justifyContent: 'center',marginTop:"20px",gap:"10px" }}>
    {allCategories.map((item)=>(

      <Button   variant="contained" 
      style={{ flex:"50%" ,backgroundColor:chosen===item.title?"#000000": "#FFFFFF",color:chosen===item.title?"#FFFFFF":"#000000",
      border:"1px solid black", fontSize:"12px",width:"40%",
      padding: '8px'}}
      onClick={()=>{populateCategory(item.title)}}
      >
      {item.title}
      </Button>

     ))}
   </center> 
    :
    <>
    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"10px" }}>
    
           <Button   variant="contained" 
            style={{ backgroundColor:chosen==="Tous"?"#000000": "#FFFFFF",color:chosen==="Tous"?"#FFFFFF":"#000000",
            border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
           
            onClick={()=>{populateCategory("Terminales")}}
            >
            Tous
            </Button>

            <Button   variant="contained" 
            style={{ backgroundColor:chosen==="Terminales"?"#000000": "#FFFFFF",color:chosen==="Terminales"?"#FFFFFF":"#000000",
            border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{populateCategory("Terminales")}}
            >
            Terminales
            </Button>

   
    </center>



    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"10px" }}>
    
           <Button   variant="contained" 
           

            style={{ backgroundColor:chosen==="6eme Annee"?"#000000": "#FFFFFF",color:chosen==="6eme Annee"?"#FFFFFF":"#000000",
            border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{populateCategory("6eme Annee")}}
            >
             6eme Année
            </Button>

            <Button   variant="contained" 
            style={{ backgroundColor:chosen==="10eme Annee"?"#000000": "#FFFFFF",color:chosen==="10eme Annee"?"#FFFFFF":"#000000",
            border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{populateCategory("10eme Annee")}}
            >
            10eme Année
            </Button>

    
    </center>
  </>
    }

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

     
     <Grid container item xs={12} spacing={1} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px"}}>
      
     {topics.slice(0,1).map((topic)=>(   
         <Grid item xs={11}  onClick={()=>{dispatch(fetchCurrentSubject(topic))}}
         style={{ display: 'flex', justifyContent: 'center',marginTop:"20px"}}>
          <SampleCardPage 
          uid={topic.uid} title={topic.title} image = {oldTopics[Math.floor(Math.random()*4)].image} author ={topic.instructor} price={topic.price} lessons={15} time={"2H 26 MINS"} /> 
         {/*gotta pass the id into the card so we can use it when clicked */}
         </Grid>
      ))}


     </Grid>
         
       <Grid container item xs={12} spacing={3} style={{ display: 'flex', justifyContent: 'center',marginBottom:"20px" }}>
         
     {topics.slice(1,topics.length).map((topic)=>(   
         <Grid item xs={6} onClick={()=>{dispatch(fetchCurrentSubject(topic))}}
         style={{ display: 'flex', justifyContent: 'center' ,marginBottom:"20px",marginTop:"20px"}}>
          <SmallerCardPage 
          uid={topic.uid}  title={topic.title} image = {oldTopics[Math.floor(Math.random()*4)].image} author ={topic.instructor} price={"22,000"} lessons={15} time={"2H 26 MINS"} /> 
         </Grid>
      ))}
         
        </Grid>
      </Grid>
    
  
</Container>
    </>
  );
}

export default SixePage;