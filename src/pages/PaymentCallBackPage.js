import { CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse, buyCourseUpdateUser } from 'src/redux/actions/cart.action';
import { useNavigate } from 'react-router-dom';
import { notifyErrorFxn } from 'src/utils/toast-fxn';


const PaymentCallBackPage = () => {
 const [loading, setLoading] = useState(true);
 const { user } = useSelector((state) => state.auth);
 const navigate = useNavigate();
 const dispatch = useDispatch();

 useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const cart_data = urlParams.get("cart_data"); 


  if (cart_data) {
      const cartObject = JSON.parse(cart_data);
     
      let today = new Date().toLocaleDateString();
      dispatch(buyCourse(cartObject, user.uid, today, navigate));
      
      const courseIdArray = cartObject.map((item)=>(item.id))
      dispatch(buyCourseUpdateUser(courseIdArray, user.uid, today, navigate));
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