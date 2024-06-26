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



  //const orangeTransactionUrl = 'http://localhost:5008/api/om/transaction'; <-- switch to this url when testing locally is involved
 const orangeTransactionUrl = 'https://vercel-code-14me.vercel.app/api/om/transaction';


 //const orangeMTokenUrl = 'http://localhost:5008/api/om/get-token'; <-- switch to this url when testing locally is involved
 // const orangeMPaymentUrl = 'http://localhost:5008/api/om/webpayment'; <-- switch to this url when testing locally is involved
  const orangeMTokenUrl = 'https://vercel-code-14me.vercel.app/api/om/get-token';
  const orangeMPaymentUrl = 'https://vercel-code-14me.vercel.app/api/om/webpayment';
 

  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EY9BN9TW8S',{ 'debug_mode': true });



 useEffect(() => {
 
    const urlParams = new URLSearchParams(window.location.search);
    const userId= urlParams.get('user');
    //const orderId= urlParams.get('oid'); ---> NOT USING THIS FOR NOW, BUT IT'S POSSIBLE IT CAN BE USED IT LATER


  setTimeout(()=>{  
      dispatch(fetchCartToProcessFromUser(userId)).then(()=>{ 
   
          
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
            
              if (res.data.status && res.data.status === 'SUCCESS' ) {
                
                const cartObject = cartToProcess
                const courseIdArray =cartObject &&  cartObject.courses.map((item)=>(item.id))
                let today = new Date().toDateString();
              
               
               
                dispatch(buyCourseUpdateUser(courseIdArray, user.uid, today, navigate))
                dispatch(buyCourse(cartObject, userId, today, navigate,res.data.txnid,res.data.order_id))/*.then(()=>{*/
                 setTimeout( dispatch(clearPayTokenFromDatabase(userId)),1800)
                /*})*/
                
                gtag("event", "purchase", {
                  // This purchase event uses a different transaction ID
                  // from the previous purchase event, so Analytics
                  // doesn't deduplicate the events.
                  // Learn more: https://support.google.com/analytics/answer/12313109
                  fullName:user && user.fullName,
                   telephone:user && user.telephone,
                  transaction_id: mostRecentOrderId,
                  value: mostRecentOrderAmount,
                  tax: 0,
                  shipping: 0,
                  currency: "GNF",
                  coupon: "n/a",
                  affiliateId:user &&user.affiliate?user.affiliate:"none",
                  items: [
                    ...(cart.map((item)=>(
                      {
                          packLead:item.packLead?item.packLead:false,
                          price:item.price,
                          packId:item.packId?item.packId:null,
                          item_id:item.id,
                          item_name:item.title,
                          coursepack_name:item.packName?item.packName:null,

                      }
                    ))
                     )
                  ]
            }); 
      

              }else{
                
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