import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Grid, TextField, Typography, IconButton, Button } from '@mui/material';
import { ArrowForward, Cancel } from '@material-ui/icons';
import { buyCourse, buyCourseUpdateUser, clearPayTokenFromDatabase, fetchCartToProcessFromUser, fetchPurchasedCourse } from '../redux/actions/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentSubjectFromDB, fetchSubjectChapters } from 'src/redux/actions/main.action';
import { useNavigate } from 'react-router-dom';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import axios from 'axios';

const PurchasedCoursePage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const { purchasedCourses } = useSelector((state) => state.cart);
  const { cart,cartToProcess,mostRecentOrderAmount,mostRecentOrderId,mostRecentPayToken} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //console.log("purchased courses",purchasedCourses)

    //const orangeTransactionUrl = 'http://localhost:5008/api/om/transaction';
    const orangeTransactionUrl = 'https://vercel-code-14me.vercel.app/api/om/transaction';


    //const orangeMTokenUrl = 'http://localhost:5008/api/om/get-token';
    // const orangeMPaymentUrl = 'http://localhost:5008/api/om/webpayment';
     const orangeMTokenUrl = 'https://vercel-code-14me.vercel.app/api/om/get-token';
     const orangeMPaymentUrl = 'https://vercel-code-14me.vercel.app/api/om/webpayment';
    

  const [loading,setLoading] = useState(false)

  const modifiedPurchasedCourses = purchasedCourses.reduce((acc, cur) => acc.concat(cur.courses), []);
  


  //console.log("MODIFIED purchased courses-->",modifiedPurchasedCourses)


  useEffect(()=>{
      if(!user){
       navigate('/external-login')
      }
 
   },[])
 

  useEffect(() => {
    //notifyErrorFxn("PURCHASED COURSES PAGE IS REACHED")
    dispatch(fetchPurchasedCourse(user?.uid ?? user?.id));
  }, []);



  /*TO PAY FOR ORANGE*/
useEffect(()=>{


  if(user && user.mostRecentPayToken && user.mostRecentPayToken.length){
    let userId = user && user.uid
  
  
    dispatch(fetchCartToProcessFromUser(userId)).then(()=>{ 
     
      //console.log("I HAVE STEPPED PAST THE FUNCTION FOR FETCHING CART and PAY TOKEN NOW---> ")
      
  
      const headers = {
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',  
      };
      
  axios.post(orangeMTokenUrl, {}, { headers })
   .then(response => {
       const access_token = response.data.access_token;
     
      axios.post(orangeTransactionUrl, {
       amount: mostRecentOrderAmount,
       order_id: mostRecentOrderId,
       payToken:mostRecentPayToken,
       orangeMToken: access_token
     }).then((res) => {
      
         //console.log("LOOK HERE FOR INITIATED --->", res.data);
         if (res.data.status && res.data.status === 'SUCCESS' ) {
           
           const cartObject = cartToProcess
           const courseIdArray =cartObject &&  cartObject.courses.map((item)=>(item.id))
           let today = new Date().toDateString();
         
           //console.log("COURSE ID ARRAY IS----->",courseIdArray)
          
           dispatch(buyCourseUpdateUser(courseIdArray, user.uid, today, navigate))
           dispatch(buyCourse(cartObject, userId, today, navigate,res.data.txnid,res.data.order_id)).then(()=>{
             dispatch(clearPayTokenFromDatabase(userId))
           })
           
            
  
  
         }else{
           //console.log("Res", res.data);
           //console.log("AT THE HOME PAGE, MOST RECENT ORANGE PAYMENT NOT SUCCESSFUL");  
           
         }
     }).catch((error) => {
      
       console.error('could not get transaction status, so this page failed:', error);
      
     })
   }).catch(error => {
      
       notifyErrorFxn('Failed to get token');
   });
     
   
  
  })  
  
  
  }
  
  },[])
  
  /*TO PAY FOR ORANGE -- END*/


  const fetchChapters =(subjectId) =>{
     //console.log('THE ID I GOT IS---->',subjectId)
    dispatch(fetchSubjectChapters(subjectId))
    dispatch(fetchCurrentSubjectFromDB(subjectId))

    setTimeout(()=>{( navigate('/dashboard/selected-course'))},2500)
  }

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: 'white', border: '1px solid lightgray', fontSize: '0.85rem', minHeight: '500px' }}
    >
      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '1rem' }}
      >
        <center>
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              borderBottom: '3px solid red',
              width: '150px',
              marginTop: '20px',
            }}
          >
            Cours achetés
          </p>
        </center>
      </Grid>

      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
        {modifiedPurchasedCourses?.map((item, index) => (
          <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '10px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '3px solid black',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {item && item.title}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton>
                  {loading?<p style={{fontSize:"12px"}}>loading...</p>:
                  <ArrowForward  onClick={()=>{fetchChapters(item.id)}}/>
                  }
                </IconButton>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <br />
      <br />
      <br />
    </Container>
  );
};
export default PurchasedCoursePage;
