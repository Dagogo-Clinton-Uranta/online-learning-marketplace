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
import { MobilePDFReader,PDFReader } from 'react-read-pdf';

import AudioSwitch from './AudioSwitch';
import VideoSwitch from './VideoSwitch';
import NotPlayableSwitch from './NotPlayableSwitch';

import {AiOutlineDownload} from "react-icons/ai";

import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import Modal from '@mui/material/Modal';


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
 




  const topics = [
    {title:"Chemie ",author:"Sidiki...",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem2},
    {title:"Anglais ",author:"Kabinet...",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie ",author:"Elhadj... ",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie",author:"Sidiki...",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques",author:"Fode...",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie",author:"Sidiki...",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    
  ]

/*DEXIE MANIPULATION LOGIC */
const URLSound = window.URL || window.webkitURL;
const [savedMedia,setSavedMedia] = useState([])
const [videoLink,setVideoLink] = useState(null)
let Files = useLiveQuery(() => db.savedCourses.where("courseName").notEqual("Sample name").toArray(),[]);
const linkMaker = (blob) => {
 let link;

  blobToDataURL(blob).then((url)=>{
   link =url
   console.log("final url is",url)
    
    setVideoLink(url)
    
  })

  

}

useEffect(()=>{


setSavedMedia(Files)

//linkMaker(savedMedia[0].fileObject)
},[Files])








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
           
       <MobilePDFReader isShowHeader={false} isShowFooter={false} url={samplePdf}/>
     
      
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
    

 { savedMedia && savedMedia.filter((item)=>(item.fileObject.size > 0)).map((item,index)=>{ console.log("the created courses URL",item.fileObject)
   return (
    <div key={index}>
    <Grid item xs={12}   style={{position:"relative",display: 'flex',width:"23rem" ,justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.8rem",borderBottom:"1px solid lightgrey"}}>
     <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}}> {item.fileObject && item.fileObject.type !==null && item.fileObject.type === 'video/mp4'  ?<VideoSwitch audioFile={URL.createObjectURL(item.fileObject)} />:<AudioSwitch audioFile={URL.createObjectURL(item.fileObject)}/> }&nbsp; {index+1})</p>
     <p style={{display:"inline"}}>  {item.courseName.substring(0,25) +  `${item.courseName.length > 25 ?"...":''}`}</p>
     <p style={{position:"absolute",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>{item.duration}</p>
    </Grid>
    </div>
   )


 }
)}
{ savedMedia && savedMedia.length === 0 &&
  <center style={{ display: 'flex',gap:"0.5rem",alignItems:"center",justifyContent:"center", padding:"1rem"}}>No downloads for now.</center>
}

  

   


   </Grid>


   <p style={{paddingTop:"1.5rem",paddingBottom:"1.5rem"}}>
   
    {/*  <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
  <p style={{position:"relative",display: 'flex',marginLeft:"0.4rem", justifyContent: 'space-between',fontWeight:"bold",fontSize:"1rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
      Histoire Terminaless
    
     </p>
    
    </Grid>
    

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p ><PlayCircleFilledWhiteIcon  onClick={handleOpen} style={{color:"red",fontSize:"1.6rem"}}/> &nbsp; 1.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>

   
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"1rem",paddingBottom:"1rem",borderBottom:"1px solid lightgrey"}}>
     <p ><PlayCircleFilledWhiteIcon  onClick={handleOpen} style={{color:"red",fontSize:"1.6rem"}}/> &nbsp; 2.)</p>
     <p style={{display:"inline"}}>  Dissociation et produit ionique</p>
     <p style={{position:"relative",left:"1%",display:"flex",gap:"15px",alignItems:"center"}}>8:00</p>
    </Grid>

  */}


   
   </p>
       

</Container>
    </>
  );
}

export default SavedCoursesPage;