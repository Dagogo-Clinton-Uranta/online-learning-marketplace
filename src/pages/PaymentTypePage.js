import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Grid, TextField, Typography, IconButton, Button, CircularProgress } from '@mui/material';
import { Cancel } from '@material-ui/icons';
import LockIcon from '@mui/icons-material/Lock';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from 'src/redux/reducers/cart.slice';
import { buyCourse } from 'src/redux/actions/cart.action';
import { useNavigate } from 'react-router-dom';

const PaymentTypePage = () => {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const publicKey = '';
  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price.replace(',', ''));
    return acc + itemPrice;
  }, 0);
  let amount = 100000;
  // let price;
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);

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
            Payment Options
          </p>
        </center>
      </Grid>



      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0rem' }}
      >
        
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.9rem',
             
              width: '150px',
              marginTop: '20px',
            }}
          >
            Mode de Paiement
          </p>
       
      </Grid>


      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.2rem',width:"100%"}}
      >
       
          <p
            style={{
              position: 'relative',
              display: 'block',
             
              fontSize: '0.9rem',
             
             
              marginTop: '20px',
            }}
          >
           Connexion sécurisée 

           <IconButton >
              <LockIcon />
          </IconButton>
          </p>
       
      </Grid>

      <Grid
           item
           xs={12}
           style={{ display: 'flex', justifyContent: 'flex-start',marginBottom:"1rem"}}
         >
       
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.9rem',
             
              width: '100%',
              backgroundColor:"pink",
              borderRadius:"1rem",
              padding:"1rem",
              marginTop: '20px',
            }}
          >
           Placeholder
          </p>
      </Grid>

      <Grid
           item
           xs={12}
           style={{ display: 'flex', justifyContent: 'flex-start',marginBottom:"1rem"}}
         >
       
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.9rem',
             
              width: '100%',
              
              border:"1px solid black",
              borderRadius:"1rem",
              padding:"1rem",
              marginTop: '20px',
            }}
          >
           Placeholder 2
          </p>
      </Grid>



     {/* <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
       
      </Grid>

      <br />
      <br />
      <br />
          */}

      <div>
        
          <Grid
            item
            xs={12}
            style={{
              position: 'relative',
             
              paddingTop: '0.8rem',
            }}
          >
            <form action="https://mapaycard.com/epay/" method="POST">
              <input type="hidden" name="c" value="MjcyMDQxNzM" />
              <input type="hidden" name="paycard-amount" value={totalPrice} />
              <input type="hidden" name="paycard-description" value="Course sale" />
              <input
                type="hidden"
                name="paycard-callback-url"
                value="https://bonecole-student.netlify.app/dashboard/payment-callback"
              />
              {/* <input type="hidden" name="paycard-callback-url" value="https://www.monsite.com/check_payment" /> */}
              <input type="hidden" name="paycard-redirect-with-get" value="on" />
              <input type="hidden" name="paycard-auto-redirect" value="off" />
              <input type="hidden" name="cart_data" value={JSON.stringify(cart)} />

             
              {/* <input
                style={{ backgroundColor: '#CC4436',}}
                type="image"
                src="https://mapaycard.com/static/images/paywithpaycard2.png"
                border="0"
                alt="Make Payment"
              ></input> */}
            </form>


            <Grid
           item
           xs={12}
           style={{ display: 'flex', justifyContent: 'flex-start',marginBottom:"1rem"}}
         >
       
          <p
            style={{
              position: 'relative',
              display: 'block',
              fontWeight: 'bold',
              fontSize: '0.9rem',
             
              width: '150px',
              marginTop: '20px',
            }}
          >
           Commande
          </p>
      </Grid>

      <Grid
           item
           xs={12}
           style={{ display: 'flex', justifyContent: 'flex-start'}}
         >
      {cart?.length &&
      cart.map((item, index) => (
              <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '10px',width:"100%" }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                   
                    alignItems: 'center',
                    
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" style={{  fontSize: '0.9rem' }}>
                      {item.title}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" style={{ marginRight: '0.2rem' }}>
                      {item.price} GNF
                    </Typography>
                    
                  </div>
                </div>
              </Grid>
            ))}
      </Grid>
 
           <center  style={{marginTop:"2rem",marginBottom:"2rem"}}>
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
                  Pay
            </Button>

          </center>

          </Grid>
       
      </div>
    </Container>
  );
};
export default PaymentTypePage;
