import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Grid, TextField, Typography, IconButton, Button, CircularProgress } from '@mui/material';
import { Cancel } from '@material-ui/icons';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from 'src/redux/reducers/cart.slice';
import { buyCourse } from 'src/redux/actions/cart.action';
import { useNavigate } from 'react-router-dom';

const MyCartPage = () => {
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
            My Cart
          </p>
        </center>
      </Grid>

      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
        {cart?.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <Grid item xs={12} key={index} style={{ paddingTop: '0.5rem', marginBottom: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '3px solid black',
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
                    <IconButton onClick={() => handleRemoveFromCart(item.id)}>
                      <Cancel />
                    </IconButton>
                  </div>
                </div>
              </Grid>
            ))}
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
                Cart is empty
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
            <PaystackConsumer {...componentProps}>
              {({ initializePayment }) => (
                <Button
                  onClick={() => {
                    validatePayment(initializePayment);
                  }}
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
              )}
            </PaystackConsumer>
          </Grid>
        ) : null}
      </div>
    </Container>
  );
};
export default MyCartPage;
