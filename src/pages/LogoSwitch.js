import React,{useState,useEffect,useRef,useMemo} from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import ReactAudioPlayer from 'react-audio-player';
import soundBytes from 'src/assets/images/soundBytes.mp3'
import soundBytes2 from 'src/assets/images/soundBytes2.mp3'
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedAudio,setSelectedAudioId,setSelectedAudioState} from 'src/redux/actions/group.action';
import { addToLessonsWatched } from 'src/redux/actions/auth.action';
import { blobToDataURL } from 'blob-util'
import { useNavigate } from 'react-router-dom';

const LogoSwitch = ({uid,audioFile}) => {


    /*AUDIO MANIPULATION LOGIC */
  //const audioRef = useRef(true)
  const [play,setPlay] = useState(false)
  const [urlLink,setUrlLink] = useState(audioFile?audioFile:" ")
  const [urlSample,setUrlSample] = useState("https://streaming.bonecole.com/courses_new/ecm_6e/original/1.+Le+mariage.mp3")
  /*const URLSound = window.URL || window.webkitURL;*/
  const { user,error } = useSelector((state) => state.auth);

 const dispatch = useDispatch()
 const navigate = useNavigate()

 const { selectedAudioId,selectedAudio,selectedAudioState } = useSelector((state) => state.group);

 const [trackUser,setTrackUser] = useState(user && user.lessonsWatched ? user.lessonsWatched.map((item)=>(item.lessonId)):[])

 useEffect(()=>{

  setTrackUser(user && user.lessonsWatched ? user.lessonsWatched.map((item)=>(item.lessonId)):[])

 },[user.lessonsWatched])

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

    if(!trackUser.includes(uid)){
      dispatch(addToLessonsWatched(user.uid,uid))
      console.log("I HAVE ADDED A NEW WATCHED VIDEO")
    }


    if(uid === selectedAudioId ){dispatch(setSelectedAudioState(!selectedAudioState))}
  
    if(uid !== selectedAudioId ){  
    dispatch(setSelectedAudioId(uid))
   dispatch(setSelectedAudio(audioFile))
   dispatch(setSelectedAudioState(true))
    }

    
 
};


  return (
    <div style={{display:"inline"}}>

 {/*AUDIO PLAYER*/}
   
<audio   src={urlLink} type="audio/mp3"/>
 

<span onClick={()=>{playAudio(urlLink)}} style={{color:"red",fontSize:"2.2rem",height:"6rem"}}>{play?<PauseCircleFilledIcon/>:<PlayCircleFilledWhiteIcon/>}</span>

    </div>
  )
}
 

export default LogoSwitch