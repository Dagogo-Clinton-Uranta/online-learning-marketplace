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

import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAudio,setSelectedAudioId,setSelectedAudioState} from 'src/redux/actions/group.action';

import { findDOMNode } from 'react-dom'

import { blobToDataURL } from 'blob-util'
import { useNavigate } from 'react-router-dom';

const AudioSwitch = ({uid,audioFile}) => {

const dispatch =useDispatch()
const navigate =useNavigate()

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
  const { selectedAudioId,selectedAudio,selectedAudioState } = useSelector((state) => state.group);
  const { user,error } = useSelector((state) => state.auth);

  useEffect(()=>{
    
    if(uid !== selectedAudioId ){
      setPlay(false)
      //audioRef.current.pause()
    }

    if(uid === selectedAudioId ){
      dispatch(setSelectedAudio(audioFile))
      dispatch(setSelectedAudioState(true))
    }

   },[selectedAudioId])

   const playAudio = (audio) => {
   
    if(!user){
      navigate('/external-login')
    }



    setPlay(!play)
 //do lesson watched logic here !!

    

    if(uid === selectedAudioId ){dispatch(setSelectedAudioState(!selectedAudioState))}
  
    if(uid !== selectedAudioId ){  
    dispatch(setSelectedAudioId(uid))
   dispatch(setSelectedAudio(audioFile))
   dispatch(setSelectedAudioState(true))
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
   
{<audio  src={urlLink} type="audio/mp3"/>}


<span onClick={()=>{playAudio(urlLink)}} style={{color:"red",fontSize:"2.2rem",height:"6rem"}}>{play?<PauseCircleFilledIcon/>:<PlayCircleFilledWhiteIcon/>}</span>

    </div>
  )
}
 

export default AudioSwitch