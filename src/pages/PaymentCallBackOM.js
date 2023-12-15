import { CircularProgress } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse, buyCourseUpdateUser } from 'src/redux/actions/cart.action';
import { useNavigate } from 'react-router-dom';
import { notifyErrorFxn } from 'src/utils/toast-fxn';


const PaymentCallBackPageOM = () => {
 const [loading, setLoading] = useState(true);
 const { user } = useSelector((state) => state.auth);
 const { cart } = useSelector((state) => state.cart);
 const navigate = useNavigate();
 const dispatch = useDispatch();


 useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const token = urlParams.get('token');

    const isValidToken = validateToken(token);

    if (status === 'success' && isValidToken) {
    const courseIdArray = cart.map((item)=>(item.id))
    let today = new Date().toLocaleDateString();
    dispatch(buyCourse(cart, user.uid, today, navigate));
    // dispatch(buyCourseUpdateUser(courseIdArray, user.uid, today, navigate));
    }else{
        notifyErrorFxn("Payment was not successful");
        navigate('/dashboard/my-cart');
    }
    setLoading(false);
  }, [dispatch, navigate, user.uid]);



  const validateToken = (token) => {
    const expectedToken = 'AHIPS2893';
    return token === expectedToken;
  };




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