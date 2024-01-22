import React,{useState,useEffect,useRef,useMemo} from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import ReactAudioPlayer from 'react-audio-player';
import soundBytes from 'src/assets/images/soundBytes.mp3'
import soundBytes2 from 'src/assets/images/soundBytes2.mp3'
import ReactPlayer from 'react-player'

import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { styled } from '@mui/system';
import Modal from '@mui/material/Modal';

import { findDOMNode } from 'react-dom'

import { blobToDataURL } from 'blob-util'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedAudio, setSelectedAudioId, setSelectedAudioState } from 'src/redux/actions/group.action';
import { notifyInfoFxn } from 'src/utils/toast-fxn';

const VideoSwitch = ({audioFile}) => {
 const navigate = useNavigate()
 const dispatch = useDispatch()

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

    /*AUDIO MANIPULATION LOGIC */
  const audioRef = useRef(true)
  const [play,setPlay] = useState(false)
  const [urlLink,setUrlLink] = useState('')
  /*const URLSound = window.URL || window.webkitURL;*/
  const { user,error } = useSelector((state) => state.auth);
  const { subjectChapters,allChapterLessons,allQuizzesForSubject,presentSubject } = useSelector((state) => state.group);

  const linkMaker = (blob) => {
    let link;
   
     blobToDataURL(blob).then((url)=>{
      link =url
      console.log("final url is",url)
      setUrlLink(url)
       return url
     })
   
    
   
   }



  function blobToUrl (blob) {
    const urlSound = URL.createObjectURL(blob)
   //const urlSound=  new File([blob], "incomingaudioclip.wav");
    
    console.log("url OF BLOB",urlSound )
   setUrlLink(urlSound)
  
     //return urlSound;
   }
   useEffect(()=>{
    setUrlLink(audioFile)
   },[])


   

  const playAudio = audio => {
   
    setPlay(!play)

    if (play){
    audioRef.current.pause()
    }else if(!play){
      console.log("current.play looks like!:",audioRef.current)
      audioRef.current.play(urlLink)
    }

  
};

/*MODAL MANIPULATION LOGIC */

const [open, setOpen] = React.useState(false);
const [doubleClose, setDoubleClose] = React.useState(false);

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
const modalRef = useRef(true)
console.log('THIS IS DOCUMENT FULL SCREEN ELEMENT-->',document.fullscreenElement)


const handleEsc = (event) => {
  
  console.log('THIS IS DOCUMENT FULL SCREEN ELEMENT-->',document.fullscreenElement)


  setOpen(false) 
  
  findDOMNode(videoRef.current).pause()
  
  //findDOMNode(videoRef.current).remove() i am pausing on removing the video for now
  findDOMNode(modalRef.current).remove()

  setTimeout(()=>{findDOMNode(modalRef.current).remove()},50) 


  if(!document.fullscreenElement ||!document.webkitfullscreenElement||!document.webkitIsFullScreen ||!document.mozfullscreenElement ) {  //<-- if the browser is NOT fullscreen,ClOSE THE MODAL
     
    setOpen(false)
    setTimeout(()=>{setOpen(false)},300)
    }

   window.removeEventListener('fullscreenchange', handleEsc) 
   window.removeEventListener('webkitfullscreenchange', handleEsc)

   window.removeEventListener(' webkitendfullscreen', handleEsc)
  
   window.removeEventListener('mozfullscreenchange', handleEsc)
  
   console.log("MODAL CURRENT DETAILS ARE----->", findDOMNode(modalRef.current))

  setTimeout(()=>{setOpen(false); setFullScreen(!fullScreen); setVideoTime(false)},10)
  setTimeout(()=>{setOpen(false)},300)
  

};


const doVideoActions = () => {

  dispatch(setSelectedAudioId('no'))
  dispatch(setSelectedAudio('no'))
  dispatch(setSelectedAudioState(false))

  if(!user){
  navigate('/external-login')
  return
 }


 if(presentSubject && user &&  !(user.purchasedCourses.includes(presentSubject.uid))){
  notifyInfoFxn('Please purchase course to view media.')
  return
}
 

 
 setOpen(true)



  setTimeout(
   ()=> {
  
  setVideoTime(!videoTime)
  
   if(!videoTime){


    if (findDOMNode(videoRef.current).requestFullscreen) {
      findDOMNode(videoRef.current).requestFullscreen();
  } else if (findDOMNode(videoRef.current).webkitRequestFullscreen) {
    findDOMNode(videoRef.current).webkitRequestFullscreen();
  } else if (findDOMNode(videoRef.current).mozRequestFullScreen) {
    findDOMNode(videoRef.current).mozRequestFullScreen();
  }



   // findDOMNode(videoRef.current).requestFullscreen()
    }
  },10) 

  setTimeout(()=>(window.addEventListener('fullscreenchange', handleEsc)),1000)
  setTimeout(()=>(window.addEventListener('webkitfullscreenchange', handleEsc)),1000)
  
  setTimeout(()=>(window.addEventListener('webkitfullscreenchange', function() {
    if (document.webkitIsFullScreen) {
      setFullScreen(true)
   
    }
   }
    )),1000)
  setTimeout(()=>(window.addEventListener('webkitendfullscreen', handleEsc)),1000)
  setTimeout(()=>(window.addEventListener('mozfullscreenchange', handleEsc)),1000)
}




useEffect(()=>{

 


    setTimeout(()=>{

      if(open ===false){
      window.removeEventListener('fullscreenchange', handleEsc)
      window.removeEventListener('webkitfullscreenchange', handleEsc)
      window.removeEventListener('mozfullscreenchange', handleEsc)
      } 
      
    },100)
 

},[open])


/*useEffect(()=>{

  if(doubleClose){
  setOpen(false)
 
 }

},[doubleClose])*/

/*video manipulation logic end */





  return (
    <div style={{display:"inline"}}>



<Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
ref={modalRef}
>




<Box sx={style}>
 <ReactPlayer   
      config={{ file: { attributes: { controlsList: 'nodownload',disablepictureinpicture: 'true' } } }}
        width="100%"
        height="100%"
        id="full-screenVideo"                                              
        className="videoFrame"
        url={audioFile}
        //light={thumbnail}
        playing={true}
        playIcon={' '}
        controls
        
        ref={videoRef}
      //onClickPreview = {()=>{setTouch(false);}}
       
     />
</Box>
  


</Modal>




 {/*AUDIO PLAYER */}
   
{/*<audio  ref ={audioRef} src={urlLink} type="audio/mp3"/>*/}


<span onClick={()=>{handleOpen()}} style={{color:"red",fontSize:"2.2rem",height:"6rem"}}>{play?<PauseCircleFilledIcon/>:<PlayCircleFilledWhiteIcon/>}</span>

    </div>
  )
}
 

export default VideoSwitch