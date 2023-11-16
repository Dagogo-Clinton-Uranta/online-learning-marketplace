import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { db, fb, auth, storage } from '../../config/firebase';
import { fetchTransactions, isItLoading } from '../reducers/transactions.slice';
import { clearCart, savePurchasedCourses } from '../reducers/cart.slice';

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

 
export const buyCourse = (courses, uid, today, navigate) => async (dispatch) => {
  var purchasedCourseRef = db.collection("purchasedCourses");
  purchasedCourseRef.add({
      uid: uid,
      courses: courses,
      createdAt: today,
  })
  .then(() => {
    notifySuccessFxn("Course purchased successfully");
    dispatch(clearCart());
    navigate('/dashboard/purchased-courses');
  })
  .catch((error) => {
    var errorMessage = error.message;
    notifyErrorFxn("Error with Purchasing Course");
    console.log('Error with buying course', errorMessage);
  });
}

export const buyCourseUpdateUser = (courses, uid, today, navigate) => async (dispatch) => {
  var userRef = db.collection("purchasedCourses").doc(uid);
 userRef.update({
   purchasedCourses:db.FieldValue.arrayUnion(...courses) //<--- will this array of values spread into individual courses ids , confirm upon testing ?
 })
  .then(() => {
    notifySuccessFxn("Course purchased successfully");
    dispatch(clearCart());
    navigate('/dashboard/purchased-courses');
  })
  .catch((error) => {
    var errorMessage = error.message;
    notifyErrorFxn("Error with Purchasing Course");
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
