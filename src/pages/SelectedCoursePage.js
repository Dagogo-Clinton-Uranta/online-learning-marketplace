import React,{useState,useEffect,useRef} from 'react'
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import { findDOMNode } from 'react-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

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
import PDFViewer from 'pdf-viewer-reactjs'
import MyPDFViewer from './myPdfViewer'


import { MobilePDFReader,PDFReader } from 'react-read-pdf';

import LogoSwitch from './LogoSwitch';
import VideoSwitch from './VideoSwitch';

import {AiOutlineDownload} from "react-icons/ai";



import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn, notifyInfoFxn,notifySuccessFxn } from 'src/utils/toast-fxn';
import Modal from '@mui/material/Modal';

import soundBytes from 'src/assets/images/soundBytes.mp3'
import soundBytes2 from 'src/assets/images/soundBytes2.mp3'

import { fetchVideosOneChapter,fetchChosenQuiz, setSelectedAudioState, setSelectedAudio, setSelectedAudioId} from 'src/redux/actions/group.action';

import db from '../browserDb/db'

import { blobToDataURL,dataURLToBlob,imgSrcToBlob,arrayBufferToBlob } from 'blob-util'


function SelectedCoursePage() {
  const navigate = useNavigate();
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
 


  const [fetching, setFetching] = React.useState(false);
  const [allVids,setAllVids] =  React.useState([]);
  const [renderNavButtons, setRenderNavButtons] = useState(true)
  

  const { subjectChapters,allChapterLessons,allQuizzesForSubject,presentSubject } = useSelector((state) => state.group);
  console.log("the present SAVED  subject is:",presentSubject)
  console.log("the chapters for this subject are:",subjectChapters.filter((item)=>(item)).sort((a,b)=>((a.chapterNumber && b.chapterNumber)?(a.chapterNumber- b.chapterNumber):1)))
  console.log("the lessons are for all the chapters are therefore:",allChapterLessons)
  



/*login check */
  const { user,error } = useSelector((state) => state.auth);
  console.log("error is",error)
  
  useEffect(()=>{
     if(!user){
      navigate('/login')
     }

     return () => {
      dispatch(setSelectedAudioId(null))
      dispatch(setSelectedAudio(null))
      dispatch(setSelectedAudioState(false))
  
      };
  
   
  },[])
/*login check end */


/*AUDIO MANIPULATION LOGIC */
const audioRef = useRef(null)
const [play,setPlay] = useState(false)
const { selectedAudioId,selectedAudio,selectedAudioState } = useSelector((state) => state.group);
const  [showPlayer,setShowPlayer] = useState(true)


useEffect(()=>{



if(selectedAudioState === false)  {
  pauseAudio()
  }else if(selectedAudioState === true){
    setShowPlayer(true)
    playAudio(selectedAudio)
  }

 

},[selectedAudio,selectedAudioId,selectedAudioState])

  const playAudio = (audio) => {
   
    audioRef.current.play(audio)
 
};


const pauseAudio = audio => {
   
   audioRef.current.pause()

};


/*AUDIO MANIPULATION LOGIC END */

/*PDF MANIPULATION LOGIC*/
  const [numPages, setNumPages] = useState(10);
  const [pageNumber, setPageNumber] = useState(2);
  const [numberPages,setNumberPages] = useState(6)
  const [pdfUrl,setPdfUrl] = useState('')
  const [frame1,setFrame1]=  useState(true)
  const [frame2,setFrame2]=  useState(true)
  const [showErrorPdf,setShowErrorPdf] = useState(false)
  const [loader,setLoader] = useState(true)
 
  const iFrameRef = useRef(null);
  const iFrameRef2 = useRef(null);
  const [isIFrameLoaded, setIsIFrameLoaded] = useState(false);
  let iframeCurrent = iFrameRef.current;
  let iframeCurrent2 = iFrameRef2.current;

 // pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
 pdfjs.GlobalWorkerOptions.workerSrc =  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

 const  loadPdfUrl = async()=> {

  try {
    console.log("our pdf url is",pdfUrl)
  
   const res = await fetch("https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf")

  let returnImage= res.blob()
 
  returnImage.then((item)=>{ 
    blobToDataURL(item).then((url)=>{
     
      console.log("final url is",url)
      setPdfUrl(url)
      
     })

  const newUrl = URL.createObjectURL(item)
  console.log("our pdf url is NEW RUL",newUrl)
  setPdfUrl(`${newUrl}`)
 

    }).then(()=>{
      setTimeout(()=>{setOpenPdf(true)},1000)
     
    }).catch((error)=>{
      notifyErrorFxn(error)
      console.log("EERAWR",error)
    })

  }catch(error){
  console.log("error in creating URL",error)
  }

 }



 useEffect(() => {
   iframeCurrent?.addEventListener('load', () => setIsIFrameLoaded(true));
   return () => {
     iframeCurrent?.removeEventListener('load', () => setIsIFrameLoaded(true));
   };
 }, [iframeCurrent]);



 const handleViewPdf = (pdfUrl) => {
  window.open(
    //`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`,
    `${pdfUrl}`,
    'PDF Viewer',
    'width=800,height=600'
  );
};


/*PDF MANIPULATION LOGIC END */

/*MODAL MANIPULATION LOGIC */

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {doVideoActions()}
  const handleClose = () => {setOpen(false);setVideoTime(false)};


  const [openPdf, setOpenPdf] = React.useState(false);
  const handleOpenPdf = () => {setOpenPdf(true);setTimeout(()=>{setFrame2(true);setIsIFrameLoaded(true)},1000);setTimeout(()=>{setShowErrorPdf(true);setLoader(false)},6000)}
  const handleClosePdf = () => {setOpenPdf(false);setFrame1(true);setFrame2(true);setShowErrorPdf(false);setLoader(true);iframeCurrent=null;iframeCurrent2=null};

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

 

/*SAVING TO BROWSER DATABASE */

const [name,setName] = useState("Sample name")

//const [fileObject,setFileObj] = useState("ababa namna")
const [status,setStatus] = useState(false)
const [view,setView] = useState(new Blob())
const [loading,setLoading] = useState("Not loafing")
const URLSound = window.URL || window.webkitURL



async function saveCourse(subjectTitle,url,courseName,uid,duration) {
  try {
    
    notifyInfoFxn("Your download has begun, you will be alerted once it is completed...")

   //const res = await fetch(`https://thingproxy.freeboard.io/fetch/${url}`) UNCOMMENT THIS LATER, AND COMMENT OUT TH ONE BELOW
   const res = await fetch(`https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Shadow.mp4`)
   //const res = await fetch(url)


  let returnImage= res.blob()

  //console.log("RETURN IMAGE FUNCTIONALITY",returnImage)

  /*if(returnImage.type === "audio/mp3"){
    
    const id =db.savedCourses.add({
    courseName:"Audio 1",
    fileObject:returnImage
 
  });
}*/
  
  returnImage.then((item)=>{ setView(item);setLoading(true);
    let second = item
    
 
    console.log("RETURN IMAGE FUNCTIONALITY",item)
      const id =db.savedCourses.add({
        courseName:courseName,
        subjectTitle:subjectTitle,
        lessonId:uid,
        duration:duration,
        fileObject:item
     
      });
  
      setStatus(`Media file ${name} successfully added. Got id ${id}`);
      setLoading(false)
      notifySuccessFxn("Successfully Downloaded !")
      console.log("status is now:",status)
      console.log("loading is now:",loading)


    return second
    }).catch((error)=>{
      notifyErrorFxn("error with downloading audio")
      console.log("error with downloading audio",error)
    })
  
    
    
    /*.then((third)=>{
      setView(third)
}
  ).then(()=>{
  setTimeout(()=>
  
  {if(view.size > 0 ){
    const id =db.savedCourses.add({
      courseName:"Video 1",
      fileObject:view
   
    });

    setStatus(`Media file ${name} successfully added. Got id ${id}`);
    setLoading(false)
    notifySuccessFxn("Successfully Downloaded !")
    console.log("status is now:",status)
    console.log("loading is now:",loading)
  }
  else{
    notifyErrorFxn("Something went wrong, please try again.")
  }
 } , 4000)




})*/
  

  } catch (error) {
    setStatus(`Failed to add ${name}: ${error}`);
    notifyErrorFxn(`Failed to add media: please check your connection and try again.`)
    console.log("status is now:",status)
    console.log("error for downloading bonecole is:",error)

  }
}

/*SAVING TO BROWSER DATABASE END */

/*SUBJECT INFO SAVING */
const firstSplit =presentSubject.body.split('.')[1]
const secondSplit = firstSplit? firstSplit.split(':')[1]:""
const thirdSplit =  secondSplit? secondSplit.split(/[0-9]/):""

const [subjectList,setSubjectList] = useState(presentSubject && presentSubject.body && firstSplit && secondSplit && thirdSplit ?thirdSplit:[])
console.log("subjectList is:",subjectList)

const [loadingQuiz,setLoadingQuiz] = useState(false)

/*SUBJECT INFO LOADING */
const fetchQuizAndNavigate =(uid)=>{

  setLoadingQuiz(true)
  dispatch(fetchChosenQuiz(uid))

 setTimeout(()=>{ navigate('/dashboard/selected-quiz')},2500)
}



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
        <Box sx={style} style={{position:"relative"}}> 
     
      
       
        {/*loader && <center style={{position:"absolute",top:"50%",left:"50%"}}> <CircularProgress/> </center>*/}
      
        {/* ((iframeCurrent ===null || iframeCurrent2===null) && showErrorPdf) && <center style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10%"}}><p>SOMETHING WENT WRONG,PLEASE CHECK YOUR CONNECTION AND TRY AGAIN.</p></center>*/}


       {/* <iframe style={{width:"100%",height:"100%" ,display:!frame1?"none":"block"}} ref={iFrameRef} sandbox='allow-same-origin allow-scripts allow-popups' onLoad={()=>{setFrame2(false);setLoader(false);setShowErrorPdf(false)}} src={ `https://docs.google.com/viewer?url=${encodeURIComponent("https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf")}&embedded=true`} ></iframe>*/}

      {/*frame2||isIFrameLoaded && <iframe style={{width:"100%",height:"100%"}}  ref={iFrameRef2} sandbox="allow-same-origin allow-scripts allow-popups" onLoad={()=>{setFrame1(false);setLoader(false);setShowErrorPdf(false)}} src={ `https://docs.google.com/viewer?url=${encodeURIComponent("https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf")}&embedded=true`} ></iframe>*/}

     
      {/* <iframe style={{width:"100%",height:"100%" ,display:!frame1?"none":"block"}} ref={iFrameRef} sandbox='allow-same-origin allow-scripts allow-popups' onLoad={()=>{setFrame2(false);setLoader(false);setShowErrorPdf(false)}} src={ "https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf"} ></iframe>*/}

{/*frame2||isIFrameLoaded && <iframe style={{width:"100%",height:"100%"}}  ref={iFrameRef2} sandbox="allow-same-origin allow-scripts allow-popups" onLoad={()=>{setFrame1(false);setLoader(false);setShowErrorPdf(false)}} src={ "https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf"} ></iframe>*/}    

   {<center><MyPDFViewer pdfUrl ={"https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf"} /></center>}
    
      
        </Box>
    </Modal>

     {/*VIDEO MODAL */}
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
                url={"https://neallusmawubucket001.s3.us-east-2.amazonaws.com/Mawu+Files/Videos/Shadow.mp4"}
                //light={thumbnail}
                playing={true}
                playIcon={' '}
                controls
                ref={videoRef}
              //onClickPreview = {()=>{setTouch(false);}}
               
             />
        </Box>
      </Modal>
    

    <Grid container xs={12} style={{marginTop:"2rem",padding:"1.5rem", background:`linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(${chem})`,borderRadius:"0.5rem",}}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem",color:"white"}}>
      
      <h3 style={{fontSize:"0.9rem"}}>{presentSubject.title}</h3>
      
       <p style={{marginTop:"0.5rem"}}>
       {presentSubject && presentSubject.body.split('.')[0]}
       </p>

       <p style={{marginTop:"2rem"}}>
         <p style={{marginBottom:"1rem"}}>{presentSubject && presentSubject.body.split('.')[1] && (presentSubject.body.split('.')[1]).split(':')[0]}</p>
        <ol>
      {subjectList.length > 1  &&  subjectList.slice(1,subjectList.length).map((item,index)=>(

          <li>{index+1}.{item}</li>

      ))

      }
        </ol>
       </p>

       <p style={{marginTop:"2rem",display:"flex",gap:"1rem",justifyContent:"flex-start"}}>
        <Avatar alt="placeholder avatar" sx={{ width: 48, height: 48 }} src={profile}/>
        
        <p>
        {presentSubject && presentSubject.instructor? presentSubject.instructor:" "}
          <br/>
          {presentSubject.subLevel}
        </p>
       </p>
    

      </Grid>
    </Grid>
   
    <center>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center',alignItems:"center",marginBottom:"2rem",marginTop:"2rem",flexDirection:"column",gap:"1rem",border:"1px solid lightgrey",width:"85%",padding:"1rem",borderRadius:"0.5rem"}}>
   
    <center >
    <b style={{fontSize:"1.2rem"}}> 30,000 GNF</b> <s>50,000 GNF</s>
    </center>
    
    <p >
    Achat unique, accès à toutes les leçons
    </p>

    <Button   variant="contained" 
            style={{ backgroundColor: "red",color:"#FFFFFF", fontSize:"0.9rem",width:"100%",
            padding: '8px'}}
            
            >
            Acheter maintenant
            </Button>
   
    </Grid>
    </center>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem"}}>
    <center>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",borderBottom:"3px solid red",width:"max-content"}}>Curriculum</p>
    </center>
    </Grid>

  <Grid container xs={12} style={{paddingTop:"1.5rem"}}>



 {subjectChapters && subjectChapters.length >0?
 subjectChapters.filter((item)=>(item)).sort((a,b)=>((a.chapterNumber && b.chapterNumber)?(a.chapterNumber- b.chapterNumber):1)).map((chapter,index)=>(
  <>
<Grid item xs={12} style={{paddingTop:index==0?"2rem":"4rem",paddingBottom:"1rem"}}>
    
<p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
  {chapter.title}
 <PictureAsPdfIcon onClick={()=>{handleViewPdf("https://streaming.bonecole.com/courses_new/ecm_6e/Pdf/ECM+6e.pdf")}}  style={{fontSize:"2.2rem"}} />
 </p>

</Grid>
 

{ allChapterLessons.filter((item)=>(item.chapterId === chapter.uid)).length?

allChapterLessons.filter((item)=>(item.chapterId === chapter.uid)).sort((a,b)=>((a.lessonNumber && b.lessonNumber)?(a.lessonNumber - b.lessonNumber):1)).map((lesson,index)=>(

 <>

{lesson.duration !== "quiz"?
 (
  <Grid item xs={12} style={{ position:"relative",display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.8rem",borderBottom:"1px solid lightgrey"}}>
  <p style={{ display: 'flex',gap:"0.5rem",alignItems:"center"}} >{index % 2 === 0?<VideoSwitch uid={lesson.uid} audioFile={"https://streaming.bonecole.com/courses_new/mathemaiques_10e/original/1.1+Propriete+de+Thales+dans+le+triangle.mp4"}/>:<LogoSwitch uid={lesson.uid} audioFile={lesson.lessonUrl}/> }     &nbsp; {index + 1}.</p>
  <p style={{display:"inline"}}>  {lesson.title && lesson.title.substring(0,25)+ `${lesson.title.length > 25 ?"...":''}`}</p>
  <p style={{position:"absolute",right:"1%",display:"flex",gap:"15px",alignItems:"center"}}>{lesson.duration}<AiOutlineDownload onClick={()=>{saveCourse(presentSubject.title,lesson.lessonUrl,lesson.title,lesson.uid,lesson.duration)}} style={{fontSize:"1.5rem"}}/></p>
 </Grid>
 )
:
(
<Grid item xs={12} style={{paddingTop:"1rem",paddingBottom:"1rem"}}>
   
<p style={{position:"relative",display: 'flex', justifyContent: 'flex-start',paddingBottom:"0.5rem",alignItems:"center",gap:"1rem"}}>
<span onClick={()=>{handleOpenPdf()}}  style={{display:"flex",justifyContent:"center",alignItems:"flex-end",fontFamily:"sans-serif",backgroundColor:"red",color:"white",fontSize:"1rem",width:"1.5rem",textAlign:"center",borderRadius:"50%"}}>Q</span>
  {lesson.title}
 </p>
 <Divider/>

</Grid>
)
}


</>

))
:

<Grid item xs={12} style={{ position:"relative",display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.8rem",borderBottom:"1px solid lightgrey"}}>

<p style={{display:"inline"}}> No lessons for this chapter</p>

</Grid>
}

{ allQuizzesForSubject.filter((item)=>(item.chapterId === chapter.uid)).length > 0 &&

 allQuizzesForSubject.filter((item)=>(item.chapterId === chapter.uid)).sort((a,b)=>((a.lessonNumber && b.lessonNumber)?(a.lessonNumber - b.lessonNumber):1)).map((quiz,index)=>(

 <>

{

<Grid item xs={12} style={{paddingTop:"1rem",paddingBottom:"1rem"}}>
   
<p style={{position:"relative",display: 'flex', justifyContent: 'flex-start',paddingBottom:"0.5rem",alignItems:"center",gap:"1rem"}}>
<span onClick={()=>{fetchQuizAndNavigate(quiz.uid)}}  style={{display:"flex",justifyContent:"center",alignItems:"flex-end",fontFamily:"sans-serif",backgroundColor:"red",color:"white",fontSize:"1rem",width:"1.5rem",textAlign:"center",borderRadius:"50%"}}>Q</span>
  {loadingQuiz?"LOADING QUIZ, PLEASE WAIT...":quiz.title}
 </p>
 <Divider/>

</Grid>

}


</>

))

}

</>


 )):
 
 
 <Grid item xs={12} style={{paddingTop:"4rem",paddingBottom:"1rem"}}>
    
<p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
  {"NO CHAPTERS AVAILABLE FOR THIS SUBJECT"}
 </p>

</Grid>
 
 
 } 
  </Grid>  
    
   <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",marginBottom:"20px",gap:"10px" }}>
  

  <Button   variant="contained" 
  style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
  padding: '8px'}}
  onClick={()=>{navigate('/dashboard/saved-courses')}}
  >
  View My Courses
  </Button>


</center>

<Container maxWidth="xs">

<Grid item xs={12}>
  <center style={{position:"relative"}}>


<div  style={{position:"fixed",bottom:"2%",marginLeft:"1rem"}}>

{ showPlayer &&
  <div onClick={()=>{setShowPlayer(false)}} style={{position:"absolute",right:"0.5rem",bottom:"1rem", zIndex:"1",color:"red"}} >
  x
 </div> 
 }

<audio controls={showPlayer}  ref={audioRef} src={selectedAudio} type="audio/mp3"/>

</div>

  </center>
</Grid>

</Container>

</Container>
    </>
  );
}

export default SelectedCoursePage;