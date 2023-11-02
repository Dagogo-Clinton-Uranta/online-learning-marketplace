import React from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';
import IMAGE_PHONE from '../../assets/images/phone.png';
import PLAY_STORE from '../../assets/images/play-store.png';
import APP_STORE from '../../assets/images/app-store.png';

const Footer = () => {
  return (
  <Grid container style={{background: 'black', maxHeight: '100%', padding: '30px', alignItems: 'center',}}>
  {/* First Column - 2 Images */}
  <Grid item xs={3} style={{marginLeft: '20px', }}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',   }}>
      <img src={IMAGE_PHONE} alt="Phone 1" style={{ width: '60%', marginBottom: '5%', marginLeft: '10%' }} />
      &nbsp;  &nbsp;  &nbsp;
      <img src={IMAGE_PHONE} alt="Phone 2" style={{ width: '60%', marginBottom: '5%' }} />
      <br/><br/>
    </div>
  </Grid>



      {/* Second Column - List of Text */}
      <Grid item xs={3} style={{ marginLeft: '5%' }}>
  <h1 style={{ fontWeight: 100, fontSize: '32px', textAlign: 'center', color: '#FFFFFF'  }}>Features</h1>
  <ul style={{ listStyle: 'none', padding: 0, fontWeight: 400, textAlign: 'center', color: '#FFFFFF', fontSize: '20px'}}>
    <li>Videos</li>
    <li>Audios</li>
    <li>Quizzes</li>
    <li>Offline</li>
  </ul>
</Grid>


      {/* Third Column - Text */}
      <Grid item xs={4}>
        <div>
        <CardComponent />
        </div>
      </Grid>
    </Grid>
  );
};

const CardComponent = () => {
    return (
      <div>
        <center>
          <h1 style={{ fontSize: '32px', fontWeight: 500, color: '#FFFFFF' }}>Download Bonecole App</h1>
        </center>
        <center>
          <div style={{ borderBottom: '2px solid #FFFFFF', width: '75%' }}></div>
        </center>
        <br />
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <img src={APP_STORE} alt="Phone 1" />
              </Grid>
              <Grid item xs={6}>
              <img src={PLAY_STORE} alt="Phone 1" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br/>
        {/* <center>
          <h4 style={{ fontSize: '16px', fontWeight: 500 }}>Don’t have an account? <span style={{color: '#485FEB'}}>Register</span></h4>
        </center> */}
      </div>
    );
  };
  

export default Footer;
