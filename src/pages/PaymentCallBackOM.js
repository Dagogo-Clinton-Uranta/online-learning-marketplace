import { CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse, buyCourseUpdateUser, clearPayTokenFromDatabase, fetchCartToProcessFromUser } from 'src/redux/actions/cart.action';
import { useNavigate } from 'react-router-dom';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import lzjs from 'lzjs';
import axios from 'axios';


const PaymentCallBackPageOM = () => {
 const [loading, setLoading] = useState(true);
 const { user } = useSelector((state) => state.auth);
 const { cart,cartToProcess,mostRecentOrderAmount,mostRecentOrderId,mostRecentPayToken} = useSelector((state) => state.cart);
 const navigate = useNavigate();
 const dispatch = useDispatch();



  //const orangeTransactionUrl = 'http://localhost:5008/api/om/transaction';
 const orangeTransactionUrl = 'https://boncole-server-2.vercel.app/api/om/transaction';


 //const orangeMTokenUrl = 'http://localhost:5008/api/om/get-token';
 // const orangeMPaymentUrl = 'http://localhost:5008/api/om/webpayment';
  const orangeMTokenUrl = 'https://boncole-server-2.vercel.app/api/om/get-token';
  const orangeMPaymentUrl = 'https://boncole-server-2.vercel.app/api/om/webpayment';
 

  console.log("TEST 1 --->");



 useEffect(() => {
 
    const urlParams = new URLSearchParams(window.location.search);
    const userId= urlParams.get('user');
    //const orderId= urlParams.get('oid'); ---> I AM NOT USING THIS FOR NOW, BUT IT'S POSSIBLE I USE IT LATER

   // const cart_data = urlParams.get('cart_data');

   // console.log("userId is -->",userId)
  

   /* const validateToken = (token) => {
      const expectedToken = 'AHIPS2893';
      return token === expectedToken;
    };

    
    const isValidToken = validateToken(token);*/


  console.log("I HAVE REACHED THE CALLBACK PAGE, NOW I WAIT FOR 2 SECONDS---> ")
  console.log("TEST 2 --->");

  setTimeout(()=>{  
      dispatch(fetchCartToProcessFromUser(userId)).then(()=>{ 
   
           console.log("I HAVE STEPPED PAST THE FUNCTION FOR FETCHING CART and PAY TOKEN NOW---> ")
           console.log("TEST 3 --->");

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
            console.log("TEST 4 --->");
              console.log("LOOK HERE FOR INITIATED --->", res.data);
              if (res.data.status && res.data.status === 'SUCCESS' ) {
                
                const cartObject = cartToProcess
                const courseIdArray =cartObject &&  cartObject.courses.map((item)=>(item.id))
                let today = new Date().toLocaleDateString();
              
                console.log("COURSE ID ARRAY IS----->",courseIdArray)
               
                dispatch(buyCourseUpdateUser(courseIdArray, user.uid, today, navigate))
                dispatch(buyCourse(cartObject, userId, today, navigate,res.data.txnid,res.data.order_id))/*.then(()=>{*/
                 setTimeout( dispatch(clearPayTokenFromDatabase(userId)),1800)
                /*})*/
                
                 
      

              }else{
                console.log("Res", res);
                notifyErrorFxn("PAYMENT NOT SUCCESSFUL");  
                navigate('/dashboard/payment-options')
              }
          }).catch((error) => {
           
            console.error('could not get transaction status, so this page failed:', error);
            notifyErrorFxn('ERROR TRACKING THE MOST RECENT TRANSACATION...');
          })
        }).catch(error => {
           
            notifyErrorFxn('Failed to get token');
        });
          
        

    })  

  },3200)
   
  }, [dispatch, navigate,mostRecentOrderAmount,mostRecentOrderId,mostRecentPayToken]);




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