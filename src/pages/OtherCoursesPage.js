import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import math from 'src/assets/images/math.jpeg'
import chem from 'src/assets/images/chembeak.jpeg'
import chem2 from 'src/assets/images/chem2.jpeg'
import biology from 'src/assets/images/biology.jpeg'
import english from 'src/assets/images/english.jpeg'
import philosophy from 'src/assets/images/philoslib.jpeg'

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

  const { user } = useSelector((state) => state.auth);
  console.log("user details are:",user)

  /*const [releaseDate,setReleaseDate] =useState('')
  const [director,setDirector] =useState('')
  const [cast,setCast] =useState([])
  const [description,setDescription] =useState('')
  const [trivia,setTrivia] =useState('')*/
  
  const groupData = {
    email:user.email,
    password:user.password,
    newPassword,
    companySize,
    uid:user.uid
  }


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
    
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column"}}>
    <center>
    <h2 style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"30px"}}>Cours</h2>
    </center>

    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"40px" }}>
    
           <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",border:"1px solid black", fontSize:"12px",width:"100px",
            paddingRight: '4px', paddingLeft: '4px'}}
            onClick={()=>{navigate('/dashboard/popular-courses')}}
            >
            Tous
            </Button>

            <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"100px",
            paddingRight: '4px', paddingLeft: '4px'}}
            onClick={()=>{navigate('/dashboard/popular-courses')}}
            >
            Terminales
            </Button>

   
    </center>



    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"40px" }}>
    
           <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"100px",
            paddingRight: '4px', paddingLeft: '4px'}}
            onClick={()=>{navigate('/dashboard/popular-courses')}}
            >
             6eme Année
            </Button>

            <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"100px",
            paddingRight: '4px', paddingLeft: '4px'}}
            onClick={()=>{navigate('/dashboard/popular-courses')}}
            >
            10eme Année
            </Button>

    
    </center>
    </Grid>

    
   

     <Grid container spacing={2} >
         
       <Grid container item xs={12} spacing={0} style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",marginBottom:"40px" }}>
         
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
    
      
      <div container xs={12} md={12}  lg={12} spacing={0} style={{width:"444px",backgroundColor:"blue",marginTop:"30px",fontSize:"0.8rem" ,display: 'flex', justifyContent: 'center',position:"relative",left:"-6%",paddingLeft:"0.5rem",paddingTop:"0.5rem",paddingBottom:"0.5rem" }}>
      <div item xs={12} spacing={0}  md={12}  lg={12} style={{color:"white" , display: 'flex', justifyContent: 'center',gap:"30px",paddingLeft:"20px",paddingRight:"20px"}}>
       
     
       <div  className="cursive" style={{flex:4 ,position:"relative"}}>
       <img style={{height:"20px",position:"absolute",left:"-10%"}} src={startQuote}/>
        Le monde dans lequel vivrent les futures generations est different
        de celui auquel nous sommes habituer, Il est primordial que nous preparius nos 
        enfants ainsi que nous-memes pour ce monde. 
        <img style={{height:"20px",position:"absolute",right:"23%", bottom:"0%"}} src={endQuote}/>
       </div>
       

     

       <div style={{flex:1,display: 'flex', flexDirection:"column", justifyContent: 'space-around'}}>
         <p>Etudiez sans limites!</p>

         <div  style={{display: 'flex', justifyContent: 'center',alignItems:"center",gap:"0px"}}>
         <FacebookIcon style={{height:"16px"}}/>  <InstagramIcon style={{height:"16px"}}/> <span style={{fontSize:"11px"}}>/@bonecole</span>
         </div>

       </div>



      </div>

        
    </div>

</Container>
    </>
  );
}

export default OtherCoursesPage;