import { CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse, buyCourseUpdateUser, fetchCartToProcessFromUser } from 'src/redux/actions/cart.action';
import { useNavigate } from 'react-router-dom';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import lzjs from 'lzjs';


const PaymentCallBackPageOM = () => {
 const [loading, setLoading] = useState(true);
 const { user } = useSelector((state) => state.auth);
 const { cart,cartToProcess,mostRecentOrderAmount,mostRecentPayToken} = useSelector((state) => state.cart);
 const navigate = useNavigate();
 const dispatch = useDispatch();


 //const orangeTranactionUrl = 'http://localhost:5008/api/om/get-token';
 // const orangeTransactionUrl = 'http://localhost:5008/api/om/webpayment';
 const orangeTranactionUrl = 'https://boncole-server-2.vercel.app/api/om/get-token';
 const orangeTransactionUrl = 'https://boncole-server-2.vercel.app/api/om/webpayment';



 useEffect(() => {
 
    const urlParams = new URLSearchParams(window.location.search);
    const userId= urlParams.get('user');
    const orderId= urlParams.get('oid');

   // const cart_data = urlParams.get('cart_data');

   // console.log("userId is -->",userId)
  

   /* const validateToken = (token) => {
      const expectedToken = 'AHIPS2893';
      return token === expectedToken;
    };

    
    const isValidToken = validateToken(token);*/


  console.log("I HAVE REACHED THE CALLBACK PAGE, NOW I WAIT FOR 2 SECONDS---> ")


  setTimeout(()=>{  
      dispatch(fetchCartToProcessFromUser(userId)).then(()=>{ 
   
           console.log("I HAVE STEPPED PAST THE FUNCTION FOR FETCHING CART and PAY TOKEN NOW---> ")
     
           const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',  
           };
           
       axios.post(orangeMTokenUrl, {}, { headers })
        .then(response => {
            const access_token = response.data.access_token;
          
           axios.post(orangeTransactionUrl, {
            amount: mostRecentOrderAmount,
            order_id: orderId,
            payToken:mostRecentPayToken,
            orangeMToken: access_token
          }).then((res) => {
              console.log("LOOK HERE FOR INITIATED --->", res.data);
              if (res.data.status && res.data.status === 'SUCCESS' ) {
               
                const courseIdArray =cartObject &&  cartObject.courses.map((item)=>(item.id))
                let today = new Date().toLocaleDateString();
              
                console.log("COURSE ID ARRAY IS----->",courseIdArray)
               
            
                dispatch(buyCourse(cartObject, userId, today, navigate));
                 dispatch(buyCourseUpdateUser(courseIdArray, user.uid, today, navigate));
                
      

              }else{
                console.log("Res", res);
                notifyErrorFxn("PAYMENT STATUS IS NOT SUCCESS,SO NO COURSES WERE ADDED TO PURCHASED COURSES!");  
              }
          }).catch((error) => {
           
            console.error('could not get transaction status, so this page failed:', error);
            notifyErrorFxn('could not get transaction status, so this page failed...');
          })
        }).catch(error => {
           
            notifyErrorFxn('Failed to get token');
        });
          
        

    })  

  },2000)
   
  }, [dispatch, navigate]);




  return (
    <div> <CircularProgress
    size="50px"
    style={{
      position: 'absolute',
      top: '42%',
      left: '47%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
      color: '#CC4436',
    }}
  /></div>
  )
}

export default PaymentCallBackPageOM