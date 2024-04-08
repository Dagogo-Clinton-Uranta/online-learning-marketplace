import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useEffect,useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import profileImg from 'src/assets/images/randomwoman2.jpg'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';
import {FaCaretDown} from 'react-icons/fa'
import CircularProgress from '@mui/material/CircularProgress';

import {updateProfile} from 'src/redux/actions/group.action';
import {logout} from 'src/redux/actions/auth.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';


function ProfilePage() {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
 

  const { user,error,registeredWithSocials } = useSelector((state) => state.auth);
//console.log("registered with socials is",registeredWithSocials)


useEffect(()=>{
   if(!user){
    navigate('/login')
   }

   dispatch(logout(navigate))
  
},[])


const [telephone,setTelephone] = useState(user && user.telephone?user.telephone:"")
const [pvExamen,setPvExamen] = useState(user && user.pvExamen?user.pvExamen:"")
const [classes,setClasses] = useState(user && user.classOption?user.classOption:"")
const [school,setSchool] = useState(user && user.schoolOrigin?user.schoolOrigin:"")
const [fullName,setFullName] = useState(user && user.fullName?user.fullName:"")
const [facebook,setFacebook] = useState(user && user.fullName?user.fullName:"")

const updateObject = {
  telephone,
  pvExamen,
  classes,
  school,
  fullName,
  facebook,
}




  return (
    <>
    <center style={{position:"absolute",top:"50%",left:"50%"}}> <CircularProgress/> </center>
    </>
  );
}

export default ProfilePage;