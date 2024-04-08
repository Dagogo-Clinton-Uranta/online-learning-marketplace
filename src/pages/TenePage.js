import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { useRef, useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UPLOADIMG from '../assets/images/upload.png';
import bonecoleIntro from 'src/assets/images/bonecoleIntro.png'
import bonLogo from 'src/assets/images/bonlogo.png'
import startQuote from 'src/assets/images/startQuote.png'
import endQuote from 'src/assets/images/endQuote.png'
import math from 'src/assets/images/math.jpeg'
import MathCover from 'src/assets/images/mathcover.jpeg'
import library from 'src/assets/images/library.jpeg'
import DNA  from 'src/assets/images/DNA.jpeg'

import chem from 'src/assets/images/chembeak.jpeg'
import chem2 from 'src/assets/images/chem2.jpeg'
import biology from 'src/assets/images/biology.jpeg'
import english from 'src/assets/images/english.jpeg'
import philosophy from 'src/assets/images/philoslib.jpeg'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';

import { fetchCategoryPacks, fetchCategorySubjects,fetchPackSubjects ,fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import users from 'src/_mock/user';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import SmallerCardPage from './SmallerCardPage';
import SampleCardPage from './SampleCardPage';
import { addToCart } from 'src/redux/reducers/cart.slice';

import a1 from 'src/assets/images/1.jpeg'
import a2 from 'src/assets/images/2.jpeg'
import a3 from 'src/assets/images/3.jpeg'
import a4 from 'src/assets/images/4.jpeg'
import a5 from 'src/assets/images/5.jpeg'
import a6 from 'src/assets/images/6.jpeg'
import a7 from 'src/assets/images/7.jpeg'
import a8 from 'src/assets/images/8.png'
import a9 from 'src/assets/images/9.jpeg'
import a10 from 'src/assets/images/10.jpeg'

function TenePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [chosen,setChosen] = useState(1);

  const { user } = useSelector((state) => state.auth);
  const {packSubjects} = useSelector((state) => state.group);
  const { presentSubject } = useSelector((state) => state.group);
  const { cart } = useSelector((state) => state.cart);

   /*GOOGLE TAG MANAGER PREP FOR ADDING TO CART */
   window.dataLayer = window.dataLayer || [];
   function gtag(){window.dataLayer.push(arguments);}
   gtag('js', new Date());
  
   gtag('config', 'G-EY9BN9TW8S',{ 'debug_mode': true });
 /*GOOGLE TAG MANAGER PREP FOR ADDING TO CART - END*/

  useEffect(()=>{
   if(!user){
      navigate('/external-login')
     }


  },[])


   const oldTopics = [
    {title:"Chemie 10e Annee ",author:"Sidiki Keita",price:"22,000",lessons:14,time:"2H 26 MINS",image:chem},
    {title:"Anglais 10e Annee ",author:"Kabinet Keita",price:"29,000",lessons:15,time:"4H 26 MINS",image:english},
    {title:"Biologie 10e Annee ",author:"Elhadj Keita",price:"28,000",lessons:16,time:"5H 26 MINS",image:biology},
    {title:"Philosophie 10e Annee",author:"Sidiki Keita",price:"30,000",lessons:15,time:"5H 16 MINS",image:philosophy },
    {title:"Mathematiques 10e Annee",author:"Fode Keita",price:"28,000",lessons:14,time:"4H 11 MINS",image:math},
    {title:"Chemie 10e Annee",author:"Sidiki Keita",price:"29,000",lessons:13,time:"3H 26 MINS",image:chem},
    {image:chem2},
    {image:DNA},
    {image:MathCover},
    {image:library},
    {image:a1},
    {image:a2},
    {image:a3},
    {image:a4},
    {image:a5},
    {image:a6},
    {image:a7},
    {image:a8},
    {image:a9},
    {image:a10},
  ]

//console.log("PRESENT SUBJECT--->", presentSubject)
//console.log("PACK SUBJECTS--->", packSubjects)

const addToCartFxn = () => {
  

  let cartItems = presentSubject?.title.substring(0,4) ==="Pack" ?
  
  [...cart,{ id: presentSubject?.uid, title: presentSubject?.title, price: presentSubject?.price,packLead:true }]

  : [...cart,{ id: presentSubject?.uid, title: presentSubject?.title, price: presentSubject?.price }]
  
  packSubjects.forEach((item)=>{
   cartItems = [ ...cartItems,{ id: item?.uid, title: item?.title,price:0, packId: presentSubject?.uid, packName: presentSubject?.title} ]
  })


  const isItemInCart = cart.filter((item)=>(item.packId)).some((item) => item.packId === cartItems[0].packId);

  if (isItemInCart) {
    notifyErrorFxn('Pack is already in the cart');
  } else {
    dispatch(addToCart(cartItems));


    const totalPrice = cartItems.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price && item.price.replace(',', ''));
      return acc + itemPrice;
    }, 0);

 
    gtag("event", "add_to_cart", {
      // This purchase event uses a different transaction ID
      // from the previous purchase event so Analytics
      // doesn't deduplicate the events.
      // Learn more: https://support.google.com/analytics/answer/12313109
      fullName:user && user.fullName,
      telephone:user && user.telephone,
      user_id: user && user.uid,
      value: totalPrice,
      pack_name:presentSubject?.title,
      //tax: 0,
      //shipping: 0,
      currency: "GNF",
      //coupon: "n/a",
      affiliateId:user &&user.affiliate?user.affiliate:"none",
      items: [
        ...(cartItems.map((item)=>(
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




    notifySuccessFxn('Added to cart');
    navigate('/dashboard/my-cart');
  }
};
 
  const [topics,setTopics] = useState(packSubjects);
  
  const populateCategory = (category) => {
   
    dispatch(fetchCategorySubjects(category))
    dispatch(fetchCategoryPacks(category))
    //console.log(`NOW REDIRECTING to ${category}!!!`)
      
    setTimeout(()=>{ navigate('/dashboard/6e')},1000)

  }

  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray"}}> 
    
   {/* i AM USING THE DASHBOARD LAYOUT NOW WHICH APPEARS ON ALL PAGES
   
   <Grid item xs={12} style={{display: 'flex', gap:"11rem",justifyContent: 'space-between', padding:"5px"}}>
     
       <img src ={bonLogo}/> 
       
      <ShortDashboardLayout/>
     

    </Grid>

    <Divider/>
  <br/><br/>*/}


    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column"}}>
   

   


    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"20px",gap:"10px" }}>
    
           <Button   variant="contained" 
            style={{ backgroundColor: "#FFFFFF",color:"#000000",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={()=>{navigate(-1)}}
            >
             Retour
            </Button>

            <Button   variant="contained" 
           

           style={{ backgroundColor: "red",color:"#FFFFFF",border:"1px solid black", fontSize:"12px",width:"40%",
            padding: '8px'}}
            onClick={addToCartFxn}
            >
             Acheter paquet
            </Button>

    </center>

 
    </Grid>

    
   

     <Grid container spacing={2} >

      
       <Grid container item xs={12} spacing={3} style={{ display: 'flex', justifyContent: 'center',marginBottom:"20px" }}>
         
     {packSubjects && topics.map((topic,i)=>(   
         <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' ,marginBottom:"20px",marginTop:"20px"}}>
          <SmallerCardPage title={topic.title} image = {topic && topic.subjectImageUrl && topic.subjectImageUrl.length > 1 ?topic.subjectImageUrl:(oldTopics[i] && oldTopics[i].image?oldTopics[i].image:a10)} author ={topic.author} price={topic.price} lessons={topic.lessons} time={topic.time} /> 
         </Grid>
      ))}
         
        </Grid>
      </Grid>
    
  
</Container>
    </>
  );
}

export default TenePage;