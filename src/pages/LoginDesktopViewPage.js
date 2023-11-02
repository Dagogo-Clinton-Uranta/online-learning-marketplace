import React from 'react';
import { styled } from '@mui/system';
import { Button, TextField, Box, Grid } from '@mui/material';
import ReactPlayer from 'react-player';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Footer from 'src/components/global/Footer';
import TwitterIMG from '../assets/images/twitter.png';
import LinkedInIMG from '../assets/images/linkedin.png';

const LoginDesktopViewPage = () => {
  return (
    <Wrapper>
      <Grid container spacing={2}>
        {/* First Grid Item for YouTube Video */}
        <Grid item xs={6}>
          <YouTubeVideoComponent />
        </Grid>

        {/* Second Grid Item for Card Component */}
        <Grid item xs={6}>
          <CardComponent />
        </Grid>
      </Grid>
      <br/><br/><br/>
      <span style={{ marginTop: '50px'}}></span>
     <Footer />
     <div
  style={{
    display: 'flex',
    alignItems: 'center',
    minHeight: '10px',
    justifyContent: 'space-between',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '15px',
    paddingBottom: '15px',
    marginTop: '0px',
    marginBottom: '0px',
    backgroundColor: '#000000E5',
    color: 'white',
    flexDirection: 'row', 
  }}
>
  <div style={{color: 'white'}}>Email: contact@bonecole.com</div>
  <div style={{color: 'white'}}>&copy; {new Date().getFullYear()} 2023 Boncole Inc. All Rights Reserved</div>
  <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
    <a href="https://www.facebook.com">
      <FacebookRoundedIcon />
    </a>
    <a href="https://www.twitter.com">
      <img src={TwitterIMG} alt="Twitter" />
    </a>
    <a href="https://www.linkedin.com">
      <img src={LinkedInIMG} alt="LinkedIn" />
    </a>
  </div>
</div>

    </Wrapper>
  );
};

const Wrapper = styled(Box)(({ theme }) => ({
  border: '0px solid red',
  position: 'absolute',
  left: '5%',
  width: '90%',
  padding: '16px 16px 0px 16px',
}));

const YouTubeVideoComponent = () => {
  return <ReactPlayer width={500} height={300} url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />;
};

const CardComponent = () => {
  return (
    <div>
      <center>
        <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Login To Access Content</h1>
      </center>
      <center>
        <div style={{ borderBottom: '2px solid #000000', width: '55%' }}></div>
      </center>
      <br />
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Email Address" variant="outlined" fullWidth style={{ background: 'white' }} />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#161441',
                  color: '#FFFFFF',
                  width: '100%',
                  height: '3rem',
                  fontSize: '12px',
                }}
                //   onClick ={()=>{navigate('/login')}}
              >
                School
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                style={{ background: 'white' }}
              />
            </Grid>
            <Grid item xs={6}>
            <Button
                variant="contained"
                style={{
                  backgroundColor: '#CC4436',
                  color: '#FFFFFF',
                  width: '100%',
                  height: '3rem',
                  fontSize: '12px',
                }}
                //   onClick ={()=>{navigate('/login')}}
              >
                Gmail
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            <Button
                variant="contained"
                style={{
                  backgroundColor: 'black',
                  color: '#FFFFFF',
                  width: '100%',
                  height: '3rem',
                  fontSize: '12px',
                }}
                //   onClick ={()=>{navigate('/login')}}
              >
                Email
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#485FEB',
                  color: '#FFFFFF',
                  width: '100%',
                  height: '3rem',
                  fontSize: '12px',
                }}
                //   onClick ={()=>{navigate('/login')}}
              >
                Facebook
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br/>
      <center>
        <h4 style={{ fontSize: '16px', fontWeight: 500 }}>Don’t have an account? <span style={{color: '#485FEB'}}>Register</span></h4>
      </center>
    </div>
  );
};

export default LoginDesktopViewPage;
