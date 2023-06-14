import React,{useState,useEffect,useRef} from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import ReactAudioPlayer from 'react-audio-player';
import soundBytes from 'src/assets/images/soundBytes.mp3'

const LogoSwitch = () => {


    /*AUDIO MANIPULATION LOGIC */
  const audioRef = useRef(true)
  const [play,setPlay] = useState(false)

  useEffect(()=>{
    console.log("AUDIO REF PROPERTIES are:",audioRef.current)
  },[])

  const playAudio = audio => {
   
    setPlay(!play)

    if (play){
    audioRef.current.pause()
    }else if(!play){
      audioRef.current.play(soundBytes)
    }

    
    /*const audioToPlay = new Audio(audio);
    audioToPlay.play();*/
};


  return (
    <div style={{display:"inline"}}>

 {/*AUDIO PLAYER */}
   
<audio  ref ={audioRef} src={soundBytes}/>

<span onClick={()=>{playAudio()}} style={{color:"red",fontSize:"2.2rem",height:"6rem"}}>{play?<PauseCircleFilledIcon/>:<PlayCircleFilledWhiteIcon/>}</span>

    </div>
  )
}

export default LogoSwitch