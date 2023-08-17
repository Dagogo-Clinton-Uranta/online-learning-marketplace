import React,{useState,useEffect,useRef,useMemo} from 'react'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import ReactAudioPlayer from 'react-audio-player';
import soundBytes from 'src/assets/images/soundBytes.mp3'
import soundBytes2 from 'src/assets/images/soundBytes2.mp3'


import { blobToDataURL } from 'blob-util'

const LogoSwitch = ({audioFile}) => {


    /*AUDIO MANIPULATION LOGIC */
  const audioRef = useRef(true)
  const [play,setPlay] = useState(false)
  const [urlLink,setUrlLink] = useState(audioFile?audioFile:" ")
  const [urlSample,setUrlSample] = useState("https://streaming.bonecole.com/courses_new/ecm_6e/original/1.+Le+mariage.mp3")
  /*const URLSound = window.URL || window.webkitURL;*/

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
    linkMaker(audioFile)
   },[])


   

  const playAudio = audio => {
   
    setPlay(!play)

    if (play){
    audioRef.current.pause()
    }else if(!play){
      console.log("current.play looks like!:",audioRef.current)
      audioRef.current.play(audio)
    }

    
    /*const audioToPlay = new Audio(audio);
    audioToPlay.play();*/
};


  return (
    <div style={{display:"inline"}}>

 {/*AUDIO PLAYER */}
   
<audio  ref ={audioRef} src={urlLink} type="audio/mp3"/>


<span onClick={()=>{playAudio(urlLink)}} style={{color:"red",fontSize:"2.2rem",height:"6rem"}}>{play?<PauseCircleFilledIcon/>:<PlayCircleFilledWhiteIcon/>}</span>

    </div>
  )
}
 

export default LogoSwitch