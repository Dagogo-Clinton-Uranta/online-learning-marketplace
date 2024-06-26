import React,{useState,useEffect,useRef,useMemo} from 'react'
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { styled } from '@mui/system';
import { findDOMNode } from 'react-dom'
import { useNavigate } from 'react-router-dom';
import { blobToDataURL } from 'blob-util'



import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Avatar from '@mui/material/Avatar';

import samplePdf from 'src/assets/images/sample.pdf'
import profile from 'src/assets/images/profile.jpeg'
import math from 'src/assets/images/math.jpeg'
import chem from 'src/assets/images/chembeak.jpeg'
import chem2 from 'src/assets/images/chem2.jpeg'
import biology from 'src/assets/images/biology.jpeg'
import english from 'src/assets/images/english.jpeg'
import philosophy from 'src/assets/images/philoslib.jpeg'
import ReactPlayer from 'react-player'
import { Document, Page ,pdfjs} from 'react-pdf';
//import { MobilePDFReader,PDFReader } from 'react-read-pdf';

import AudioSwitch from '../components/players/AudioSwitch';
import VideoSwitch from '../components/players/VideoSwitch';
import NotPlayableSwitch from '../components/players/NotPlayableSwitch';

import {AiOutlineDownload} from "react-icons/ai";

import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/main.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import Modal from '@mui/material/Modal';
import { fetchVideosOneChapter,fetchChosenQuiz, setSelectedAudioState, setSelectedAudio, setSelectedAudioId,setDownloadReload} from 'src/redux/actions/main.action';

import { useLiveQuery } from 'dexie-react-hooks';
import db from '../browserDb/db'

import soundBytes from 'src/assets/images/soundBytes.mp3'
import soundBytes2 from 'src/assets/images/soundBytes2.mp3'








function SavedCoursesPage() {
  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    height:"90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const navigate = useNavigate()

const dispatch  = useDispatch()

const { user } = useSelector((state) => state.auth);




useEffect(()=>{
   if(!user ){
     navigate('/external-login')
    }

 },[])


  const topics = [
    {title:"Chemie ",author:"Sidiki...",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem2},
    {title:"Anglais ",author:"Kabinet...",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie ",author:"Elhadj... ",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie",author:"Sidiki...",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques",author:"Fode...",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie",author:"Sidiki...",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
  ]

/*DEXIE MANIPULATION LOGIC (FOR OFFLINE DOWNLOADS) */
const URLSound = window.URL || window.webkitURL;



let Files = useLiveQuery(() => db.savedCourses.where("courseName").notEqual("Sample name").toArray(),[]);






const [savedMedia,setSavedMedia] = useState([])

const [downloadCategories,setDownloadCategories] = useState([])
const {downloadReload } = useSelector((state) => state.main);



useEffect(()=>{


setSavedMedia(Files)


},[Files])


useEffect(()=>{

 if(savedMedia && savedMedia.length >0 ){
  savedMedia.forEach((item)=>{
    if(downloadReload.indexOf(item.subjectTitle) === -1 ){
      
      dispatch(setDownloadReload([...downloadReload,item.subjectTitle]))

    }
  
  })
}

 
  },[savedMedia,downloadReload])





/*DEXIE MANIPULATION LOGIC END */



/*PDF MANIPULATION LOGIC*/
  const [numPages, setNumPages] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(/*{ numPages }*/) {
    setNumPages(numPages);
  }

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

/*PDF MANIPULATION LOGIC END */

/* AUDIO MANIPULATION LOGIC*/
const audioRef = useRef(null)
const [play,setPlay] = useState(false)
const { selectedAudioId,selectedAudio,selectedAudioState} = useSelector((state) => state.main);
const  [showPlayer,setShowPlayer] = useState(true)


useEffect(()=>{



if(selectedAudioState === false)  {
  pauseAudio()
  }else if(selectedAudioState === true){
    setShowPlayer(true)
    playAudio(selectedAudio)
  }

 

},[selectedAudio,selectedAudioId,selectedAudioState])

useEffect(()=>{

return () => {
  dispatch(setSelectedAudioId(null))
  dispatch(setSelectedAudio(null))
  dispatch(setSelectedAudioState(false))

  };

},[])


  const playAudio = (audio) => {
   
    audioRef.current.play(audio)
 
};


const pauseAudio = audio => {
   
   audioRef.current.pause()

};

/* AUDIO MANIPULATION LOGIC END*/


/*MODAL MANIPULATION LOGIC */

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {doVideoActions()}
  const handleClose = () => {setOpen(false);setVideoTime(false)};


  const [openPdf, setOpenPdf] = React.useState(false);
  const handleOpenPdf = () => {setOpenPdf(true)}
  const handleClosePdf = () => {setOpenPdf(false)};

/*MODAL MANIPULATION LOGIC */


 /*video manipulation logic */
 
  const [videoTime,setVideoTime] = useState(false)
  const [fullScreen, setFullScreen] = useState(false);


  
  const videoRef = useRef(true)
 

  const handleEsc = (event) => {
   
    window.removeEventListener('fullscreenchange', handleEsc)
    setTimeout(()=>{setOpen(false); setFullScreen(!fullScreen); setVideoTime(false)},10)
    
  };


  const doVideoActions = () => {
    setOpen(true)
    
    setTimeout(
     ()=> {
    
    setVideoTime(!videoTime)
    
     if(!videoTime){
      findDOMNode(videoRef.current).requestFullscreen()
      }
    },10) 

    setTimeout(()=>(window.addEventListener('fullscreenchange', handleEsc)),1000)
  }

  
  
  
  useEffect(()=>{
 
    if(open === false){
      setTimeout(()=>(window.removeEventListener('fullscreenchange', handleEsc)),10)
    }

  },[open])

  /*video manipulation logic end */

 






  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray",fontSize:"0.85rem"}}> 






     {/*PDF MODAL */}
    <Modal
        open={openPdf}
        onClose={handleClosePdf}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           
       {/*<MobilePDFReader isShowHeader={false} isShowFooter={false} url={samplePdf}/>}*/}
     
      
        </Box>
  </Modal>

    

   
   
   

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem"}}>
    <center>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",borderBottom:"3px solid red",width:"max-content"}}>Cours Enregistrés</p>
    </center>
    </Grid>

  <Grid container xs={12} style={{paddingTop:"1.5rem"}}>
   
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
      Downloads
    
     </p>
    
    </Grid>
    

 {/*savedMedia && savedMedia.filter((item)=>(item.fileObject.size > 0)).map((item,index)=>{ 
   return (
    <div key={index}>
    <Grid item xs={12}   style={{position:"relative",display: 'flex',width:"23rem" ,justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.8rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}> {item.fileObject && item.fileObject.type !==null && item.fileObject.type === 'video/mp4'  ?<VideoSwitch audioFile={URL.createObjectURL(item.fileObject)} />:<AudioSwitch uid={item.lessonId} audioFile={URL.createObjectURL(item.fileObject)}/> }&nbsp; {index+1})</p>
     <p style={{display:"inline"}}>  {item.courseName.substring(0,25) +  `${item.courseName.length > 25 ?"...":''}`}</p>
     <p style={{position:"absolute",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>{item.duration}</p>
    </Grid>
    </div>
   )


 }
)*/}


{ savedMedia && savedMedia.length === 0 &&
  <center style={{ display: 'flex',gap:"0.5rem",alignItems:"center",justifyContent:"center", padding:"1rem"}}>No downloads for now.</center>
}


{

downloadReload && downloadReload.length > 0 &&


downloadReload.map((category)=>(

  <>
  <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",width:"24rem",paddingTop:"3rem",paddingBottom:"1rem",borderBottom:"1px solid black"}}>
   {category}

 </p>

{savedMedia && savedMedia.length > 0 && savedMedia.filter((item)=>(item.subjectTitle === category)).map((wax,index)=>{ 
  return (
   <div key={index}>
   <Grid item xs={12}   style={{position:"relative",display: 'flex',width:"23rem" ,justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.8rem",borderBottom:"1px solid lightgrey"}}>
    <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}> {wax.fileObject && wax.fileObject.type !==null && wax.fileObject.type === 'video/mp4'  ?<VideoSwitch audioFile={URL.createObjectURL(wax.fileObject)} />:<AudioSwitch uid={wax.lessonId} audioFile={URL.createObjectURL(wax.fileObject)}/> }&nbsp; {index+1})</p>
    <p style={{display:"inline"}}>  {wax.courseName.substring(0,25) +  `${wax.courseName.length > 25 ?"...":''}`}</p>
    <p style={{position:"absolute",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>{wax.duration}</p>
   </Grid>
   </div>
  )


   }
 )
}
</>
))
}
  

   


 </Grid>


 

   <Container maxWidth="xs">

<Grid item xs={12}>
  <center style={{position:"relative"}}>


<div  style={{position:"fixed",bottom:"2%",marginLeft:"1rem"}}>

{savedMedia && savedMedia.length > 0 && showPlayer &&
  <div onClick={()=>{setShowPlayer(false)}} style={{position:"absolute",right:"0.5rem",bottom:"1rem", zIndex:"1",color:"red"}} >
  x
 </div> 
 }

<audio controls={showPlayer}  controlsList="nodownload" ref={audioRef} src={selectedAudio} type="audio/mp3"/>

</div>

  </center>
</Grid>

</Container>
       

</Container>
    </>
  );
}

export default SavedCoursesPage;