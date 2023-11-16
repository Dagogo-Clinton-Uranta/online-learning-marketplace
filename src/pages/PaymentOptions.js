import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Checkbox, Typography, IconButton, Button } from '@mui/material';
import { fetchPurchasedCourse } from '../redux/actions/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse } from 'src/redux/actions/cart.action';
import MTNLOGO from '../assets/images/MTN-logo.png';
import PAYCARDLOGO from '../assets/images/paycard-logo.png';
import LockIcon from '@mui/icons-material/Lock';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import axios from 'axios';
import * as uuid from 'uuid';
import { useNavigate } from 'react-router-dom';

const PaymentOptions = () => {
  const [pcChecked, setPcChecked] = useState(false);
  const [mtnChecked, setMtnChecked] = useState(false);
  const [momoToken, setMomoToken] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { purchasedCourses } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const publicKey = '';
  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price.replace(',', ''));
    return acc + itemPrice;
  }, 0);





  // const momoHost = 'sandbox.momodeveloper.mtn.com';
  // const momoTokenUrl = `https://${momoHost}/collection/token/`;
  // const momoRequestToPayUrl = `https://${momoHost}/collection/v1_0/requesttopay`;

  const momoTokenUrl = '/api/collection/token/';
  const momoRequestToPayUrl = '/api/collection/v1_0/requesttopay';

/*MOCK API REQUEST FOR GENERATING A USER */

headers: {
  'X-Reference-Id ': '2079f714-3a79-4db1-bc3a-e0f608b19b15'
  'Content-Type': 'application/json',
  'Ocp-Apim-Subscription-key': `${process.env.REACT_APP_SUBSCRIPTION_KEY}`, //'5b7a54a04b134ed3a70418a59660cb25'
 }

 in the request body of the post request we will have 

 {
  "providerCallbackHost":"yusuf's url for vercel"
 }

  /*MOCK API REQUEST FOR GENERATING A USER  END*/

  const getMomoToken = async () => {
    const token = await axios({
      method: 'post',
      url: `https://proxy.momoapi.mtn.com/collection/token`, 
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-key': `${process.env.REACT_APP_SUBSCRIPTION_KEY}`,
      },
    });

    console.log('OUR FETCHED TOKEN IS:', token);
    setMomoToken(token.data.access_token);

    //possible errors, if you do CORS, you may need to set up a server and get the token from there
    // only EUR currency works in sandbox, but we have specified production so..lets see how it goes
  };

  useEffect(() => {
    dispatch(fetchPurchasedCourse(user?.uid));
    getMomoToken();
  }, []);

  const handlePcCheckboxChange = () => {
    setPcChecked(true);
    setMtnChecked(false);
  };

  const handleMtnCheckboxChange = () => {
    setMtnChecked(true);
    setPcChecked(false);
  };

  const handleMtnPay = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '5b158c87ce9b495fb64dcac1852d745b',
      'Authorization': 'Basic Nzg1NTgxY2UtYWUxOC00YWRhLTk1MjgtNmRjYjZlMjc4OWU3OjY0MDdiZjU3MjNiMjQwM2U5MzVlNmRiNzhlNjQ4N2Q1',
      // 'Authorization': `Bearer ${momoToken}`,
    };
       setIsLoading(true);
       axios.post(momoTokenUrl, {}, { withCredentials: true, headers })
        .then(response => {
            const access_token = response.data.access_token;
            console.log("ACCESS-TOKEN RIGHT HERE--->", access_token);
           axios.post(momoRequestToPayUrl, {
            amount: totalPrice,
            currency: 'EUR',
            externalId: `${uuid.v4()}`,
            payer: {
              partyIdType: 'MSISDN',
              partyId: `${uuid.v4()}`, //phone
            },
            payerMessage: 'Payment for order',
            payeeNote: 'Payment for order',
          }).then((res) => {
            console.log("Payment request", res);
            const paymentId = res.data.paymentId;
            const paymentUrl = momoRequestToPayUrl+paymentId;
            axios.get(paymentUrl).then((res) => {
              console.log("Payment completed...", res);
              let today = new Date().toLocaleDateString();
              dispatch(buyCourse(cart, user.uid, today, navigate));
            })
          }).catch((error) => {
            setIsLoading(false);
            console.error('Payment Request Error:', error);
            notifyErrorFxn('Payment Request Error...');
          })
        }).catch(error => {
            // Handle errors
            setIsLoading(false);
            console.error('Error:', error);
            notifyErrorFxn('Failed to get token');
        });

    // const data = {
    //   amount: `${totalPrice}`,
    //   currency: 'GNF',
    //   externalId: `${uuid.v4()}`,
    //   payer: {
    //     partyIdType: 'MSISDN',
    //     partyId: `${uuid.v4()}` /*<-- phone number of the client */,
    //   },
    //   payerMessage: `Payment for courses bought. Total - ${totalPrice}`,
    //   payeeNote: 'No Notes',
    // };

    // axios
    //   .post('https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay', data, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-Reference-Id': `${uuid.v4()}`,
    //       'X-Callback-Url': 'https://bonecole-student.netlify.app/dashboard/payment-callback',
    //       'X-Callback-Host': 'https://bonecole-student.netlify.app',
    //       'Ocp-Apim-Subscription-Key': process.env.REACT_APP_SUBSCRIPTION_KEY,
    //       'X-Target-Environment': 'production' /*<-- in the tutorials they only ever used sandbox */,
    //       Authorization: `Bearer ${momoToken}`,
    //     },
    //   })
    //   .then((res) => console.log('RESPONSE FROM MOMO AFTER PAYMENT', res.data));
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: 'white', border: '1px solid lightgray', fontSize: '0.85rem', minHeight: '500px' }}
    >
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
              fontSize: '1.3rem',
              borderBottom: '3px solid red',
              width: '250px',
              marginTop: '20px',
            }}
          >
            Payment Options
          </p>
        </center>
      </Grid>
      <Grid container xs={12} style={{ paddingTop: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Mode de Paiement
          </Typography>
          <Typography
            variant="body1"
            style={{ fontWeight: 400, fontSize: '18px', marginTop: '15px', marginBottom: '15px' }}
          >
            Connexion sécurisée
            <IconButton style={{ marginLeft: '10px' }}>
              <LockIcon />
            </IconButton>
          </Typography>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              width: 390,
              border: '0px solid black',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#F4C109DB',
            }}
          >
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Checkbox checked={mtnChecked} onChange={handleMtnCheckboxChange} />
              </Grid>
              <Grid item style={{ marginLeft: '25%' }}>
                <img src={MTNLOGO} alt="MTN Logo" style={{ width: '100px', height: '100px' }} />
              </Grid>
            </Grid>
          </Paper>
          <br />
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              width: 390,
              border: '1px solid black',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid container justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Checkbox checked={pcChecked} onChange={handlePcCheckboxChange} />
              </Grid>
              <Grid item style={{ marginLeft: '25%' }}>
                <img src={PAYCARDLOGO} alt="PayCard Logo" style={{}} />
              </Grid>
            </Grid>
          </Paper>
          <br />
          <br />
          <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Commande
          </Typography>
          <br />

          {cart.map((item, index) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '0px solid #eee',
                marginBottom: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {item?.title}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                  {item?.price} GNF
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Grid>

      {
        <form id="paycard" action="https://mapaycard.com/epay/" method="POST">
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

          {/* <Button
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
                </Button>*/}
        </form>
      }

      <center
        style={{
          marginTop: '3rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {pcChecked === true ? (
          <Button
            form="paycard"
            type="submit"
            disabled={isLoading === true ? true : pcChecked === false && mtnChecked === false ? true : false}
            variant="contained"
            style={{
              color: 'white',
              backgroundColor: '#CC4436',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingRight: '30px',
              paddingLeft: '30px',
            }}
          >
           {isLoading ? "Loading..." : "Pay"}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => {
              handleMtnPay();
            }}
            disabled={isLoading === true ? true : pcChecked === false && mtnChecked === false ? true : false}
            variant="contained"
            style={{
              backgroundColor: '#CC4436',
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingRight: '30px',
              paddingLeft: '30px',
            }}
          >
           {isLoading ? "Loading..." : "Pay"}
          </Button>
        )}
      </center>
    </Container>
  );
};
export default PaymentOptions;