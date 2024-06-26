import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid'
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { isItLoading, saveAllGroup ,saveEmployeer,
  saveCategories ,saveGroupMembers, saveMyGroup,
   savePrivateGroup, savePublicGroup, saveSectionVideos,
   saveNextUpVideo,savelastWatchedVideo,saveCategoryVideos,
   saveCategorySubjects,savePackSubjects,savePresentSubject,saveSubjectChapters,
   saveSubjectPastExams,
   saveAllChapterLessons,saveSelectedAudioId,saveSelectedAudio,
   saveSelectedAudioState,saveAllQuizzesForSubject
   ,savePresentQuizQuestion,saveChosenQuiz,
   saveCurrentQuizDetailsAndAnswers, saveSubmittingSingleAnswer,
   saveOpenQuestionIndex,saveCurrentQuestionIndex,
   fetchTeachers,
   saveDownloadReload,
   savePacks,saveTransactionReference,
    } from '../reducers/main.slice';

 import {markRegisteredWithSocials}   from '../reducers/auth.slice';
 import {presentOpenQuiz}   from '../reducers/main.slice';





import firebase from "firebase/app";
import { fetchUserData } from './auth.action';


let globalLessonsArray = []
let globalQuizzesArray = []















 export const fetchSingleVideo = (videoId)=> async(dispatch)=>{


  var docRef = db.collection("courses").doc(videoId.trim());
  docRef.get().then((doc) => {
  const data = doc.data(); 
  dispatch(savelastWatchedVideo(data))
  //console.log("i have dispatched the latest CURRENT VIDEO")

}).catch((error) => {
  //console.log("Error getting single video:", error);
 
});


 }


 

/*========== do group fetching of teachers  FOR BONECOLE ======================= */

 export const getTeachers = ( ) => async (dispatch) => {
  db.collection('teachers').get().then((snapshot) => {
      const allTeachers = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data() }));
      // //console.log('Jobs: ', jobs);
      dispatch(fetchTeachers(allTeachers));
}).catch((error) => {
      var errorMessage = error.message;
      //console.log('Error fetching teachers', errorMessage);
});

};


/*========== do group fetching of categories  FOR BONECOLEHERE ======================= */

export const fetchAllCategories = () => async (dispatch) => {
  var categories = db.collection("categories");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
    //console.log("ALL CATEGORIES ARE:",groupMembers)
    if (groupMembers.length) {
    dispatch(saveCategories(groupMembers));
  } else {
      //console.log("No categories in database!");
      dispatch(saveCategories([]));
  }
}).catch((error) => {
  //console.log("Error getting categories:", error);
});
//return user;
};


/*===============do fetching of categories  FOR BONECOLE ABOVE ===================== */





 /*============== NOTE THE FURTHEST QUESTION ANSWERED - BONECOLE QUIZZES ================ */
export const setPresentQuizQuestion = (questionIndex) => async (dispatch) => {
  dispatch(saveOpenQuestionIndex(questionIndex+1))
  dispatch(saveCurrentQuestionIndex(questionIndex+1))
  //dispatch(savePresentQuizQuestion(uid))

}


 /*============== KEEP TRACK OF WHICH QUESTION IS IN FOCUS - BONECOLE QUIZZES ================ */
 export const setCurrentQuestionIndex = (questionIndex) => async (dispatch) => {
  dispatch(saveCurrentQuestionIndex(questionIndex))
  //dispatch(savePresentQuizQuestion(uid))

}


 /*============== SAVE THE QUIZ AND QUESTIONS ANSWERED SO FAR, FOR PERSISTENCE ================ */
 export const setCurrentQuizDetailsAndAnswers = (quizObject) => async (dispatch) => {
 dispatch(saveSubmittingSingleAnswer(true))
  dispatch(saveCurrentQuizDetailsAndAnswers(quizObject))
setTimeout(()=>{dispatch(saveSubmittingSingleAnswer(false))},500)
}



 /*============== UPDATE A USER'S PROFILE - BONECOLE ================ */
export const updateProfile = (uid,updateObject,navigate) => async (dispatch) => {
  //console.log("I have reached the users profile again")
  db.collection("users").doc(uid).update(
    {
      telephone:updateObject.telephone,
      phone:updateObject.telephone,
      pvExamen:updateObject.pvExamen,
      classOption:updateObject.classes,
      schoolOrigin:updateObject.school,
      firstName:updateObject.firstName,
      lastName:updateObject.lastName,
      facebook:updateObject.facebook,
      affiliate:updateObject.affiliate,
      uid:uid
    }
  ).then((snapshot) => {
    
    db.collection("userData").doc(uid).update(
      {
        telephone:updateObject.telephone,
        phone:updateObject.telephone,
        pvExamen:updateObject.pvExamen,
        classOption:updateObject.classes,
        schoolOrigin:updateObject.school,
        firstName:updateObject.firstName,
        lastName:updateObject.lastName,
        facebook:updateObject.facebook,
        affiliate:updateObject.affiliate,
      }
    )

 }).then((snapshot) => {
  //const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   dispatch(fetchUserData(uid))
 
  dispatch(markRegisteredWithSocials(false))
  notifySuccessFxn("updated your Profile successfully")
  navigate('/dashboard/home')
})
 .catch((error) => {
   //console.log("Error updating profile because:", error);
   notifyErrorFxn(error)


 });
 };

/*FETCH ALL SUBJECTS UNDER ONE CATEGORY -  BONECOLE*/
export const fetchCategorySubjects = (category) => async (dispatch) => {
 
  db.collection("sections")
   .where("category", "==", category )
   .get()
   .then((snapshot) => {
     const subjectsArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (subjectsArray.length) {
    
     //console.log(`subject for ${category} are:`, subjectsArray);
     dispatch(saveCategorySubjects(subjectsArray));
   } else {
     
    dispatch(saveCategorySubjects([]));
       //console.log(`No subjects for the category; ${category}`);
   }
 }).catch((error) => {
   //console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };

 
/*FETCH ALL PACKS UNDER ONE CATEGORY -  BONECOLE */

export const fetchCategoryPacks = (category) => async (dispatch) => {
 
  db.collection("packs")
   .where("category", "==", category )
   .get()
   .then((snapshot) => {
     const packsArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (packsArray.length) {
    
   
     dispatch(savePacks(packsArray));
   } else {
     
    dispatch(savePacks([]));
       //console.log(`No packs for the category; ${category}`);
   }
 }).catch((error) => {
   //console.log("Error getting packs:", error);
   dispatch(isItLoading(false));
 });
 };


 /*FETCH ALL SUBJECTS UNDER ONE PACK -  BONECOLE */

export const fetchPackSubjects = (category) => async (dispatch) => {
 
  db.collection("sections")
   .where("uid", "in", category)
   .get()
   .then((snapshot) => {
     const subjectsArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (subjectsArray.length) {
    
     //console.log(`subjects for ${category} are:`, subjectsArray);
     dispatch(savePackSubjects(subjectsArray));
   } else {
     
       //console.log(`No subjects for the category; ${category}`);
   }
 }).catch((error) => {
   //console.log("Error getting subjects:", error);
   dispatch(isItLoading(false));
 });
 };

 /*============== FETCH THE CHAPTERS OF A PARTICULAR SUBJECT================ */
 /*============== AND ALSO FETCH THE LESSONS OF ALL CHAPTERS =============== */
 /*============== AND ALSO FETCH THE QUIZZES OF ALL CHAPTERS =============== */
  /*============== PAST EXAMS NEED TO BE FETCHED AT THIS POINT TOO BECAUSE THEY SHOW UP ON THE SAME SCREEN AS CHAPTERS =============== */

 export const fetchSubjectChapters = (uid) => async (dispatch) => {
  globalLessonsArray = []
  globalQuizzesArray =[]

  db.collection("pastExams")
  .where("sectionId", "==", uid )
   .get()
   .then(

    (snapshot) => {
      const pastExamsArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
    if (pastExamsArray.length) {
     
      //console.log(`pastExams for T subject ${uid} are:`, pastExamsArray);
      dispatch(saveSubjectPastExams(pastExamsArray));
      return pastExamsArray
    } else {
     dispatch(saveSubjectPastExams([]));
        //console.log(`No past exams for the subject; ${uid}`);
        return []
    }
  }
   )




  db.collection("chapters")
   .where("sectionId", "==", uid )
   .get()
   .then((snapshot) => {
     const chaptersArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (chaptersArray.length) {
    
    
     dispatch(saveSubjectChapters(chaptersArray));
     return chaptersArray
   } else {
    dispatch(saveSubjectChapters([]));
     
       return []
   }
 }).then((result)=>{

  let chaptersArray = [...result]
 


  chaptersArray.forEach((item)=>{
 dispatch(fetchVideosOneChapter(item.uid))
 dispatch(fetchQuizzesOneChapter(item.uid)) 
  })


  setTimeout(()=>{dispatch(saveAllChapterLessons(globalLessonsArray))},1500)
  setTimeout(()=>{dispatch(saveAllQuizzesForSubject(globalQuizzesArray))},1500)
})

 
 .catch((error) => {
   //console.log("Error getting chapters for the subject:", error);
  
 });
 };


  /*========== SAVING THE SELECTED SUBJECT FOR WHEN A CARD IS CLICKED===========*/
  export const fetchCurrentSubjectFromDB = (id) => async (dispatch) => {

    //console.log("THE ID GEOGRAPHY IS SUPPOSED TO GET----->",id)
   
      //dispatch(isItLoading(true));
  db.collection("sections")
  .doc(id)
   .get().then((doc)=>{
   
    const subject = doc.data(); 

  //console.log("WHERE GEOGRAPHY HAS A PROBLEM------>",subject)

    dispatch(savePresentSubject(subject))
   })
   
   
   
  
   }


 /*========== SAVING THE SELECTED SUBJECT FOR WHEN A CARD IS CLICKED - BONECOLE===========*/
 export const fetchCurrentSubject = (subject) => async (dispatch) => {

  dispatch(savePresentSubject(subject))

 }

 export const fetchVideosOneChapter = (uid) => async (dispatch) => {
 
  db.collection("boneCourses")
   .where("chapterId", "==", uid )
   .get()
   .then((snapshot) => {
     const videosArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (videosArray.length) {
    
     ////console.log(`lessons for ${uid} are:`, videosArray);
    // dispatch(saveSubjectChapters(videosArray));

    globalLessonsArray = [...globalLessonsArray,...videosArray]
   } else {
     
       //console.log(`No lessons for the chapter,when database was checked; ${uid}`);
       globalLessonsArray = [...globalLessonsArray,...videosArray]
   }
 }).catch((error) => {
   //console.log("Error getting lessons for the chapter:", error);
 });
 };


 /*========== FETCHING ALL THE QUIZZES FOR ONE CHAPTER - BONECOLE ===========*/
 export const fetchQuizzesOneChapter = (uid) => async (dispatch) => {
 
  db.collection("quizzes")
   .where("chapterId", "==", uid )
   .get()
   .then((snapshot) => {
     const quizArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (quizArray.length) {
    
     ////console.log(`lessons for ${uid} are:`, videosArray);
    // dispatch(saveSubjectChapters(videosArray));

    globalQuizzesArray = [...globalQuizzesArray,...quizArray]
   } else {
     
       //console.log(`No quiz for the chapter, when database was checked; ${uid}`);
       globalQuizzesArray = [...globalQuizzesArray,...quizArray]
   }
 }).catch((error) => {
   //console.log("Error getting quizzes for the chapter:", error);
 });
 };



 /*========== FETCHING ONE QUIZ THAT WAS CHOSEN - BONECOLE===========*/
 
 export const fetchChosenQuiz = (uid)=> async(dispatch)=>{


  var docRef = db.collection("quizzes").doc(uid.trim());
  docRef.get().then((doc) => {
  const data = doc.data(); 
  dispatch(saveChosenQuiz(data))


}).catch((error) => {
  //console.log("Error getting single quiz:", error);
 
});


 }


 export const updateStudentQuizzesTaken = (id, newQuiz, navigate) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  let resultPercentage =0 
  let numberOfQuestions;
  let gradedQuiz ={...newQuiz,resultPercentage} ;
  const studentAnswers = newQuiz.studentAnswers
  
 

  user.get().then((doc) => {
  if (doc.exists) {
  
    const currentQuizzes =  doc.data().quizzesTaken?doc.data().quizzesTaken:[]
 

   /*DO QUIZ GRADING HERE */
  

  db.collection("quizzes").doc(newQuiz.quizId)

.get().then((dac) => {
    
   numberOfQuestions = dac.data().questionsArray.length

     const questionsArray = dac.data().questionsArray
     

    
     
   
     questionsArray.forEach((item,i)=>{
     
      if(studentAnswers[i].chosenAnswer && item.correctAnswer === studentAnswers[i].chosenAnswer.optionLeter){
       resultPercentage = resultPercentage + ((Number(1/numberOfQuestions).toFixed(2))*100)
      }

    })

    gradedQuiz = {...newQuiz,resultPercentage}
   
    //console.log("AFTER GRADING THE QUIZ IS NOW",gradedQuiz)
    //console.log(" THE student's selected Answers are!!",questionsArray)
   })



  /*DO QUIZ GRADING END */

   setTimeout( ()=>{

    user.update({
      quizzesTaken:[...currentQuizzes,gradedQuiz]
    })
  
     
      notifySuccessFxn("Quiz Submitted Successfully!");
      navigate('/dashboard/6e', { replace: true });
 
  }
      ,1000)
  
  } else {
     
      notifyErrorFxn("Problem Submitting quiz,please check your connection and try again❌")
      //console.log("could not find the user to update their quizzes");
  }
}).catch((error) => {
  notifyErrorFxn("Problem Submitting quiz,please check your connection and try again❌")
  //console.log("Error getting document:", error);
});

};



 /*========== SAVING THE SELECTED AUDIO SO THAT ONLY ONE AUDIO CAN PLAY AT A TIME -BONECOLE ===========*/
 export const setSelectedAudioId = (uid) => async (dispatch) => {

  dispatch(saveSelectedAudioId(uid))

 }


 export const setSelectedAudio = (urlLink) => async (dispatch) => {

  dispatch(saveSelectedAudio(urlLink))
  dispatch(saveSelectedAudioState(true))

 }


 export const setSelectedAudioState = (state) => async (dispatch) => {

  dispatch(saveSelectedAudioState(state))

 }


  /*========== TRIGGERING THE DOWNLOADS SCREEN TO RELOAD - BONECOLE - WHEN THE DOWNLOAD IS COMPLETE===========*/
  export const setDownloadReload = (downrel) => async (dispatch) => {

    dispatch(saveDownloadReload(downrel))
  
   }



   export const  setTransactionReference =  (reference) => async (dispatch) => {

    dispatch(saveTransactionReference(reference))
  }