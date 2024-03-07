import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Grid, TextField, Typography, IconButton, Button, CircularProgress } from '@mui/material';
import { Cancel } from '@material-ui/icons';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllFromCart, removeFromCart } from 'src/redux/reducers/cart.slice';
import { buyCourse,saveCartToDatabase,setCartPackSortIds } from 'src/redux/actions/cart.action';
import { useNavigate } from 'react-router-dom';

const MyCartPage = () => {
  const { cart,cartPackIds } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const cartToSubmit = {courses:cart,affiliateId:user &&user.affiliate}

  useEffect(()=>{
      if(!user){
       navigate('/external-login')
      }
 
      
    
   },[])


   useEffect(()=>{

   
   if(cart && cart.length >0 ){
    cart.forEach((item)=>{
      if( item.packId &&item.packId.length &&  item.packName &&  item.packName.length && cartPackIds &&  cartPackIds.indexOf(item.packName) === -1 ){
        
        dispatch(setCartPackSortIds([...cartPackIds,item.packName]))
  
      }
    
    })
  }
  
  
   
    },[cart,cartPackIds])
 
console.log("cart is -->",cart)


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const publicKey = '';
  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price && item.price.replace(',', ''));
    return acc + itemPrice;
  }, 0);

  console.log("TOTAL PRICE IS-->",totalPrice)
  let amount = 100000;
  // let price;
  const [email, setEmail] = useState(user && user.email);
  const [name, setName] = useState(user && user.name);

  const componentProps = {
    email,
    amount: totalPrice * 100,
    metadata: {
      name,
    },
    publicKey,
    text: 'Pay Now',
    onSuccess: () => {
      handleSubmit();
    },
    onClose: () => alert("Wait! Don't leave :("),
  };

  const handleSubmit = () => {
    setisLoading(true);
    let today = new Date().toLocaleDateString();
    dispatch(buyCourse(cart, user.uid, today, navigate));
  };
  const validatePayment = (initializePayment) => {
    initializePayment();
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleRemoveAllFromCart = (itemId) => {
    dispatch(removeAllFromCart(itemId));
    dispatch(removeFromCart(itemId));
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: 'white', border: '1px solid lightgray', fontSize: '0.85rem', minHeight: '500px' }}
    >
      {isLoading && (
        <CircularProgress
          size="50px"
          style={{
            position: 'absolute',
            top: '42%',
            left: '58%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            color: '#CC4436',
          }}
        />
      )}
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
            Mon panier
          </p>
        </center>
      </Grid>

      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
        {cart?.length > 0 ? (
          <>
            {cart.filter((item)=>(!item.packId &&!item.packName /*&& !item.packLead*/)).map((item, index) => (
              <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '10px' }}>
               
               
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid black',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {item.title}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" style={{ marginRight: '0.2rem' }}>
                      {item.price} GNF
                    </Typography>
                    <IconButton onClick={() => {item.packLead ===false? handleRemoveFromCart(item.id):handleRemoveAllFromCart(item.id) }}>
                      <Cancel />
                    </IconButton>
                  </div>
                </div>
              </Grid>
            ))}

{/*
 cartPackIds && cartPackIds.length > 0 &&

cartPackIds.map((packName)=>(

  <>
           <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",width:"24rem",paddingTop:"3rem",marginBottom:"0.7rem",borderBottom:"3px solid black"}}>
            {packName}
            
             <IconButton >
              <Cancel />
             </IconButton>
          </p>
     
     
                {cart.filter((item)=>(item.packName&& item.packName === packName)).map((item, index) => (
                   <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '10px' }}>
                    
                   
                     <div
                       style={{
                         display: 'flex',
                         justifyContent: 'space-between',
                         alignItems: 'center',
                         borderBottom: '1px solid black',
                         padding:"0.2rem"
                       }}
                     >
                       <div style={{ display: 'flex', alignItems: 'center' }}>
                         <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                           {item.title}
                         </Typography>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center' }}>
                         <Typography variant="body1" style={{ marginRight: '0.2rem' }}>
                           
                         </Typography>
                         {<IconButton onClick={() => handleRemoveFromCart(item.id)}>
                           <Cancel />
                      </IconButton>}
                       </div>
                     </div>
                   </Grid>
                 ))
         }
   
   
       
   <Grid item xs={12}  style={{ paddingTop: '0.5rem', marginBottom: '10px' }}>
               
               
              
               <div
                 style={{
                   display: 'flex',
                   justifyContent: 'space-between',
                   alignItems: 'center',
                   borderBottom: '1px solid black',
                 }}
               >
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                   <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                   total cost of pack
                   </Typography>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                   <Typography variant="body1" style={{ marginRight: '0.2rem' }}>
                   { cart.filter((item)=>(item.title === packName))[0].price}{ ' GNF'}
                   </Typography>
                  
                 </div>
               </div>
             </Grid>

   
   
    </>
    ))

       
    

          */}


          </>
        ) : (
          <div>
            <Grid
              item
              xs={12}
              style={{
                position: 'relative',
                display: 'flex',
                width: '23rem',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '0.8rem',
              }}
            >
              <h1
                style={{
                  fontSize: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  paddingRight: '30px',
                  paddingLeft: '60px',
                  fontWeight: 'bold',
                }}
              >
                Panier vide
              </h1>
            </Grid>
          </div>
        )}
      </Grid>

      <br />
      <br />
      <br />
      <div>
        {cart?.length ? (
          <Grid
            item
            xs={12}
            style={{
              position: 'relative',
              display: 'flex',
              width: '23rem',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '0.8rem',
            }}
          >

              <Button
                  type="button"
                  onClick={()=>{
                    setLoading(true)
                    setTimeout(()=>{setLoading(false)},1500)
                    setTimeout(()=>{navigate('/dashboard/payment-options')},1500)
                    //YOU ARE HERE 

                     dispatch(saveCartToDatabase(user.uid,cartToSubmit))

                    //DISPATCH THE CURRENT CART TO THE USER
                  }}
                  disabled={isLoading}
                  variant="contained"
                  style={{
                    backgroundColor: '#CC4436',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingRight: '30px',
                    paddingLeft: '30px',
                    width:"14rem",
                    color:loading?"gray":"white"
                  }}
                >

                  {loading?"loading...":"Procéder au paiement"}
                </Button>
          {/* <form action="https://mapaycard.com/epay/" method="POST">
              <input type="hidden" name="c" value="MjcyMDQxNzM" />
              <input type="hidden" name="paycard-amount" value={totalPrice} />
              <input type="hidden" name="paycard-description" value="Course sale" />
              <input
                type="hidden"
                name="paycard-callback-url"
                value="https://bonecole-student.netlify.app/dashboard/payment-callback"
              />
              
              <input type="hidden" name="paycard-redirect-with-get" value="on" />
              <input type="hidden" name="paycard-auto-redirect" value="off" />
              <input type="hidden" name="cart_data" value={JSON.stringify(cart)} />

              <Button
                  type="submit"
                  disabled={isLoading}
                  variant="contained"
                  style={{
                    backgroundColor: '#CC4436',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    paddingRight: '30px',
                    paddingLeft: '30px',
                  }}
                >
                  Make Payment
                </Button>
             
            </form>*/}
              {/* <input type="hidden" name="paycard-callback-url" value="https://www.monsite.com/check_payment" /> */}
             {/* <input
                style={{ backgroundColor: '#CC4436',}}
                type="image"
                src="https://mapaycard.com/static/images/paywithpaycard2.png"
                border="0"
                alt="Make Payment"
              ></input> */}


          </Grid>
        ) : null}
      </div>
    </Container>
  );
};
export default MyCartPage;
