import React,{useState,useEffect} from 'react';
import { Avatar, Button, ButtonBase, Grid, Paper, Typography,  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import CMCVid from 'src/assets/images/CMC-vid.jpg';
import {fetchSingleVideo} from 'src/redux/actions/group.action';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function SeessionBox() {
  const dispatch = useDispatch();
 
  const { user } = useSelector((state) => state.auth);
  const { lastWatchedVideo,nextUpVideo } = useSelector((state) => state.group);

  const [videoTitle,setVideoTitle] = useState(lastWatchedVideo?lastWatchedVideo.title:'loading')
  const [videoSection,setVideoSection] = useState(lastWatchedVideo ?lastWatchedVideo.section:'loading')



useEffect(()=>{
  const lastWatchedId = user && user.watched[user.watched.length-1]
   dispatch(fetchSingleVideo(lastWatchedId))
},[])



useEffect(()=>{

  const lastWatchedId = user && user.watched[user.watched.length-1]
  console.log("the last watched id is !:",lastWatchedId)

  //dispatch(fetchSingleVideo(lastWatchedId))

  setVideoTitle( lastWatchedVideo && lastWatchedVideo.title)
   setVideoSection(lastWatchedVideo && lastWatchedVideo.section)


},[lastWatchedVideo])





  return (
    <>
      <Paper
      sx={{
        p: 1,
        pt: 2,
        pb: 2,
        margin: 'auto',
        marginTop:{lg:'-0.5rem',md:'1rem',sm:'1.5rem'},
        // maxWidth: 500,
        //border: '1px solid black',
        boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75)",
        flexGrow: 1,
       
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          marginTop: '10px',
          paddingBottom: '20px'
        }}>
        <div style={{ width: '100%', float: 'left' }}>
      <Typography variant="body2" gutterBottom style={{ fontSize: '12px', margin: '1rem 0rem 0rem 2rem'  }}>
            <b>{"SESSIONS"}</b>
        </Typography>
        </div>
        {/* <div style={{width: '70%', float: 'right', justifyContent: 'flex-end', display: 'flex', 
        flexDirection: 'row'}}>
             <Button 
        variant="contained"
        style={{backgroundColor: "black", color: "white", fontSize: "11px", marginRight: '10px' }}>
            INSTAGRAM
         </Button>
             <Button 
        variant="contained"
        style={{backgroundColor: "black", color: "white", fontSize: "11px", marginRight: '10px' }}>
            TIKTOK
         </Button>
             <Button 
        variant="contained"
        style={{backgroundColor: "black", color: "white", fontSize: "11px", marginRight: '10px' }}>
            FACEBOOK
         </Button>
        </div> */}
       
        </div>
        <Grid item>
        <Grid item xs container direction="column" spacing={0} sx={{pl: 2, pr: 2}}>
        <ButtonBase sx={{ width: '100%', height: 1, marginBottom: '1rem' }}>
        <img style={{height:"272px", width:"600px"}} alt="complex" src={CMCVid} />
        </ButtonBase>
        </Grid>  
        <Typography variant="body2" gutterBottom style={{ fontSize: '18px', display: 'flex', alignItems: 'center', marginLeft: '3%' }}>
        <center><b>{"RESUME:"}</b></center>
        <br/>
        <div style={{ marginLeft: '2%',width:"100%" }}>{videoTitle && videoSection?(`${videoTitle} - ( under ${videoSection.toUpperCase()})`.slice(0,33))+"...":"loading..."}</div>
      </Typography>
       
      
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: '5%' }}>
      <div></div>
      <Button
        variant="contained"
        style={{
          minHeight: "35px",
          minWidth: "100px",
          backgroundColor: "black",
          border: "1px solid black",
          marginRight: '10px'
        }}
      >
        WATCH
      </Button>
    </div>
        </Grid>
      </Grid>
    </Paper>
    <br/>

    </>

  );
}