import { useState,useEffect,useRef} from 'react';
import { Helmet } from 'react-helmet-async';
import ReactPlayer from 'react-player'
import { findDOMNode } from 'react-dom'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useTheme } from '@mui/material/styles';
// import { Grid, Container, Typography, Paper, Button } from '@mui/material';
import { Button, TextField } from '@mui/material';
import {Box,Icon,Typography,CardMedia,CssBaseline,Grid,Container,FormControlLabel, Checkbox, makeStyles} from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DEFAULTIMG from '../assets/images/blackBackground.png';
import ListRowCard from 'src/components/incubator/list-card';
import SubSectionCard from   'src/components/incubator/list-card';


import {fetchVideoSubsection} from 'src/redux/actions/group.action';
import { fetchUserData } from 'src/redux/actions/auth.action';


const useStyles = makeStyles((theme) => ({
  textField: {
  padding: '8px',
   border: '0px solid grey',
  },
  paper: {
    display: "flex",
    width: "auto",
  },
  grid: {
    width: "auto",
  },
  arrow: {
    padding: theme.spacing(3),
  },
  box: {
  //   padding: theme.spacing(3),
    paddingLeft: theme.spacing(8),
  },
}));

export default function ViewIncubatorPage() {
   const dispatch = useDispatch()
   const location = useLocation()
   const { allSectionVideos,requestedSection,nextUpVideo } = useSelector((state) => state.group);
   const { user} = useSelector((state) => state.auth);
   console.log("user's info is",user)
   const videoRef = useRef()

   const handleEsc = (event) => {
    setFullScreen(!fullScreen)
  
    console.log("full screen is",fullScreen)

};

const playVideo = () => {
  setVideoTime(true)
  setThumbnail(false)

}


const pauseVideo = () => {
  setVideoTime(false)
 setThumbnail(cover)
}

//i will use video actions fxn when its time to play full screen
const doVideoActions = () => {
  setVideoTime(!videoTime)
 
  if(!videoTime) 
  {setThumbnail(false)
  }else{setThumbnail(cover)}

  
  // if(!videoTime){
  // findDOMNode(videoRef.current).requestFullscreen()
  // }
}

window.addEventListener('fullscreenchange', handleEsc);
  
   const dummyData = [
    {id: 1, title: "General (16 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {id: 2, title: "Public (11 mins)", desc: "Tetsla ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
    {id: 3, title: "Future (39 mins)", desc: "Lorem ipsum dolor sit amet consectetur tesdsjk. Eget cursus..."},
];

 const [refresh,setRefresh] = useState(true)
 //to refresh and set the videos next up 


   const [subSection,setSubSection] = useState(allSectionVideos)
   const [videoTime,setVideoTime] = useState(false)
   const [screenTest, setScreenTest] = useState(false);
   const [data,setData] = useState(allSectionVideos?allSectionVideos:dummyData)
   const [cover,setCover] = useState(DEFAULTIMG)
   const [thumbnail,setThumbnail] = useState(cover)

   const [toPlay,setToPlay] = useState(nextUpVideo)

  const [fullScreen, setFullScreen] = useState(false);
  
   
  
  console.log("first item of data is:",data[0])

  useEffect(()=>{
 
    setScreenTest(!screenTest)
  
  if(fullScreen === screenTest){
    
    if(fullScreen){
      setVideoTime(true)
    }else if (!fullScreen){
      setVideoTime(false)
      setThumbnail(cover)
    }
  }
  
  },[fullScreen])


  useEffect(()=>{
    
    //dispatch(fetchVideoSubsection(location.state.title))
     dispatch(fetchUserData(user.uid,"refresh"))
    setData(allSectionVideos)
     console.log("WHAT IS IN THE USER'S WATCHED ARRAY ?",user.watched)
     console.log("WHAT IS NEXT UP ?",nextUpVideo)
     
  },[requestedSection,nextUpVideo])
  

  useEffect(()=>{

  setTimeout(()=>{setToPlay(nextUpVideo)},500)
 

  },[nextUpVideo])

  return (
    <>
      <Helmet>
        <title> View | Incubator </title>
      </Helmet>

      <Container maxWidth="xl">
      <h1 style={{position:"relative",left:"90px",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>{data.length? (`${data[0].section.toUpperCase()} - ${data[0].subSection}`):''}</h1>
      <CssBaseline/> 
       <>
        <Grid container spacing={2} justify="center" style={{marginTop:"2rem", marginBottom:"2rem"}}>
       
        <Grid item xs={6}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width: '540px',borderRadius:"10%" }}  >
       {/* <CardMedia
            style={{ border: '0.2px solid black', backgroundColor: '#fff', width: '540px' }}
            component="img"
            image={DEFAULTIMG}
            alt="IMG"
     />*/}

            <ReactPlayer   
                width="100%"
               
                 id="full-screenVideo"                                           
                className="videoFrame"
                url={data.length &&/*? data[0].videoUrl:*/"https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Shadow.mp4" }
                light={thumbnail}
                playing={videoTime}
                playIcon={' '}
                controls
                ref={videoRef}
                   
              />


         
        </div>  
        <Grid container spacing={6}  style={{marginTop:"2rem", marginBottom:"2rem",marginLeft:"-0.5rem",display:"flex",justifyContent:"space-around",width:"550px",borderRadius:"2rem",boxShadow: "10px 4px 18px 7px rgba(0,0,0,0.13)"}}>
              <div onClick={()=>{playVideo()}} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                { 
                <PlayArrowIcon style={{ fontSize: '24px', color: '#000000' }} />
                 }
                <p style={{ fontSize: '20px', color: '#000000', marginLeft: '10px',pointer:"cursor"  }}>{"PLAY"}</p>
               </div>

               <div onClick={()=>{pauseVideo()}} style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                { 
                <StopIcon style={{ fontSize: '24px', color: '#000000' }} />
                 }
                <p style={{ fontSize: '20px', color: '#000000', marginLeft: '10px',pointer:"cursor"  }}>{"STOP"}</p>
               </div>
        </Grid>
    </Grid>
       

      </Grid>

      <Grid item xs container direction="column" spacing={6} style={{paddingLeft: '100px', paddingRight: '100px'}}>
         <h2><b>{data.length? data[0].subSection.toUpperCase():''}</b></h2>
          <p style={{color: 'grey'}}>Lorem ipsum dolor sit amet consectetur. Eget ac risus ipsum maecenas cursus adipiscing eros. Mi viverra semper gravida pretium elementum. Pellentesque lacus ultrices luctus sit semper. Elementum tortor donec adipiscing tortor ut mollis quis. Molestie ipsum libero euismod ut eu quis.</p>
                <br/><br/>
               {
               
               data.length?
               data.map(((dt,i) => {
                  console.log("DT UID IS INCLUDED?:",user.watched.includes(dt.uid))
                return (

                    <ListRowCard data={dt} index={i} user={user.uid} watched={user.watched.includes(dt.uid)?true:false} playable={dt.uid === toPlay?true:false} />
                )
               })):
                  
                 <center>
                  <br/> <br/>
                  No videos available for this sub section.
                  </center>
                
                  }
              </Grid>
    </>
      </Container>
    </>
  );
}
