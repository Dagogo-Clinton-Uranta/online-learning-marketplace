import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useContext,useEffect,useRef, useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';


import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';

import {fetchCategorySubjects,fetchAllCategories} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';

import users from 'src/_mock/user';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

function MobileWelcomePage() {
  const navigate = useNavigate();
 
  const dispatch = useDispatch();

 
  
 // window.onbeforeunload = function () {
 //   usePrompt("you may have to go online to retrieve this page")
 // 
 // }

const { user,error } = useSelector((state) => state.auth);
const { allCategories } = useSelector((state) => state.group);
console.log("categories/COURSES",allCategories)



useEffect(()=>{
   if(!user){
    navigate('/login')
   }

   if(user && !user.fullName){
    navigate('/dashboard/profile')
   }

   dispatch(fetchAllCategories())

   
},[])




  const populateCategory = (category) => {
   
    dispatch(fetchCategorySubjects(category))
    console.log(`NOW REDIRECTING to ${category}!!!`)
      
    setTimeout(()=>{ navigate('/dashboard/6e')},1000)

  }


  return (
    <>
    <Container  maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 

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
   
    {allCategories.length > 0 ?
     
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

</Container>
    </>
  );
}

export default MobileWelcomePage;