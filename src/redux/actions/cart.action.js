import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { db, fb, auth, storage } from '../../config/firebase';
import { fetchTransactions, isItLoading } from '../reducers/transactions.slice';
import { clearCart, savePurchasedCourses,saveCartPackSortIds, saveCartPackIds } from '../reducers/cart.slice';
import firebase from "firebase/app";


export const saveToCart = (uid) => async (dispatch) => {
     dispatch(isItLoading(true));
      db.collection("transactions")
      . where('userID', '==', uid)
       .get()
       .then((snapshot) => {
        const myTransactions = snapshot.docs.map((doc) => ({ ...doc.data() }));
        console.log("myTransactions: ", myTransactions);
        dispatch(isItLoading(false));
        dispatch(fetchTransactions(myTransactions));
     }).catch((error) => {
       console.log("Error getting document:", error);
       dispatch(isItLoading(false));
     });
 };

 
export const buyCourse = (courses, studentId, today, navigate, setLoading) => async (dispatch) => {
 
 const newPurchasedCourses =courses && courses.courses.map((element)=>({
   ...element,
   purchasedOn:today
}))

//
//  var purchasedCourseRef = db.collection("purchasedCourses");
//  purchasedCourseRef.add({
//      uid: studentId,
//      courses: courses.courses,
//      createdAt: today,
//      affiliate:courses.affiliateId
//  })
//  .then(() => {
//    notifySuccessFxn("Cours acheté avec succès");
//    dispatch(clearCart());
//    navigate('/dashboard/purchased-courses');
//  })
//  .catch((error) => {
//    var errorMessage = error.message;
//    notifyErrorFxn("Error with Purchasing Course");
//    console.log('Error with buying course', errorMessage);
//    setLoading(false);
//  });



  let accurateStudentId
  db.collection("purchasedCourses")
  .where('uid', '==', studentId)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ purchaseId:doc.id,...doc.data() }));
   if (allGroups.length > 0) {
      console.log("THE PURCHASED COURSE---->",allGroups)
    db.collection("purchasedCourses").doc(allGroups[0].purchaseId).update({
    // courses:firebase.firestore.FieldValue.arrayUnion(...newPurchasedCourses)
       courses:[...allGroups[0].courses,...newPurchasedCourses]
    })
    
    
    
    
    
    db.collection("users").doc(studentId).get().then((doc)=>{
    if(doc.exists){
      let newPurchasedCourseIds = newPurchasedCourses.map((item)=>(item.id))
    db.collection("users").doc(studentId)
    .update({
      //purchasedCourses:firebase.firestore.FieldValue.arrayUnion(newPurchasedCourses)
        purchasedCourses:[...doc.data().purchasedCourses,...newPurchasedCourseIds]
      }) 
    }else{

     notifyErrorFxn(" cannot find student to update purchased courses")
    }


    }).then(()=>{

      notifySuccessFxn("Cours acheté avec succès");
    dispatch(clearCart());
    navigate('/dashboard/purchased-courses');
    })


      
    
    
   } else {
   
    db.collection("users").doc(studentId).get().then((doc)=>{
      if(doc.exists){
      db.collection("users").doc(studentId)
      .update({
        purchasedCourses:firebase.firestore.FieldValue.arrayUnion(...newPurchasedCourses)
          // courses:[...allGroups[0].courses,...newPurchasedCourses]
        }) 


        db.collection("purchasedCourses").add({
          courses:newPurchasedCourses,
          uid:studentId,
          createdAt:(new Date()).toDateString()
        })
    
      }else{
  
       notifyErrorFxn("cannot find student to add new entry for purchased course(s)")
      }
  
  
      }).then(()=>{
  
        notifySuccessFxn("Cours acheté avec succès");
        dispatch(clearCart());
        navigate('/dashboard/purchased-courses');
      })
   }
 }).catch((error) => {
  var errorMessage = error.message;
    notifyErrorFxn("Error with Purchasing Course");
    console.log('Error with buying course', errorMessage);
    setLoading(false);
 });



}








export const buyCourseUpdateUser = (courses, uid, today, navigate) => async (dispatch) => {
  var userRef = db.collection("users").doc(uid);
 userRef.update({
   purchasedCourses:db.FieldValue.arrayUnion(...courses), //<--- will this array of values spread into individual courses ids , confirm upon testing ?
 })
  .then(() => {
    //notifySuccessFxn("Course purchased successfully");
    dispatch(clearCart());
    //navigate('/dashboard/purchased-courses');
  })
  .catch((error) => {
    var errorMessage = error.message;
    notifyErrorFxn("Error with updating user's purchased courses");
    console.log('Error with buying course', errorMessage);
  });
}

export const fetchPurchasedCourse = (uid) => async (dispatch) => {
  var purchasedCoursesRef = db.collection("purchasedCourses");
  purchasedCoursesRef = purchasedCoursesRef.where("uid", "==", uid);

  purchasedCoursesRef.get().then((snapshot) => {
    const purchasedCourses = snapshot.docs.map((doc) => ({ ...doc.data() }));
    console.log("purchasedCourses", purchasedCourses)
    if (purchasedCourses.length) {
      dispatch(savePurchasedCourses(purchasedCourses));
    } else {
      dispatch(savePurchasedCourses([]));
    }
  }).catch((error) => {
    console.log("Error getting purchasedCourses:", error);
  });
};


export const setCartPackSortIds = (packTitles) => async (dispatch) => {

  dispatch(saveCartPackIds(packTitles))

 }
