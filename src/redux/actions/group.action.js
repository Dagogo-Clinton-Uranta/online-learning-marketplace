import { db, fb, auth, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid'
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { isItLoading, saveAllGroup ,saveEmployeer,saveCategories ,saveGroupMembers, saveMyGroup, savePrivateGroup, savePublicGroup, saveSectionVideos,saveNextUpVideo,savelastWatchedVideo,saveCategoryVideos } from '../reducers/group.slice';
import firebase from "firebase/app";

export const createGroup = (groupData, user, file, navigate, setLoading, url) => async (dispatch) => {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today  = new Date();
   
  db.collection("groups").add({
    groupName: groupData.groupName,
    noOfSavers: groupData.noOfSavers,
    pin: groupData.pin,
    startDate: groupData.startDate,
    amount: groupData.amount,
    status: groupData.status.toLowerCase(),
    imageUrl: url,
    admins: [user.id],
    members: [user.id],
    accountCreated: today.toLocaleDateString("en-US", options),
}).then((res)=>{
    console.log("RESPONSE ID: ", res.id);
    return db.collection('groups').doc(res.id).update({
      groupId: res.id,
    }).then(() => {
        db.collection('groups').doc(res.id).collection('membersCollection').add({
            memberName: user.name,
            memberEmail: user.email,
            memberImageUrl: user.profileImg,
            invitedBy: user.id,
            invite: 0,
            paid: 0,
            users: [user.id, user.id],
            sentAt: today.toLocaleDateString("en-US", options),
          }).then((resp) => {
            console.log("membersCollection RESPONSE: ", resp);
            setLoading(false);
            db.collection('groups').doc(res.id).collection('membersCollection').doc(resp.id).update({
              id: resp.id,
            })
          }).then(() => {
            notifySuccessFxn("Group Created")
            setLoading(false);
            navigate('/dashboard/home', { replace: true });
          }).catch((err) => {
            console.error("Error creating group: ", err);
            var errorMessage = err.message;
            notifyErrorFxn(errorMessage);
            setLoading(false);
          })
    })
  })
}


export const uploadUserSettings = (groupData = 0, file = 0, user = 0) => async (dispatch) => {
 if(file && file.length !== 0){

   /*LOGIC T0 RUN IF WE HAVE A PICTURE */

  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
      notifyErrorFxn("Error uploading image,please try again!")
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          //dispatch(createGroup(groupData, user, file, navigate, setLoading, url));
 
  

    if(groupData.newPassword){
   //PASSWORD UPDATE LOGIC

   fb.auth().signInWithEmailAndPassword(groupData.email, groupData.password)
   .then((userCredential) => {
     // Signed in
     const user = fb.auth().currentUser;
    
     user.updatePassword(groupData.newPassword).then(() => {
       // Update successful.
       console.log("PASSWORD UPDATE WENT WELL")
     }).catch((error) => {
       // An error ocurred
       console.log("PASSWORD UPDATE FAILED HORRIBLY!")
     });

    
     db.collection('users')
     .doc(groupData.uid)
     .update({
      companySize:groupData.companySize,
      profileImage:url,
      password:groupData.newPassword
     }).then(()=>{
        notifySuccessFxn("data updated successfully")
     }).catch((error)=>{
      notifyErrorFxn("Error updating data,please try again!")
     })

   }).catch(()=>{
    notifyErrorFxn("Please try updating your password again...")
   })

        
          }

  
     if(!groupData.newPassword){
    db.collection('users')
  .doc(groupData.uid)
  .update({
   companySize:groupData.companySize,
   profileImage:url,
   
  }).then(()=>{
     notifySuccessFxn("data updated successfully")
  }).catch((error)=>{
   notifyErrorFxn("Error updating data,please try again!")
  })

  }
        });
    }
  );

} 

if(file.length === 0 && !groupData.newPassword){
   // WE HAVE NO IMAGE AND NO NEW PASSWORD
   db.collection('users')
   .doc(groupData.uid)
   .update({
    companySize:groupData.companySize
   }).then(()=>{
      notifySuccessFxn("data updated successfully")
   }).catch((error)=>{
    notifyErrorFxn("Error updating data,please try again!")
   })

}


if(file.length === 0 && groupData.newPassword){
  // WE HAVE NO IMAGE BUT A NEW PASSWORD
  
  //UPDATING THE PASSWORD
  fb.auth().signInWithEmailAndPassword(groupData.email, groupData.password)
  .then((userCredential) => {
    // Signed in
    const user = fb.auth().currentUser;

    user.updatePassword(groupData.newPassword).then(() => {
      // Update successful.
      console.log("PASSWORD UPDATE WENT WELL")
    }).catch((error) => {
      // An error ocurred
      console.log("PASSWORD UPDATE FAILED HORRIBLY!")
    });
   
    //UPDATING USER INFORMATION
  db.collection('users')
  .doc(groupData.uid)
  .update({
   companySize:groupData.companySize,
   password:groupData.newPassword
  }).then(()=>{
     notifySuccessFxn("data updated successfully")
  }).catch((error)=>{
   notifyErrorFxn("Error updating data,please try again!")
  })
  }).catch(()=>{
   notifyErrorFxn("Please try updating your password again...")
  })
  
 

}

}

export const fetchMyGroups = (coolers) => async (dispatch) => {
  console.log("Clicked...");
  dispatch(isItLoading(true));
  if (coolers.length) {
    const chunkSize = 10;
    const chunks = coolers.reduce((acc, _, i) => (i % chunkSize ? acc : [...acc, coolers.slice(i, i + chunkSize)]), []);
    const promises = chunks.map((chunk) => {
      return db
        .collection("groups")
        .where("groupId", "in", chunk)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    Promise.all(promises)
      .then((results) => {
        const myGroups = results.flat();
        console.log("My Groups Data:", myGroups);
        dispatch(saveMyGroup(myGroups));
        dispatch(isItLoading(false));
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        dispatch(isItLoading(false));
      });
  } else {
    dispatch(saveMyGroup(coolers));
    dispatch(isItLoading(false));
  }
};





export const fetchGroups = (adminID) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection("groups")
  .where('admin', '==', adminID)
   .get()
   .then((snapshot) => {
     const allGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (allGroups.length > 0) {
     dispatch(isItLoading(false));
     console.log("All Groups Data:", allGroups);
     dispatch(saveAllGroup(allGroups));
   } else {
       dispatch(isItLoading(false));
       dispatch(saveAllGroup(allGroups));
       console.log("No groups!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };


 export const fetchSingleVideo = (videoId)=> async(dispatch)=>{


  var docRef = db.collection("courses").doc(videoId.trim());
  docRef.get().then((doc) => {
  const data = doc.data(); 
  dispatch(savelastWatchedVideo(data))
  console.log("i have dispatched the latest CURRENT VIDEO")

}).catch((error) => {
  console.log("Error getting single video:", error);
 
});


 }

 export const fetchVideoSection = (chosenSection)=> async(dispatch) =>{

  //dispatch(isItLoading(true));
  db.collection("sections")
  .where('category', '==', chosenSection)
   .get()
   .then((snapshot) => {
     const allSectionVids = snapshot.docs.map((doc) => ({ ...doc.data() }));
     const sortFunction = (array)=>{
      if (array.length){
        return  array.sort((a,b)=>(a.subLevel - b.subLevel))
       }else{
        return []
       }
     }
     
     const sortedSectionVids = sortFunction(allSectionVids)

     
   if (allSectionVids.length > 0) {
     //dispatch(isItLoading(false));
     console.log("ALL sections FROM DATABASE(FOR THIS CATEGORY):", sortedSectionVids);
     dispatch(saveCategoryVideos(sortedSectionVids));
   } else {
      // dispatch(isItLoading(false));
      dispatch(saveCategoryVideos(sortedSectionVids));
       console.log("No sections for this category!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };


 export const fetchVideoSubsection = (chosenSection,lastVideoWatched)=> async(dispatch) =>{
  //setting upNextVideo
  console.log('THE LAST VIDEO WATCHED IS::::',lastVideoWatched)

 if(!lastVideoWatched ||lastVideoWatched === undefined){

  db.collection("courses")
  .where('levelInfo.underSubLevel', '==','1.1.1')
   .get()
   .then((snapshot) => {
     const startingOpenArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (startingOpenArray.length > 0) {
     
     
     console.log("NEXT UP VIDEO IS INITIALLY:",startingOpenArray[0].uid)
     dispatch(saveNextUpVideo(startingOpenArray[0].uid));
    } else{
      console.log("WE ARE NOT ABLE TO SET STARTING OPEN ARRAY AS 1.1.1 ...WHY?")
    }})
 }

  else{
    console.log('THE LAST VIDEO WATCHED IS:->',lastVideoWatched)

  var docRef = db.collection("courses").doc(lastVideoWatched.trim());
  docRef.get().then((doc) => {
  const data = doc.data();
  
console.log("MOST RECENTLY WATCHED VIDEO'S DATA IS",data)
  
  if(data){
  const underSubLevel = data.levelInfo.underSubLevel;

  //const nextSubLevelNumber = Number(underSubLevel.replaceAll(".","")) + 1
  //const nextSubLevelString = nextSubLevelNumber.toString().replace(/.{1}/g, '$&.');
 // const finalTrimSubLevel = nextSubLevelString.slice(0,nextSubLevelString.length-1)

 const first  = underSubLevel.indexOf(".");
 const next = underSubLevel.indexOf(".", first+1);
 const last = underSubLevel.lastIndexOf(".");


 const endSubSectionNum =  Number(underSubLevel.slice(last+1,underSubLevel.length)) + 1
 const otherPart = underSubLevel.slice(0,next+1)



  const finalTrimSubLevel = otherPart + endSubSectionNum.toString()

  console.log('AFTER TRIMMING, THE NEXT SECTION IS',finalTrimSubLevel)

  db.collection("courses")
  .where('levelInfo.underSubLevel', '==', finalTrimSubLevel)
   .get()
   .then((snapshot) => {
     const nextUpArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (nextUpArray.length > 0) {
     
     console.log("next up array WHEN SETTING VIDEO SECTION IS:", nextUpArray);
     dispatch(saveNextUpVideo(nextUpArray[0].uid));
   } else {

      //do the new SUB section logic here

      const firstDecimal  = underSubLevel.indexOf(".");
      const curentSectionNumber = Number(underSubLevel.slice(0,firstDecimal)) //you didn't need to convert to number here
      const csnString = curentSectionNumber.toString() +"." 
   
      const first  = underSubLevel.indexOf(".");
      const next = underSubLevel.indexOf(".", first+1);

    const nextSectionNumber = Number(underSubLevel.slice(first+1,next)) + 1
   
    const nextSectionFirstUnderSubLevel =  csnString + nextSectionNumber.toString()  + ".1"
    console.log("next section's numbeR is---MIDDLE",nextSectionFirstUnderSubLevel)

    db.collection("courses")
  .where('levelInfo.underSubLevel', '==', nextSectionFirstUnderSubLevel)
   .get()
   .then((snapshot) => {
    const nextUpNextSectionArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
     
    if (nextUpNextSectionArray.length > 0) {
     
      console.log("next up, NEXT SECTION array WHEN SETTING VIDEO SECTION IS:", nextUpNextSectionArray);
      dispatch(saveNextUpVideo(nextUpNextSectionArray[0].uid));
    } else {

      //do the new section logic here

      const firstDot  = underSubLevel.indexOf(".");
      
      const nextChapterNumber = Number(underSubLevel.slice(0,firstDot)) + 1
     
      const nextChapterFirstUnderSubLevel = nextChapterNumber.toString() + ".1" + ".1"
      console.log("next section's number is",nextChapterFirstUnderSubLevel)
  
      db.collection("courses")
    .where('levelInfo.underSubLevel', '==', nextChapterFirstUnderSubLevel)
     .get()
     .then((snapshot) => {
      const nextUpNextChapterArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
    
      if (nextUpNextChapterArray.length > 0) {
        console.log("next up, NEXT SECTION array WHEN SETTING VIDEO SECTION IS:", nextUpNextChapterArray);
      dispatch(saveNextUpVideo(nextUpNextChapterArray[0].uid));
      }
     else{
      console.log("IT IS LIKELY THAT THERE ARE NO NEW SECTIONS, sAVE next UP video to null");
      dispatch(saveNextUpVideo(null));
     }
     })

    }

   })
     
    
     
      
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   
 });

  }else{
   console.log("THERE IS AN ID TO LOOK FOR, BUT THERE IS NO DATA RETURNING FROM THE DATABASE..WHY ? ")
  }

})

 }

  //setting upNextVideo end


  db.collection("courses")
  .where('subSection', '==', chosenSection)
   .get()
   .then((snapshot) => {
     const allSectionVids = snapshot.docs.map((doc) => ({ ...doc.data() }));

     const sortFunction = (array)=>{
      if (array.length){
        return  array.sort((a,b)=>(Number(a.levelInfo.underSubLevel.replaceAll(".","")) - Number(b.levelInfo.underSubLevel.replaceAll(".","")) ))
       }else{
        return []
       }
     }
     
     const sortedSectionVids = sortFunction(allSectionVids)
     console.log( "THE NUMBER LOOKS LIKE" ,Number(sortedSectionVids[0].levelInfo.underSubLevel.replaceAll(".","")))
   // console.log("VIDS SORTED BY SUBSECTION",sortedSectionVids)

   if (sortedSectionVids.length > 0) {
    
     console.log("SORTED FROM DATABASE:", sortedSectionVids);
     dispatch(saveSectionVideos(sortedSectionVids));
     
   } else {
      
      dispatch(saveSectionVideos(sortedSectionVids));
      
       console.log("No groups!");
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   dispatch(isItLoading(false));
 });
 };

 

export const fetchPublicGroup = () => async (dispatch) => {
 dispatch(isItLoading(true));
 db.collection("groups")
  .where("status", "==", "public")
  .get()
  .then((snapshot) => {
    const publicGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
  if (publicGroups.length) {
    dispatch(isItLoading(false));
    console.log("Public Groups Data:", publicGroups);
    dispatch(savePublicGroup(publicGroups));
  } else {
      dispatch(isItLoading(false));
      console.log("No public groups!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
  dispatch(isItLoading(false));
});
};

export const fetchPrivateGroup = () => async (dispatch) => {
    dispatch(isItLoading(true));
    db.collection("groups")
     .where("status", "==", "private")
     .get()
     .then((snapshot) => {
       const privateGroups = snapshot.docs.map((doc) => ({ ...doc.data() }));
     if (privateGroups.length) {
       dispatch(isItLoading(false));
       console.log("Private Groups Data:", privateGroups);
       dispatch(savePrivateGroup(privateGroups));
     } else {
         dispatch(isItLoading(false));
         console.log("No private groups!");
     }
   }).catch((error) => {
     console.log("Error getting document:", error);
     dispatch(isItLoading(false));
   });
   };


   export const joinGroup = (groupID, user, today, navigate, userWalletBal, groupFee, groupBal, groupName, accruedBalance) => async (dispatch) => {
    let todaysDate = new Date().toISOString().slice(0, 10) //2018-08-03
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    const date = today.toISOString();  

   
    let newUserBal = userWalletBal - groupFee;
    let newGroupBal = groupBal + groupFee;
    let newAccruedBal = accruedBalance + groupFee;
      // console.log("New Group Bal: ", newGroupBal);
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    accountBalance: newGroupBal,
    members: [...newMembers],
  }).then((res) => {
    db.collection('employees')
    .doc(user.id)
    .update({
      walletBalance: newUserBal,
      accruedBalance: newAccruedBal,
      coolers: [...user?.coolers, groupID],
    })
   .then(() => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: "",
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: user.id,
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      }).then(() => {
        return db.collection('inbox')
          .add({
              id: user.id,
              msg: `You have joined ${groupName}`,
              coolerName: groupName,
              amount: groupFee,
              isViewed: false,
              unread: 0,
              time: date,
          })
      }).then(() => {
        return db.collection('transactions')
          .add({
              userID: user.id,
              coolerID: groupID,
              type: 'Payment',
              amount: groupFee,
              date: todaysDate,
              createdAt: today.toLocaleDateString("en-US", options),
          })
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    // window.location = '/dashboard/home';
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   }) 
   })
})
 };




export const joinPublicGroup = (groupID, user, today, navigate) => async (dispatch) => {
    dispatch(isItLoading(true));
    let newMembers;
    var docRef = db.collection("groups").doc(groupID);
    docRef.get().then((doc) => {
    const data = doc.data();
    const members = data.members;
    newMembers = [...members, user.id];
}).then(() => {
  db.collection('groups')
  var userRef = db.collection("groups").doc(groupID);
  userRef.update({
    members: [...newMembers],
  }).then((res) => {
    db.collection('groups').doc(groupID).collection('membersCollection').add({
      memberName: user.firstName + " " + user.lastName,
      memberEmail: user.email,
      memberImageUrl: user.imageUrl,
      invitedBy: user.id,
      invite: 0,
      paid: 1,
      users: [user.id, user.id],
      sentAt: today,
    }).then((resp) => {
      console.log("membersCollection RESPONSE: ", resp);
      db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
        id: resp.id,
      })
  }).then(() => {
    dispatch(isItLoading(false));
    notifySuccessFxn("Joined Group")
    navigate('/dashboard/home', { replace: true });
    }).catch((error) => {
    console.log("Error joining group:", error);
    var errorMessage = error.message;
    notifyErrorFxn(errorMessage)
    dispatch(isItLoading(false));
  });
   })
})
 };

 
export const joinPrivateGroup = (groupID, user, today, navigate) => async (dispatch) => {
  dispatch(isItLoading(true));
  let newMembers;
  var docRef = db.collection("groups").doc(groupID);
  docRef.get().then((doc) => {
  const data = doc.data();
  const members = data.members;
  newMembers = [...members, user.id];
}).then(() => {
db.collection('groups')
var userRef = db.collection("groups").doc(groupID);
userRef.update({
  members: [...newMembers],
}).then((res) => {
  db.collection('groups').doc(groupID).collection('membersCollection').add({
    memberName: user.firstName + " " + user.lastName,
    memberEmail: user.email,
    memberImageUrl: user.imageUrl,
    invitedBy: user.id,
    invite: 0,
    paid: 1,
    users: [user.id, user.id],
    sentAt: today,
  }).then((resp) => {
    console.log("membersCollection RESPONSE: ", resp);
    db.collection('groups').doc(groupID).collection('membersCollection').doc(resp.id).update({
      id: resp.id,
    })
}).then(() => {
  dispatch(isItLoading(false));
  notifySuccessFxn("Joined Group")
  navigate('/dashboard/home', { replace: true });
  }).catch((error) => {
  console.log("Error joining group:", error);
  var errorMessage = error.message;
  notifyErrorFxn(errorMessage)
  dispatch(isItLoading(false));
});
 })
})
};


export const fetchGroupMembers = (groupMembers) => async (dispatch) => {
  dispatch(isItLoading(true));
  db.collection('employees')
    .where('id', 'in', groupMembers)
    .get()
    .then((snapshot) => {
      const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
      if (groupMembers.length) {
        dispatch(isItLoading(false));
        console.log('groupMembers Data:', groupMembers);
        dispatch(saveGroupMembers(groupMembers));
      } else {
        dispatch(isItLoading(false));
        console.log('No group members!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
      dispatch(isItLoading(false));
    });
};

/*========== do group fetching of categories HERE ======================= */

export const fetchAllCategories = () => async (dispatch) => {
  var categories = db.collection("categories");
  categories.get().then((snapshot) => {
    const groupMembers = snapshot.docs.map((doc) => ({ ...doc.data() }));
    console.log("ALL CATEGORIES ARE:",groupMembers)
    if (groupMembers.length) {
    dispatch(saveCategories(groupMembers));
  } else {
      console.log("No categories in database!");
  }
}).catch((error) => {
  console.log("Error getting categories:", error);
});
//return user;
};


/*===============do fetching of categories ABOVE ===================== */

export const updateCurrentlyWatchingOnly = (userId,videoId) => async (dispatch) => {


     //update user watchlist
  db.collection("users").doc(userId).update({
    currentlyWatching:firebase.firestore.FieldValue.arrayUnion(videoId)
  }).then((docRef) => {
    console.log("user Document updated is: ", docRef);
  
    //refreshing users watched column manually
    var user = db.collection("users").doc(userId);
    user.get().then((doc) => {
    if (doc.exists) {
      
      dispatch(storeUserData(doc.data()));
    } 
  })
  //refreshing users watched column manually- END
   
  })
  .catch((error) => {
    console.error("Error adding video  to USER watch List: ", error);
    notifyErrorFxn("Error adding video  to USER watch List")
    
  });
}


/*===============Add to video watchlist and user watchlict BELOW ===================== */


export const updateVideoAndUserWatchlists = (userId,videoId,underSubLevel) => async (dispatch) => {
  console.log('about to add title',videoId.trim())

  const first  = underSubLevel.indexOf(".");
  const next = underSubLevel.indexOf(".", first+1);
  const last = underSubLevel.lastIndexOf(".");

   const endSubSectionNum =  Number(underSubLevel.slice(last+1,underSubLevel.length)) + 1
   


   const otherPart = underSubLevel.slice(0,next+1)
  

   const finalSubLevel = otherPart + endSubSectionNum.toString()

   console.log('AFTER TRIMMING, THE NEXT SECTION TO get',finalSubLevel)
  
  //const nextSubLevelNumber = Number(underSubLevel.replaceAll(".","")) + 1
  //const nextSubLevelString = nextSubLevelNumber.toString().replace(/.{1}/g, '$&.');
  //const finalSubLevel = nextSubLevelString.slice(0,nextSubLevelString.length-1)

  //update currently watched on dashboard screen
   dispatch(fetchSingleVideo(videoId.trim()))



   //update course takers array
  db.collection("courses").doc(videoId.trim()).update({
    watched:firebase.firestore.FieldValue.arrayUnion(userId)
  }).then((docRef) => {
    console.log(" course Document updated is: ", docRef);
   
  })
  .catch((error) => {
    console.error("Error adding USER to  VIDEO watch List: ", error);
    notifyErrorFxn("Error adding USER to  VIDEO watch List: ")
    
  });





  //update user watchlist
  db.collection("users").doc(userId).update({
  watched:firebase.firestore.FieldValue.arrayUnion(videoId),
  currentlyWatching:firebase.firestore.FieldValue.arrayUnion(videoId)
}).then((docRef) => {
  console.log("user Document updated is: ", docRef);

  //refreshing users watched column manually
  var user = db.collection("users").doc(userId);
  user.get().then((doc) => {
  if (doc.exists) {
    
    dispatch(storeUserData(doc.data()));
  } 
})
//refreshing users watched column manually- END
  
  
})
.catch((error) => {
  console.error("Error adding video  to USER watch List: ", error);
  //notifyErrorFxn("Error adding video  to USER watch List")
  
});


//update next viewable video
db.collection("courses")
  .where('levelInfo.underSubLevel', '==', finalSubLevel)
   .get()
   .then((snapshot) => {
     const nextUpArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (nextUpArray.length > 0) {

   
     console.log("next up array items consists of:", nextUpArray);
     dispatch(saveNextUpVideo(nextUpArray[0].uid));

     //updatingCurrentLevel START
     db.collection("users").doc(userId).update({
     
      currentLevel:finalSubLevel
      
    }).then((docRef) => {
      console.log("user Document updated is: ", docRef);
    
      //refreshing users watched column manually
      var user = db.collection("users").doc(userId);
      user.get().then((doc) => {
      if (doc.exists) {
        
        dispatch(storeUserData(doc.data()));
       
      } 
    })
    //refreshing users watched column manually- END
      
      
    })
    //updatingCurrentLevel END

   } else {
      //do the new SUB section logic here

      const firstDecimal  = underSubLevel.indexOf(".");
      const curentSectionNumber = Number(underSubLevel.slice(0,firstDecimal)) //you didn't need to convert to number here
      const csnString = curentSectionNumber.toString() +"." 
   
      const first  = underSubLevel.indexOf(".");
      const next = underSubLevel.indexOf(".", first+1);

    const nextSectionNumber = Number(underSubLevel.slice(first+1,next)) + 1
   
    const nextSectionFirstUnderSubLevel =  csnString + nextSectionNumber.toString()  + ".1"
    console.log("next section's number is---WITHIN SECTIONS O!",nextSectionFirstUnderSubLevel)

    db.collection("courses")
  .where('levelInfo.underSubLevel', '==', nextSectionFirstUnderSubLevel)
   .get()
   .then((snapshot) => {
    const nextUpNextSectionArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
     
    if (nextUpNextSectionArray.length > 0) {



     
      console.log("next up, NEXT SECTION array WHEN SETTING VIDEO SECTION IS:", nextUpNextSectionArray);


      db.collection("users").doc(userId).update({
        currentLevel:nextSectionFirstUnderSubLevel
        
      }).then((docRef) => {
        console.log("user Document updated is: ", docRef);
      
        //refreshing users watched column manually
        var user = db.collection("users").doc(userId);
        user.get().then((doc) => {
        if (doc.exists) {
          
          dispatch(storeUserData(doc.data()));
        
        } 
      })
      //refreshing users watched column manually- END
        
        
      })

      dispatch(saveNextUpVideo(nextUpNextSectionArray[0].uid));
    } else {

      //do the new section logic here


  


      const firstDot  = underSubLevel.indexOf(".");
      
      const nextChapterNumber = Number(underSubLevel.slice(0,firstDot)) + 1
     
      const nextChapterFirstUnderSubLevel = nextChapterNumber.toString() + ".1" + ".1"
      console.log("next section's number is",nextChapterFirstUnderSubLevel)
  
      db.collection("courses")
    .where('levelInfo.underSubLevel', '==', nextChapterFirstUnderSubLevel)
     .get()
     .then((snapshot) => {
      const nextUpNextChapterArray = snapshot.docs.map((doc) => ({ ...doc.data() }));
    
      if (nextUpNextChapterArray.length > 0) {
        console.log("next up, NEXT SECTION array WHEN SETTING VIDEO SECTION IS:", nextUpNextChapterArray);
      dispatch(saveNextUpVideo(nextUpNextChapterArray[0].uid));

              //UPDATE OF USER BADGES !   
  db.collection("users").doc(userId).update({
    badgesEarned:Number(underSubLevel.slice(0,firstDot)),
    currentLevel:nextChapterFirstUnderSubLevel
    
  }).then((docRef) => {
    console.log("user Document updated is: ", docRef);
  
    //refreshing users watched column manually
    var user = db.collection("users").doc(userId);
    user.get().then((doc) => {
    if (doc.exists) {
      
      dispatch(storeUserData(doc.data()));
      notifySuccessFxn("Congrats,You have completed the entire section and earned a new badge! 🏆")
    } 
  })
  //refreshing users watched column manually- END
    
    
  })
  .catch((error) => {
    console.error("Error adding video  to BADGE LEVEL TO USER: ", error);
     
  });
  //UPDATE OF BADGES END 
      }
     else{
      console.log("IT IS LIKELY THAT THERE ARE NO NEW SECTIONS, sAVE next UP video to null");
      dispatch(saveNextUpVideo(null));

              //UPDATE OF USER BADGES !   
  db.collection("users").doc(userId).update({
    badgesEarned:Number(underSubLevel.slice(0,firstDot)) + 1,
   
  }).then((docRef) => {
    console.log("user Document updated is: ", docRef);
  
    //refreshing users watched column manually
    var user = db.collection("users").doc(userId);
    user.get().then((doc) => {
    if (doc.exists) {
      
      dispatch(storeUserData(doc.data()));
      notifySuccessFxn("Congrats,You have completed the entire section and earned a new badge! 🏆")
    } 
  })
  //refreshing users watched column manually- END
    
    
  })
  .catch((error) => {
    console.error("Error adding video  to BADGE LEVEL TO USER: ", error);
     
  });
  //UPDATE OF BADGES END 


     }
     })

    }

   })
     
    
     
   }
 }).catch((error) => {
   console.log("Error getting document:", error);
   
 });


}

/*===============Add to video watchlist and user watchlict ABOVE ===================== */


export const fetchEmployeer = (id) => async (dispatch) => {
  var user = db.collection("employers").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    dispatch(saveEmployeer(doc.data()));
  } else {
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};

export const addNewBadge = (userId,currentLevel) => async (dispatch)=>{

  
   console.log("user's current level is",currentLevel)


  const firstDot  = currentLevel.indexOf(".");   
  const badgeNumber =Number(currentLevel.slice(0,firstDot))-1
  console.log("BADGE NUMBER VARIABLE IS- ",badgeNumber)


  
  //UPDATE OF USER BADGES !  
  if(badgeNumber <5){  // I HARDCODED THIS TO BE LESS THAN 5 CUZ WHEN WE REACH 5, WE DONT KNOW WHEN TO ASSIGN THE FIFTH BADGE FROM THE PARAMETERS GIVEN SO FAR
  db.collection("users").doc(userId).update({
    badgesEarned:badgeNumber,
  
  }).then((docRef) => {
    console.log("user Document updated is: ", docRef);
  
    //refreshing users watched column manually
    var user = db.collection("users").doc(userId);
    user.get().then((doc) => {
    if (doc.exists) {
      
      dispatch(storeUserData(doc.data()));
    } 
  })
  //refreshing users watched column manually- END
    
    
  })
  .catch((error) => {
    console.error("Error adding video  to BADGE LEVEL TO USER: ", error);
     
  });
}
  //UPDATE OF BADGES END 


}