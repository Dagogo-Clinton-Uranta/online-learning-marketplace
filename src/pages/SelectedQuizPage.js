import React,{useState,useEffect,useRef} from 'react'
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import { findDOMNode } from 'react-dom'
import { useNavigate } from 'react-router-dom';
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn, notifyInfoFxn,notifySuccessFxn } from 'src/utils/toast-fxn';


import { setCurrentQuizDetailsAndAnswers,
         updateStudentQuizzesTaken,
         setPresentQuizQuestion,
         setCurrentQuestionIndex} from 'src/redux/actions/group.action';

import db from '../browserDb/db'



import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function SelectedQuizPage() {
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
 



  const { presentSubject,chosenQuiz,
          currentQuizDetailsAndAnswers,submittingSingleAnswer,
          openQuestionIndex,currentQuestionIndex } = useSelector((state) => state.group);

 console.log("open question index is",openQuestionIndex)
 console.log("CURRENT question index ",currentQuestionIndex)

/*login check */
  const { user,error } = useSelector((state) => state.auth);
 
  
  useEffect(()=>{
     if(!user){
      navigate('/login')
     }


  },[])
/*login check end */

/* SET PRESENT QUIZ QUESTION */

const [dropDown, setDropDown] = useState(false);
const [chosenId,setChosenId] = useState(null);
const [loadingSubmit,setLoadingSubmit] = useState(false);
const [chosenOption,setChosenOption] = useState(null);

const [finalQuestion,setFinalQuestion] = useState(false); 
const sortedQuiz = chosenQuiz.questionsArray.filter((item)=>(item)).sort((a,b)=>((a.questionNumber && b.questionNumber)?(a.questionNumber - b.questionNumber):1))
useEffect(()=>{
 
  setChosenId(openQuestionIndex)
  setChosenOption('')

  console.log("our questions array is this long",chosenQuiz.questionsArray.length)

console.log("our QUIZ DETAILS AND ANSWER REDUX STATE IS:",currentQuizDetailsAndAnswers)

  if(openQuestionIndex === chosenQuiz.questionsArray.length-1 && currentQuestionIndex === chosenQuiz.questionsArray.length-1){
    setFinalQuestion(true)
  }


},[openQuestionIndex])
/* SET PRESENT QUIZ QUESTION END */




useEffect(()=>{

 /* if(openQuestionIndex === chosenQuiz.questionsArray.length-1 && currentQuestionIndex === chosenQuiz.questionsArray.length-1){
    setFinalQuestion(true)
  }*/



if(openQuestionIndex >= chosenQuiz.questionsArray.length && currentQuestionIndex >= chosenQuiz.questionsArray.length){
  
     submitQuizAnswers(user.uid,currentQuizDetailsAndAnswers,navigate)
 
 } 

},[openQuestionIndex])


let quizDetailsAndAnswersObject = {
  quizId:chosenQuiz && chosenQuiz.uid,
  chapterId:chosenQuiz && chosenQuiz.chapterId,
  studentAnswers:[
   
  ]
}


const [quizDetailsAndAnswers,setQuizDetailsAndAnswers] = useState(currentQuizDetailsAndAnswers===null?quizDetailsAndAnswersObject:currentQuizDetailsAndAnswers)

const dropDownChecker = (focusedId) => {
  console.log("THE focused Id is",focusedId)

if( focusedId <= openQuestionIndex){

  if(focusedId === chosenId){
   setChosenId(null)
   dispatch(setCurrentQuestionIndex(focusedId))
  }else{
    setChosenId(focusedId)
    dispatch(setCurrentQuestionIndex(focusedId))
  }
}else{
  notifyErrorFxn("Please answer the current question to proceed.")
}

 

 /*  if (uid === presentQuizQuestion){
    dispatch(setPresentQuizQuestion(null))
   }else{

    dispatch(setPresentQuizQuestion(uid))
   }*/
 

}

const submitQuizAnswers = (userId,quizAnswersObject,navigate) =>{
  setLoadingSubmit(true)
 
 dispatch(updateStudentQuizzesTaken(userId,quizAnswersObject,navigate))
  
 }

const addToStudentAnswers = (questionNumber,chosenAnswer,questionIndex) =>{
  console.log("QUESTION NUMBER INPUT IS:", questionNumber)

 if(!chosenAnswer){notifyErrorFxn("please pick an answer to continue!")}
 else{
  let newAnswer = {
    questionNumber:questionNumber,
    chosenAnswer:chosenAnswer,
  }

  let quizDetailsAndAnswersDecoy = {...quizDetailsAndAnswers}

 let indexOfAnswer = quizDetailsAndAnswersDecoy.studentAnswers.findIndex((item)=>(
    item.questionNumber === questionNumber
 ))




  if(indexOfAnswer === -1){
  quizDetailsAndAnswersDecoy ={ chapterId:quizDetailsAndAnswersDecoy.chapterId,
                                 quizId:quizDetailsAndAnswersDecoy.quizId,
                                 takenOn:new Date(),
                            studentAnswers: [...quizDetailsAndAnswersDecoy.studentAnswers,newAnswer]}
  }
  else{
 
     let decoyArray = [...quizDetailsAndAnswersDecoy.studentAnswers]

    decoyArray.splice(indexOfAnswer,1,newAnswer)
     
    quizDetailsAndAnswersDecoy ={ chapterId:quizDetailsAndAnswersDecoy.chapterId,
      quizId:quizDetailsAndAnswersDecoy.quizId,
    studentAnswers: [...decoyArray]}
     

  }
  
 
  
setQuizDetailsAndAnswers(quizDetailsAndAnswersDecoy)
dispatch(setCurrentQuizDetailsAndAnswers(quizDetailsAndAnswersDecoy))
dispatch(setPresentQuizQuestion(questionIndex))
}

}








  /*{ 
    quizId: mkmdofmomfdso,
   chapterId: woqmokdmoma,
    studentAnswers: [
      {
        questionNumber:1,
       chosenAnswer:A,
  }
  ,
    {
        questionNumber:2,
       chosenAnswer:B,
  }
  ,
  {
        questionNumber:3,
       chosenAnswer:D,
  }
    
  ]
 }*/


 



const [name,setName] = useState("Sample name")

//const [fileObject,setFileObj] = useState("ababa namna")
const [status,setStatus] = useState(false)
const [view,setView] = useState(new Blob())
const [loading,setLoading] = useState("Not loafing")
const URLSound = window.URL || window.webkitURL




/*SAVING TO BROWSER DATABASE END */

/*SUBJECT INFO SAVING */
const firstSplit =presentSubject.body.split('.')[1]
const secondSplit = firstSplit? firstSplit.split(':')[1]:""
const thirdSplit =  secondSplit? secondSplit.split(/[0-9]/):""

const [subjectList,setSubjectList] = useState(presentSubject && presentSubject.body && firstSplit && secondSplit && thirdSplit ?thirdSplit:[])

  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray",fontSize:"0.85rem"}}> 


   <br/><br/>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem"}}>
    <center>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",borderBottom:"3px solid red",width:"max-content"}}>
    {chosenQuiz && chosenQuiz.title.length >0 &&  chosenQuiz.subject.length >0 &&
    
    `${chosenQuiz.title} -  ${chosenQuiz.subject}`
    }
    
    </p>
    </center>
    </Grid>


  <Grid container xs={12} style={{paddingTop:"1.5rem"}}>



 {chosenQuiz && chosenQuiz.questionsArray && chosenQuiz.questionsArray.length >0?

 
 chosenQuiz.questionsArray.filter((item)=>(item)).sort((a,b)=>((a.questionNumber && b.questionNumber)?(a.questionNumber - b.questionNumber):1)).map((chapter,index)=>(
 
  <>
 
<Grid item xs={12} style={{paddingTop:index==0?"2rem":"4rem",paddingBottom:"1rem"}}>
    
<p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
  {chapter.question}
 { chosenId === sortedQuiz.indexOf(chapter) ? <KeyboardArrowUpIcon onClick={(index)=>{dropDownChecker(sortedQuiz.indexOf(chapter));console.log("CARET WAS CLICKED,INDEX IS:",sortedQuiz.indexOf(chapter))}}/>: <KeyboardArrowDownIcon onClick={()=>{dropDownChecker(sortedQuiz.indexOf(chapter))}}/>}
 </p>

</Grid>
<SlideDown style={{width:"100%"}}>
{ chosenId === index  &&
<SlideDown style={{width:"100%"}}>


{ 
  chosenQuiz.questionsArray && chosenQuiz.questionsArray.length > 0?
/* THIS IS COMMENTED OUT IN CASE OQUESTIONS ARRAY (IN QUIZ) IS CHANGED TO HAVE AN ARRAY OF OPTIONS OBJECTS, INSTEAD OF THE 4 STATIC OPTION OBJECTS WE HAVE
   WE DELETE THE 4 GRIDS BELOW AND REPLACE THEM BY UNCOMMENTING THIS


allChapterLessons.filter((item)=>(item.chapterId === chapter.uid)).sort((a,b)=>((a.lessonNumber && b.lessonNumber)?(a.lessonNumber - b.lessonNumber):1)).map((lesson,index)=>(

 <>
  <FormControl>
  <RadioGroup
   aria-labelledby="demo-radio-buttons-group-label"
   defaultValue=" "
   name="radio-buttons-group"
 >

{
 
  <Grid item xs={12} style={{ position:"relative",display: 'flex',width:"25rem",flexDirection:"column",flex:"1", justifyContent: 'flex-start',alignItems:"flex-start", gap:"1rem",paddingTop:"0.8rem",paddingBottom:"0.8rem",borderBottom:"1px solid lightgrey"}}>
  <FormControlLabel value={lesson.title && lesson.title} control={<Radio />} label={lesson.title && lesson.title} />
 </Grid>
 




}
</RadioGroup>
 </FormControl>
</>

))*/

<>
  <FormControl>
  <RadioGroup
   aria-labelledby="demo-radio-buttons-group-label"
   defaultValue=" "
   name="radio-buttons-group"
 >
 
  <Grid item xs={12} style={{ position:"relative",display: 'flex',width:"25rem",flexDirection:"column",flex:"1", justifyContent: 'flex-start',alignItems:"flex-start", gap:"1rem",paddingTop:"0.8rem",paddingBottom:"0.8rem",borderBottom:"1px solid lightgrey"}}>
  <FormControlLabel value={chapter.optionA && chapter.optionA.optionDesc} onClick={()=>{setChosenOption(chapter.optionA && chapter.optionA)}} control={<Radio />} label={chapter.optionA && chapter.optionA.optionDesc} />
 </Grid>

 <Grid item xs={12} style={{ position:"relative",display: 'flex',width:"25rem",flexDirection:"column",flex:"1", justifyContent: 'flex-start',alignItems:"flex-start", gap:"1rem",paddingTop:"0.8rem",paddingBottom:"0.8rem",borderBottom:"1px solid lightgrey"}}>
  <FormControlLabel value={chapter.optionB && chapter.optionB.optionDesc} onClick={()=>{setChosenOption(chapter.optionB && chapter.optionB)}}  control={<Radio />} label={chapter.optionB && chapter.optionB.optionDesc} />
 </Grid>

 <Grid item xs={12} style={{ position:"relative",display: 'flex',width:"25rem",flexDirection:"column",flex:"1", justifyContent: 'flex-start',alignItems:"flex-start", gap:"1rem",paddingTop:"0.8rem",paddingBottom:"0.8rem",borderBottom:"1px solid lightgrey"}}>
  <FormControlLabel value={chapter.optionC && chapter.optionC.optionDesc} onClick={()=>{setChosenOption(chapter.optionC && chapter.optionC)}}  control={<Radio />} label={chapter.optionC && chapter.optionC.optionDesc} />
 </Grid>

 <Grid item xs={12} style={{ position:"relative",display: 'flex',width:"25rem",flexDirection:"column",flex:"1", justifyContent: 'flex-start',alignItems:"flex-start", gap:"1rem",paddingTop:"0.8rem",paddingBottom:"0.8rem",borderBottom:"1px solid lightgrey"}}>
  <FormControlLabel value={chapter.optionD && chapter.optionD.optionDesc} onClick={()=>{setChosenOption(chapter.optionD && chapter.optionD)}}  control={<Radio />} label={chapter.optionD && chapter.optionD.optionDesc} />
 </Grid>
 
</RadioGroup>
 </FormControl>
</>



:

<Grid item xs={12} style={{ position:"relative",display: 'flex', justifyContent: 'flex-start',alignItems:"center", gap:"1rem",paddingTop:"0.8rem",paddingBottom:"0.8rem",borderBottom:"1px solid lightgrey"}}>

<p style={{display:"inline"}}> No Options for this question</p>

</Grid>

}




{

<Grid item xs={12} style={{paddingTop:"2rem",display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",flexDirection:"column"}}>
   


<TextField style={{position:"relative",width:"65%",paddingBottom:"0.5rem",alignItems:"center"}}
            fullWidth
            placeholder="pick from options above"
            variant="outlined"
            multiline
            maxRows={1}
            value= {chosenOption && chosenOption.optionDesc.length > 0 ? chosenOption.optionDesc:""}
           
            />

    <Button onClick={()=>{addToStudentAnswers(chapter.questionNumber,chosenOption.optionLetter,index)}}
    
    style={{ backgroundColor: "#000000",color:"#FFFFFF", paddingTop: '10px', paddingBottom: '10px', 
                     paddingRight: '30px', paddingLeft: '30px'}}>
      {finalQuestion && (currentQuestionIndex === chosenQuiz.questionsArray.length-1) ?(submittingSingleAnswer?"submitting Quiz...":"SUBMIT QUIZ"):(submittingSingleAnswer?"saving answer...":(currentQuestionIndex<openQuestionIndex?"SAVE":"NEXT"))}
      </Button>
 
 <Divider/>

</Grid>

}

</SlideDown>
}
</SlideDown>
</>


 )):
 
 
 <Grid item xs={12} style={{paddingTop:"4rem",paddingBottom:"1rem"}}>
    
<p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
  {"NO OPTIONS AVAILABLE FOR THIS QUESTION"}
 </p>

</Grid>
 
 
 } 

 
  </Grid>  

  
   <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",marginBottom:"20px",gap:"10px" }}>
  
 {/* 
  <Button   variant="contained" 
  style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
  padding: '8px'}}
  onClick={()=>{submitQuizAnswers(user.uid,currentQuizDetailsAndAnswers,navigate)}}
  >
 { loadingSubmit?"submitting...":"Submit Quiz"}
  </Button>
*/}

</center>


</Container>
    </>
  );
}

export default SelectedQuizPage;