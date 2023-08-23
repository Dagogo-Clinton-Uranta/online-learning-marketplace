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

const AudioSwitch = ({audioFile}) => {


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
  const [urlLink,setUrlLink] = useState(audioFile?audioFile:" ")
  /*const URLSound = window.URL || window.webkitURL;*/

 
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



const [openPdf, setOpenPdf] = React.useState(false);
const handleOpenPdf = () => {setOpenPdf(true)}
const handleClosePdf = () => {setOpenPdf(false)};

/*MODAL MANIPULATION LOGIC */






  return (
    <div style={{display:"inline"}}>







 {/*AUDIO PLAYER */}
   
{<audio  ref ={audioRef} src={urlLink} type="audio/mp3"/>}


<span onClick={()=>{playAudio(urlLink)}} style={{color:"red",fontSize:"2.2rem",height:"6rem"}}>{play?<PauseCircleFilledIcon/>:<PlayCircleFilledWhiteIcon/>}</span>

    </div>
  )
}
 

export default AudioSwitch