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
 const { cart,cartToProcess } = useSelector((state) => state.cart);
 const navigate = useNavigate();
 const dispatch = useDispatch();


 useEffect(() => {
 // const cartToSubmit = {courses:cart,affiliateId:user &&user.affiliate}
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const token = urlParams.get('token');
    const userId= urlParams.get('user');

    const payToken= urlParams.get('pto');
    const orderId= urlParams.get('oid');
   // const cart_data = urlParams.get('cart_data');

   // console.log("token is --> ",token)
   // console.log("userId is -->",userId)
  
   console.log("PAY TOKEN is -->",payToken)
   console.log("ORDER ID is -->",orderId)
  
    const getCartToProcess = ()=>{

      dispatch(fetchCartToProcessFromUser(userId))

    }

    

    const validateToken = (token) => {
      const expectedToken = 'AHIPS2893';
      return token === expectedToken;
    };

    
    const isValidToken = validateToken(token);

    if (status === 'success' && isValidToken) {

  console.log("I HAVE REACHED THE CALLBACK PAGE---> ")

      dispatch(fetchCartToProcessFromUser(userId)).then(()=>{ 
   
           console.log("I HAVE STEPPED PAST THE FUNCTION FOR FETCHING CART NOW---> ")
     
       
     
         const cartObject = cartToProcess && cartToProcess;
         console.log("CART OBJECT ------>",cartObject)
     
         const courseIdArray =cartObject &&  cartObject.courses.map((item)=>(item.id))
         let today = new Date().toLocaleDateString();
       
         console.log("COURSE ID ARRAY IS----->",courseIdArray)
        
     
         dispatch(buyCourse(cartObject, userId, today, navigate));
          dispatch(buyCourseUpdateUser(courseIdArray, user.uid, today, navigate));

    })  

    }else{
        notifyErrorFxn("Payment was not successful");
        navigate('/dashboard/my-cart');
    }
    setLoading(false);
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