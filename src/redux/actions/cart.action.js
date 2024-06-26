import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { db, fb, auth, storage } from '../../config/firebase';

import { clearCart,
         savePurchasedCourses,
         saveCartPackSortIds,
         saveCartPackIds,
         saveCartToProcess,
         saveMostRecentOrderId,
         saveMostRecentOrderAmount,
         saveMostRecentPayToken,
         isItLoading
   } from '../reducers/cart.slice';
import firebase from "firebase/app";




/*=====CART ITEMS ARE BEING SAVED TO DB SO THAT THEY CAN BE CALLED ON ORANGE CALLBACK PAGE  ======*/
 export const saveCartToDatabase = (uid,cartToSubmit) => async (dispatch) => {
  dispatch(isItLoading(true));
   db.collection("users")
   .doc(uid)
    .update({
      cartInProgress:cartToSubmit
    })
    .then((snapshot) => {
     
    
     dispatch(isItLoading(false));
    
  }).catch((error) => {
    //console.log("Error getting document:", error);
    notifyErrorFxn("ISSUE WITH STORAGE OF CART")
    dispatch(isItLoading(false));
  });
};


/*=====TOKEN IS BEING SAVED TO DB SO THAT THEY CAN BE CALLED ON ORANGE CALLBACK PAGE  ======*/
export const savePayTokenToDatabase = (uid,pay_token,orderAmount,orderId) => async (dispatch) => {
  dispatch(isItLoading(true));
   db.collection("users")
   .doc(uid)
    .update({
      
      mostRecentOrderAmount:orderAmount,
      mostRecentPayToken:pay_token,
      mostRecentOrderId:orderId,
      
    })
    .then((snapshot) => {
     
    
     dispatch(isItLoading(false));
    
  }).catch((error) => {
    //console.log("Error getting document:", error);
    notifyErrorFxn("ISSUE WITH STORAGE OF CART")
    dispatch(isItLoading(false));
  });
};


/*=====TOKEN IS CLEARED FROM DB AFTER VISITING ORANGE (OM) CALLBACK PAGE  ======*/
export const clearPayTokenFromDatabase = (uid,pay_token,orderAmount,orderId) => async (dispatch) => {
  dispatch(isItLoading(true));
   db.collection("users")
   .doc(uid)
    .update({
      
      mostRecentOrderAmount:0,
      mostRecentPayToken:'',
      mostRecentOrderId:'',
      
    })
    .then((snapshot) => {
     
     //console.log("---->THE Order ID HAS BEEN CLEARED FROM THE DB, READY FOR USE IN THE CALLBACK PAGE<-----");
     dispatch(isItLoading(false));
    
  }).catch((error) => {
    //console.log("Error getting document:", error);
    notifyErrorFxn("ISSUE WITH STORAGE OF CART")
    dispatch(isItLoading(false));
  });
};



export const fetchCartToProcessFromUser = (uid) => async (dispatch) => {
  dispatch(isItLoading(true));
   db.collection("users")
   .doc(uid)
    .get()
    .then((doc) => {
     

      if (doc.exists) {
        // //console.log("User Data:", doc.data());
        dispatch(saveCartToProcess(doc.data().cartInProgress));
        dispatch(saveMostRecentOrderAmount(doc.data().mostRecentOrderAmount));
        dispatch(saveMostRecentOrderId(doc.data().mostRecentOrderId));
        dispatch(saveMostRecentPayToken(doc.data().mostRecentPayToken));

      }
      else {
        //console.log("THE USER WE ARE TRYING TO GET THEIR MOST UP TO DATE CART, SEEMS TO BE MISSING")
      }
     dispatch(isItLoading(false));



    
  }).catch((error) => {
    //console.log("Error getting document:", error);
   
    //console.log("WE HAVE CART TO PROGRESS, NOW WE HAVE AN ISSUE IN DISPENSING IT TO PURCHASED COURSES")
    dispatch(isItLoading(false));
  });
};

 /*=====ADDING COURSES TO PURCHASED COURSES COLLECTION  ======*/
export const buyCourse = (courses, studentId, today, navigate, txnId= null ,order_id = null) => async (dispatch) => {
   //notifyErrorFxn("BUY COURSES FUNCTION IS ACTIVATED")
 const newPurchasedCourses = txnId  && order_id ?
 
 courses && courses.courses.map((element)=>({
   ...element,
   purchasedOn:today,
   orangeOrderId:order_id,
   orangeTxnId:txnId
}))

:
   
courses && courses.courses.map((element)=>({
  ...element,
  purchasedOn:today
}))


/// CODE FOR ADDING TO DATABASE BELOW //////////
  let accurateStudentId
  db.collection("purchasedCourses")
  .where('uid', '==', studentId)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ purchaseId:doc.id,...doc.data() }));
   if (allGroups.length > 0) {
      //console.log("THE PURCHASED COURSE---->",allGroups)
    db.collection("purchasedCourses").doc(allGroups[0].purchaseId).update({
  
       courses:[...allGroups[0].courses,...newPurchasedCourses]
    })

   //////////////////////////////////////////////////////////////////////////////////// 
    db.collection("users").doc(studentId).get().then((doc)=>{
    if(doc.exists){
      let newPurchasedCourseIds = newPurchasedCourses.map((item)=>(item.id))
    db.collection("users").doc(studentId)
    .update({
    
        purchasedCourses:[...doc.data().purchasedCourses,...newPurchasedCourseIds]
      }) 
    }else{

     notifyErrorFxn(" cannot find student to update purchased courses")
    }
////////////////////////////////////////////////////////////////////////////////////

    }).then(()=>{

      notifySuccessFxn("Cours acheté avec succès");
    dispatch(clearCart());
    navigate('/dashboard/purchased-courses');
    }).catch((error) => {
      var errorMessage = error.message;
        notifyErrorFxn("Error with Updating user !");
        //console.log('Error with buying course', errorMessage);
       
     });


   } else {
    let newPurchasedCourseIds = newPurchasedCourses.map((item)=>(item.id))
    db.collection("users").doc(studentId).get().then((doc)=>{
      if(doc.exists){
      db.collection("users").doc(studentId)
      .update({
        purchasedCourses:firebase.firestore.FieldValue.arrayUnion(...newPurchasedCourseIds)
         
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
    //console.log('Error with buying course--->', errorMessage);
    
 });



}







 /*=====ADDING COURSES TO EACH USER, THEIR PURCHASED COURSES ARRAY IN EACH USER DOCUMENTS, OCCASIONALL THIS ARRAY WILL BE USED TO CROSS CHECK WITH THE PURCHASED COURSES ARRAY  ======*/
export const buyCourseUpdateUser = (courses, uid, today, navigate) => async (dispatch) => {
  var userRef = db.collection("users").doc(uid);
 userRef.update({
   purchasedCourses:db.FieldValue.arrayUnion(...courses),
 })
  .then(() => {
    //notifySuccessFxn("Course purchased successfully");
    dispatch(clearCart());
    navigate('/dashboard/purchased-courses');
  })
  .catch((error) => {
    var errorMessage = error.message;
    notifyErrorFxn("Error with updating user's purchased courses");
    //console.log('Error with buying course', errorMessage);
  });
}

export const fetchPurchasedCourse = (uid) => async (dispatch) => {
  var purchasedCoursesRef = db.collection("purchasedCourses");
  purchasedCoursesRef = purchasedCoursesRef.where("uid", "==", uid);

  purchasedCoursesRef.get().then((snapshot) => {
    const purchasedCourses = snapshot.docs.map((doc) => ({ ...doc.data() }));
    //console.log("purchasedCourses", purchasedCourses)
    if (purchasedCourses.length) {
      dispatch(savePurchasedCourses(purchasedCourses));
    } else {
      dispatch(savePurchasedCourses([]));
    }
  }).catch((error) => {
    //console.log("Error getting purchasedCourses:", error);
  });
};


export const setCartPackSortIds = (packTitles) => async (dispatch) => {

  dispatch(saveCartPackIds(packTitles))

 }
