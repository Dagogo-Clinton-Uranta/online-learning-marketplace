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
import { notifyErrorFxn, notifyInfoFxn } from 'src/utils/toast-fxn';

const NotPlayableSwitch = ({audioFile}) => {


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

  const linkMaker = (blob) => {
    let link;
   
     blobToDataURL(blob).then((url)=>{
      link =url
      //console.log("final url is",url)
      setUrlLink(url)
       return url
     })
   
    
   
   }



  function blobToUrl (blob) {
    const urlSound = URL.createObjectURL(blob)
   //const urlSound=  new File([blob], "incomingaudioclip.wav");
    
    //console.log("url OF BLOB",urlSound )
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
      //console.log("current.play looks like!:",audioRef.current)
      audioRef.current.play(urlLink)
    }

  
};

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
    <div style={{display:"inline"}}>

<Modal
open={open}
onClose={handleClose}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"

>
<Box sx={style}>
 <ReactPlayer   
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


<span onClick={()=>{notifyInfoFxn("Please purchase this course to play")}} style={{color:"red",fontSize:"2.2rem",height:"6rem"}}>{play?<PauseCircleFilledIcon/>:<PlayCircleFilledWhiteIcon/>}</span>

    </div>
  )
}
 

export default NotPlayableSwitch