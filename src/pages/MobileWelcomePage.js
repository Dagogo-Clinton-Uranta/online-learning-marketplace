import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useContext,useEffect,useRef, useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

import math from 'src/assets/images/math.jpeg'
import MathCover from 'src/assets/images/mathcover.jpeg'
import library from 'src/assets/images/library.jpeg'
import DNA  from 'src/assets/images/DNA.jpeg'
import chem from 'src/assets/images/chembeak.jpeg'
import chem2 from 'src/assets/images/chem2.jpeg'
import biology from 'src/assets/images/biology.jpeg'
import english from 'src/assets/images/english.jpeg'
import philosophy from 'src/assets/images/philoslib.jpeg'


import a1 from 'src/assets/images/1.jpeg'
import a2 from 'src/assets/images/2.jpeg'
import a3 from 'src/assets/images/3.jpeg'
import a4 from 'src/assets/images/4.jpeg'
import a5 from 'src/assets/images/5.jpeg'
import a6 from 'src/assets/images/6.jpeg'
import a7 from 'src/assets/images/7.jpeg'
import a8 from 'src/assets/images/8.png'
import a9 from 'src/assets/images/9.jpeg'
import a10 from 'src/assets/images/10.jpeg'

import SampleCardPage from './SampleCardPage';
import TeacherCardPage from './TeacherCardPage';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';

import {fetchCategorySubjects,fetchAllCategories,fetchCurrentSubject,getTeachers} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';

import users from 'src/_mock/user';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReactPlayer from 'react-player';

function MobileWelcomePage() {
  const navigate = useNavigate();
 
  const dispatch = useDispatch();

 
  
 // window.onbeforeunload = function () {
 //   usePrompt("you may have to go online to retrieve this page")
 // 
 // }

const { user,error } = useSelector((state) => state.auth);
const { allCategories,categorySubjects } = useSelector((state) => state.group);
const [topics,setTopics] = useState([])
const { teachers } = useSelector((state) => state.group);
const [teacherArr, setTeacherArr] = useState([]/*teachers*/);

console.log("teahcers from DATABASE",teachers)

console.log("categories/COURSES",allCategories)



const oldTopics = [
  {title:"Chemie 10e Annee ",author:"Sidiki Keita",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem},
  {title:"Anglais 10e Annee ",author:"Kabinet Keita",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
  {title:"Biologie 10e Annee ",author:"Elhadj Keita",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
  {title:"Philosophie 10e Annee",author:"Sidiki Keita",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
  {title:"Mathematiques 10e Annee",author:"Fode Keita",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
  {title:"Chemie 10e Annee",author:"Sidiki Keita",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
  {image:chem2},
  {image:DNA},
  {image:MathCover},
  {image:library},
  {image:a1},
  {image:a2},
  {image:a3},
  {image:a4},
  {image:a5},
  {image:a6},
  {image:a7},
  {image:a8},
  {image:a9},
  {image:a10},
  
  
]


useEffect(()=>{
   if(!user){
    navigate('/login')
   }

   dispatch(getTeachers())
   dispatch(fetchCategorySubjects("Terminales"))
   dispatch(fetchAllCategories())

   
},[])



useEffect(()=>{

  setTopics(categorySubjects)

},[categorySubjects])







  const populateCategory = (category) => {
   
    dispatch(fetchCategorySubjects(category))
    console.log(`NOW REDIRECTING to ${category}!!!`)
      
    setTimeout(()=>{ navigate('/dashboard/6e')},1000)

  }


  return (
    <div >
    <Container  maxWidth="xs" sx={{backgroundColor:"white",position:"relative" ,border:"1px solid lightgray"}}> 

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
            //onClick ={()=>{navigate('/dashboard/other-courses')}}
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
         <FacebookIcon style={{height:"16px"}}/>  <InstagramIcon style={{height:"16px"}}/>  <span style={{fontSize:"11px"}}>/@bonecole</span>
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
   
    {allCategories && allCategories.length > 0 ?
     
      allCategories.map((item)=>(

        <Button   variant="contained" 
        style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",
        paddingRight: '4px', paddingLeft: '4px',width:"30%"}}
        onClick={()=>{populateCategory(item.title)}}
        >
        {item.title}
        </Button>

      ))

      
      :
      <>
       <Button   variant="contained" 
        style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",
        paddingRight: '4px', paddingLeft: '4px',width:"30%"}}
        onClick={()=>{populateCategory("Terminales")}}
        >
        Terminales
        </Button>

        <Button   variant="contained" 
        style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",
        paddingRight: '4px', paddingLeft: '4px',width:"30%"}}
        onClick={()=>{populateCategory("10eme Annee")}}
        >
        10e Année
        </Button>

        <Button   variant="contained" 
        style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",
        paddingRight: '4px', paddingLeft: '4px',width:"30%"}}
        onClick={()=>{populateCategory("6eme Annee")}}
        >
        6e Année
        </Button>

        </>
   }

</center>
</Grid>


      
<Grid container item xs={12} spacing={1} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px"}}>
      
      {categorySubjects.length >0 && topics.slice(0,4).map((topic,i)=>(   
          <Grid item xs={11}  onClick={()=>{dispatch(fetchCurrentSubject(topic))}}
          style={{ display: 'flex', justifyContent: 'center',marginTop:"20px"}}>
           <SampleCardPage 
           uid={topic.uid} title={topic.title} image = {topic && topic.subjectImageUrl && topic.subjectImageUrl.length > 1?topic.subjectImageUrl:(oldTopics[i] && oldTopics[i].image?oldTopics[i].image:a10)} author ={topic.instructor} price={topic.price} lessons={15} time={"2H 26 MINS"} /> 
          {/*gotta pass the id into the card so we can use it when clicked */}
          </Grid>
       ))}
 
 
      </Grid>

         <center style={{marginTop:"2.5rem"}}>
          <h2 style={{fontSize:"2rem"}}>  Rencontrez nos Professeurs</h2>

          <p style={{marginTop:"2rem",padding:"0.5rem",fontSize:"1.3rem",color:"grey"}}>Commencez votre apprentissage avec les meilleurs enseignants.</p>
         </center>

      <Grid container item xs={12} spacing={1} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px"}}>
      
      {teachers && teachers.length >0 && teachers.slice(0,5).map((topic,i)=>(   
      
          <Grid item xs={11}  onClick={()=>{dispatch(fetchCurrentSubject(topic))}}
          style={{ display: 'flex', justifyContent: 'center',marginTop:"20px"}}>
           
           <TeacherCardPage 
           uid={topic.uid} firstName={topic.firstName} lastName={topic.lastName} imageUrl = {topic && topic.imageUrl && topic.imageUrl.length > 1?topic.imageUrl:(oldTopics[i] && oldTopics[i].image?oldTopics[i].image:a10)} subject ={topic.subject} bio={topic.bio}  level={topic.level} /> 
          {/*gotta pass the id into the card so we can use it when clicked */}
          </Grid>
       ))}
 
 
      </Grid>


      <center style={{marginTop:"2.5rem"}}>
          <h2 style={{fontSize:"2rem"}}> VOIR +</h2>

          <p style={{marginTop:"1rem",padding:"0.5rem",fontSize:"1.3rem",color:"grey"}}>Regardez nos guides tutoriels pour mieux navigeur.</p>
         
        { 
        
        <ReactPlayer   
        config={{ file: { attributes: { controlsList: 'nodownload',disablepictureinpicture: 'true' } } }}
          width="100%"
          height="20rem"
          id="full-screenVideo"                                              
          className="videoFrame"
          url={"https://www.youtube.com/watch?v=wdNzKvLUO-E&t=23s"}
          //light={thumbnail}
          
          playIcon={' '}
          controls
          
        //onClickPreview = {()=>{setTouch(false);}}
         
       />
        
        }
         
         </center>


         <div container xs={12} md={12}  lg={12} spacing={0} style={{width:"100%",backgroundColor:"#485FEB",marginTop:"30px",marginBottom:"30px",fontSize:"0.8rem" ,display: 'flex', justifyContent: 'center',position:"relative",paddingLeft:"0.5rem",paddingTop:"0.5rem",paddingBottom:"0.5rem",borderRadius:"1rem" }}>
      <div item xs={12} spacing={0}  md={12}  lg={12} style={{color:"white" , display: 'flex',flexDirection:"column", justifyContent: 'center',gap:"30px",paddingTop:"1rem",paddingLeft:"20px",paddingRight:"20px"}}>
       
     
       <div   style={{position:"relative",fontSize:"1.5rem"}}>
      
       Ne ratez pas nos nouveatués et offres specialés
        
       </div>
       

     

       <div style={{display: 'flex',gap:"1rem", flexDirection:"column", justifyContent: 'center',alignItems:"center"}}>
         <p style={{fontSize:"1rem"}}>Suivez nous sur...</p>

         <div  style={{display: 'flex', justifyContent: 'center',alignItems:"center",gap:"0.5rem"}}>
         <a href={"https://www.facebook.com/biropunchline?ref=pages_you_manage"} target="_blank"> <FacebookIcon style={{height:"36px"}}/> </a>
         <a href={"https://www.linkedin.com/company/bonecole-inc/?viewAsMember=true"} target="_blank"> <LinkedinIcon style={{height:"36px"}}/> </a>
         <a href={"https://twitter.com/BonecoleInc"} target="_blank">   <TwitterIcon style={{height:"36px"}}/> </a>
           <span style={{fontSize:"21px"}}>/@bonecole</span>
         </div>

       </div>

      </div>

        
    </div>



   
  
</Container>

<center  >
<div style={{maxWidth:"27.7rem",position:"relative", display:"flex",justifyContent:"center"}}>
<Grid container xs={12} md={12}   style={{width:"100%",marginLeft:"0%",backgroundColor:"#5A5A5A",fontSize:"0.8rem" ,display: 'flex', justifyContent: 'center',position:"relative",paddingLeft:"0.5rem",paddingTop:"0.5rem",paddingBottom:"0.5rem"}}>
      <Grid item xs={12} spacing={0}   style={{color:"white" , display: 'flex',flexDirection:"column", justifyContent: 'flex-start',alignItems:"flex-start",gap:"30px",paddingTop:"1rem",paddingLeft:"20px",paddingRight:"20px"}}>
       
     
       <div   style={{position:"relative",fontSize:"1.5rem"}}>
      
       Bonecole
        
       </div>

       <div style={{display: 'flex',gap:"0.5rem", flexDirection:"column", justifyContent: 'flex-start',alignItems:"flex-start"}}>
       <p style={{fontSize:"1rem"}}>Tel: +224 611 23 88 88</p>
       <p style={{fontSize:"1rem"}}>Contact Email : contact@bonecole.com</p>
       </div>

     

       <div style={{display: 'flex',gap:"0.5rem", flexDirection:"column", justifyContent: 'flex-start',alignItems:"flex-start"}}>
         <p style={{fontSize:"1rem"}}>Accueli</p>
         <p style={{fontSize:"1rem"}}>Cours</p>
         <p style={{fontSize:"1rem"}}>A Propos</p>
         <p style={{fontSize:"1rem"}}>Conditions d'utilisation</p>

         <div  style={{display: 'flex', justifyContent: 'center',alignItems:"center",marginTop:"3rem",fontSize:"1.2rem",gap:"0.5rem"}}>
         ©℗ 2023 BONECOLE.INC. ALL RIGHTS RESERVED
         </div>

       </div>



      </Grid>

        
  </Grid>
  </div>
  </center>

    </div>
  );
}

export default MobileWelcomePage;