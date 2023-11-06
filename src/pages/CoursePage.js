import React from 'react';
import { styled } from '@mui/system';
import { Button, TextField, Box, Grid, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ReactPlayer from 'react-player';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Footer from 'src/components/global/Footer';
import TwitterIMG from '../assets/images/twitter.png';
import LinkedInIMG from '../assets/images/linkedin.png';
import { COURSEDATA } from 'src/utils/data';
import { oldTopics } from './SixePage';
import DesktopSmallerCardPage from './DesktopSmallerCardPage';
import a10 from 'src/assets/images/10.jpeg'
import CourseComponent from 'src/components/course/CourseComponent';


const CoursePage = () => {
  return (
    <Wrapper>
      <Grid container spacing={2} sx={{pl:5, pr: 5}}>
        {/* First Grid Item for YouTube Video */}
        <Grid item xs={7}>
          <CardComponent2 />
          <br/>
          <CardComponent1 />
        </Grid>

        {/* <Grid xs={1}></Grid> */}
        {/* Second Grid Item for Card Component */}
        <Grid container rowSpacing={2} item xs={4.4} style={{border: '0px solid red', }}>
       <CourseComponent />
        </Grid>

       {/* <Grid container rowSpacing={2} item xs={4.4} style={{border: '0px solid red', }}>
            <Grid xs={12} style={{border: '1px solid black', padding: '20px', margin: '0px 20px 0x 20px', justifyContent: 'center', justifyItems: 'center'}}>
               <center> <h1>My Courses</h1></center>
            </Grid>
        {COURSEDATA.slice(1,COURSEDATA.length).map((topic,i)=>(   
         <Grid item xs={6} onClick={{}}
         style={{ display: 'flex', justifyContent: 'center' ,marginBottom:"20px",marginTop:"20px"}}>
          <DesktopSmallerCardPage 
          uid={topic.uid} 
           title={topic.title} 
           image={topic && topic.subjectImageUrl && topic.subjectImageUrl.length > 1 ?topic.subjectImageUrl:(oldTopics[i] && oldTopics[i].image?oldTopics[i].image:a10)} 
           author ={topic.instructor} 
           price={"22,000"} 
           lessons={15} 
           time={"2H 26 MINS"}
            /> 
         </Grid>
      ))}
        </Grid> */}
      </Grid>
      <br/><br/><br/>
      <span style={{ marginTop: '0px'}}></span>
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
  left: '0%',
  width: '100%',
  padding: '16px 0px 0px 0px',
}));

const YouTubeVideoComponent = () => {
  return <ReactPlayer width={550} height={300} url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />;
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

const CardComponent1 = () => {
  return (
    <Card sx={{ maxWidth: 600 }}>
    <CardContent>
        <Chip label="Resume" style={{backgroundColor: 'pink', marginBottom: '10px'}} />
        <div style={{}}>
        <YouTubeVideoComponent />
        </div>
    </CardContent>
  </Card>
  );
};
const CardComponent2 = () => {
  return (
    <Card sx={{ maxWidth: 600 }}>
    <CardContent>
        <Chip label="Announcements" style={{backgroundColor: '#E0E5FF', marginBottom: '10px'}} />
      <Typography sx={{ fontSize: 16, textDecoration: 'underline', color: '#000000', fontWeight: 400 }} color="text.secondary" gutterBottom>
      • We are thrilled to introduce our latest addition to the course catalog: "Digital Marketing Mastery." 🚀
      </Typography>
      <Typography sx={{ fontSize: 16, textDecoration: 'underline', color: '#000000', fontWeight: 400 }} color="text.secondary" gutterBottom>
      • Upcoming Maintenance Downtime
      </Typography>
      <Typography sx={{ fontSize: 16, textDecoration: 'underline', color: '#000000', fontWeight: 400 }} color="text.secondary" gutterBottom>
      • 🌟 We're excited to announce a special event for all data science enthusiasts!......
      </Typography>
      <Typography sx={{ fontSize: 16, textDecoration: 'underline', color: '#000000', fontWeight: 400 }} color="text.secondary" gutterBottom>
      • New Feature Alert - Personalized Learning Paths 🚀
      </Typography>
      <Typography sx={{ fontSize: 16, textDecoration: 'underline', color: '#000000', fontWeight: 400 }} color="text.secondary" gutterBottom>
      • Student Feedback Survey - Your Voice Matters! 🗣️
      </Typography>
    </CardContent>
  </Card>
  );
};

export default CoursePage;
