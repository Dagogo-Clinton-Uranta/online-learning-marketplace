import { CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse, buyCourseUpdateUser } from 'src/redux/actions/cart.action';
import { useNavigate } from 'react-router-dom';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import * as uuid from 'uuid';

const PaymentCallBackPage = () => {
 const [loading, setLoading] = useState(true);
 const { user } = useSelector((state) => state.auth);
 const { cart } = useSelector((state) => state.cart);
 const navigate = useNavigate();
 const dispatch = useDispatch();

 window.dataLayer = window.dataLayer || [];
 function gtag(){window.dataLayer.push(arguments);}
 gtag('js', new Date());

 gtag('config', 'G-EY9BN9TW8S',{ 'debug_mode': true });

 const totalPrice = cart.reduce((acc, item) => {
  const itemPrice = parseFloat(item.price && item.price.replace(',', ''));
  return acc + itemPrice;
}, 0);


const generateOrderId = uuid.v4()

 useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const cart_data = urlParams.get("cart_data"); 


  if (cart_data) {
      const cartObject = JSON.parse(cart_data);

      //console.log("CART DATA PARSED --->",JSON.parse(cart_data))
     
      let today = new Date().toDateString();
      dispatch(buyCourse(cartObject,user &&  user.uid, today, navigate));
      
      const courseIdArray = cartObject && cartObject.courses &&  cartObject.courses.map((item)=>(item.id))
     if(courseIdArray){ dispatch(buyCourseUpdateUser(courseIdArray,user && user.uid, today, navigate));}



     gtag("event", "purchase", {
      // This purchase event uses a different transaction ID
      // from the previous purchase event so Analytics
      // doesn't deduplicate the events.
      // Learn more: https://support.google.com/analytics/answer/12313109
      fullName:user && user.fullName,
      telephone:user && user.telephone,
      transaction_id: `${generateOrderId}`,
      value: totalPrice,
      tax: 0,
      shipping: 0,
      currency: "GNF",
      coupon: "n/a",
      affiliateId:user &&user.affiliate?user.affiliate:"none",
      items: [
        ...(cartObject.courses.map((item)=>(
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
  
     notifyErrorFxn("NO CART DATA _ THIS IS A TESTING NOTIFICATION")


  }
  setLoading(false);

 // setTimeout(()=>{navigate('/dashboard/home')},4500)


}, []);


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

export default PaymentCallBackPage


// http://localhost:3000/dashboard/payment-callback?cart_data=%7B%22courses%22%3A%5B%7B%22id%22%3A%223TgAn3AIYfaHahJ3afLb%22%2C%22title%22%3A%22G%C3%A9ographie+6%C3%A8me%22%2C%22price%22%3A%22500%22%7D%5D%2C%22affiliateId%22%3A%22n%2Fa%22%7D&c=MjcyMDQxNzM&paycard-description=Course+sale&paycard-auto-redirect=on&paycard-redirect-with-get=on&paycard-amount=500&paycard-callback-url=https%3A%2F%2Fbonecole.com%2Fdashboard%2Fpayment-callback&transactionReference=2403-HZPTWY&montant=500&c=MjcyMDQxNzM&paycard-operation-reference=2403-ZO5X1BKC01&paycardAmount=500&paycardCardNumber=***+***+782&paycardAccountName=undefined&paycardTransactionDescription=Paiement+PayCard+de+performance+plus+performance+plus+%5B+***+***+782+%5D&paycardTransactionDate=13%2F03%2F2024+17%3A13&paycardPaymentMethod=paycard&otvRequestId=
//THE COMMENTED CODE ABOVE HELPS ME TEST THIS CALLBACK PAGE ON A LOCAL SERVER BY PASTING IT IN THE BROWSER