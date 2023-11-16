import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Container, Grid, Paper, Checkbox, TextField, Typography, IconButton, Button } from '@mui/material';
import { ArrowForward, Cancel } from '@material-ui/icons';
import { fetchPurchasedCourse } from '../redux/actions/cart.action';
import { useSelector, useDispatch } from 'react-redux';
import MTNLOGO from '../assets/images/MTN-logo.png';
import PAYCARDLOGO from '../assets/images/paycard-logo.png';
import LockIcon from '@mui/icons-material/Lock';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import axios from 'axios';
import * as uuid from 'uuid'

const PaymentOptions = () => {
  const [pcChecked, setPcChecked] = useState(false);
  const [mtnChecked, setMtnChecked] = useState(false);
  const [momoToken,setMomoToken] = useState(null)
  const { user } = useSelector((state) => state.auth);
  const { purchasedCourses } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state.cart);
  const [isLoading, setisLoading] = useState(false);
  const publicKey = '';
  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price.replace(',', ''));
    return acc + itemPrice;
  }, 0);

  const dispatch = useDispatch();


 const getMomoToken = async () => {
    const token = await axios({
      method:'post',
      url:`https://proxy.momoapi.mtn.com/collection/token`, //<-- this may not be the correct url
      headers:{
        'Content-Type':'application/json',
        'Ocp-Apim-Subscription-key':process.env.REACT_APP_SUBSCRIPTION_KEY
      }
    })

    console.log("OUR FETCHED TOKEN IS:",token)
    setMomoToken(token.data.access_token);

    //possible errors, if you do CORS, you may need to set up a server and get the token from there
    // only EUR currency works in sandbox, but we have specified production so..lets see how it goes
  }

  useEffect(() => {
    dispatch(fetchPurchasedCourse(user?.uid));
    getMomoToken()
  }, []);

  const handlePcCheckboxChange = () => {
   
    setPcChecked(true);
    setMtnChecked(false);
  };


  const handleMtnCheckboxChange = () => {
   
    setMtnChecked(true);
    setPcChecked(false);
    
  };

  const handleMtnPay = () => {

    const data = {
"amount": `${totalPrice}`,
"currency": "GNF",
"externalId": `${uuid.v4()}`,
"payer": {
"partyIdType": "MSISDN",
"partyId": `${uuid.v4()}` /*<-- phone number of the client */
},
"payerMessage": `Payment for courses bought. Total - ${totalPrice}`,
"payeeNote": "No Notes"
 }
   
    axios.post('https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay', data, {
    headers: {
      'Content-Type':'application/json',
        'X-Reference-Id': `${uuid.v4()}`,
        'X-Callback-Url': 'https://bonecole-student.netlify.app/dashboard/payment-callback', 
        'X-Callback-Host': 'https://bonecole-student.netlify.app',
        'Ocp-Apim-Subscription-Key':process.env.REACT_APP_SUBSCRIPTION_KEY,
        'X-Target-Environment':'production', /*<-- in the tutorials they only ever used sandbox */
        'Authorization':`Bearer ${momoToken}`

    }
})
.then((res) => console.log("RESPONSE FROM MOMO AFTER PAYMENT",res.data))
  }

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
            <IconButton style={{ marginLeft:"10px" }} >
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

       { <form  id = "paycard" action="https://mapaycard.com/epay/" method="POST">
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
             
            </form>}

      <center  style={{marginTop:"3rem",marginBottom:"2rem",display:"flex",justifyContent:"center",alignItems:"center"}}>
           {pcChecked === true?
            <Button
              form ="paycard"
                  type="submit"
                  disabled={pcChecked === false && mtnChecked === false ?true :false}
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
            :

            <Button
            type="button"
            onClick={()=>{handleMtnPay()}}
            disabled={pcChecked === false && mtnChecked === false ?true :false}
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
          }


        </center>

     
      
    </Container>
  );
};
export default PaymentOptions;
