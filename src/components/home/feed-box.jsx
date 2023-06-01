import  React,{useState,useEffect} from 'react';
import { Avatar, Button, Divider, FormControlLabel, Grid, Paper, Typography,  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {getUserProfilePic} from 'src/redux/actions/auth.action';
//import { fCurrency } from 'src/utils/formatNumber';
import AvatarIcon from 'src/assets/images/rec.png';
import logo1 from 'src/assets/images/logo1.png';
import logo2 from 'src/assets/images/logo2.png';
import logo3 from 'src/assets/images/logo3.png';
import logo4 from 'src/assets/images/logo4.png';
import logo5 from 'src/assets/images/logo5.png';
import logo6 from 'src/assets/images/logo6.png';
import logo7 from 'src/assets/images/logo7.png';
import logo8 from 'src/assets/images/logo8.png';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      borderTop: `1px solid lightgray`,
      // borderBottom: `1px solid black`,
      padding: theme.spacing(0.5),
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
      },
  }));
  
  function Row({ title, avatarSrc, time }) {
    const classes = useStyles();
    return (
      <Paper className={classes.paper} square>
      <Avatar className={classes.avatar} src={avatarSrc} />
      <Typography variant="h6" style={{ flex: 1, fontWeight: 'lighter' }}>{title}</Typography>
      <Typography variant="h6" style={{ textAlign: "right", marginRight: '10px', fontWeight: 'lighter' }}>
        {time}
      </Typography>
    </Paper>
    );
  }

export default function FeedBox(feed) {
  //const { user } = useSelector((state) => state.auth);
  //const { transactions } = useSelector((state) => state.transaction);
  const classes = useStyles();
   console.log("feed is :",feed)
  const dispatch = useDispatch()

  const rowData = [
    { img: '21-01-2023', title: '2B Socket Wrench', time: '4:00PM' },
    { img: '21-01-2023', title: 'Networking Event', time: '2:00PM' },
    { img: '21-01-2023', title: 'Manhattan Project ', time: '10:20AM'},
    { img: '21-01-2023', title: 'Window Sponsorship ', time: '4:30PM' },
    { img: '21-01-2023', title: 'Eft Equipment Building ', time: '8:00AM' },


  ];

  const [userData,setUserData] = useState(feed && feed.feed?feed.feed:rowData)

  const { profileImages } = useSelector((state) => state.auth);
  const {candidates } = useSelector((state) => state.candidates);

  console.log("profile images array what the hell:",profileImages)

  

 //const userData = feed && feed.feed?feed.feed:rowData


 const userIdArray = []

 useEffect(()=>{
   if(feed && feed.feed){
    userData.forEach((item)=>{
      userIdArray.push(item.senderId)
    })
   }
     
 },[candidates])

 useEffect(()=>{
  
  if(userIdArray.length>0){
    console.log("the user id array",userIdArray)
    dispatch(getUserProfilePic(userIdArray))
   }
  
    
},[userIdArray,candidates])

  const imageData = [
    logo1,logo2,logo3,logo4,logo5,logo6,logo7,logo8
  ]

  return (
    <>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6} >
          <Typography color="textPrimary" variant="h6" component="p" style={{marginLeft:"-10px"}} sx={{pl: 2, pr: 2}}>
            <b>FEED</b>
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{
              minHeight: '35px',
              minWidth: '100px',
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
          >
            ADMIN
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{
              minHeight: '35px',
              minWidth: '100px',
              backgroundColor: 'black',
              color: 'white',
              border: '1px solid black',
            }}
          >
            ALL
          </Button>
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={1} className={classes.container}>
      
      {userData.length &&
      userData.slice(0,5).map((row,i) => (
        <Grid item xs={12} key={row.title}>
          <Row title={/*feed.feed?feed.feed[feed.feed.length-(i)].title:*/row.title} avatarSrc={profileImages?profileImages[i]:AvatarIcon} time={rowData[i].time} />
       
           
        </Grid>
      ))}
    </Grid>
    <div style={{borderTop: '1px solid lightgray'}}></div>
    <div style={{ display: "flex",justifyContent: "space-between", marginTop: '10px' }}>
      <div></div>
      <Button
        variant="contained"
        style={{
          minHeight: "35px",
          minWidth: "100px",
          backgroundColor: "black",
          border: "1px solid black",
          marginRight: '10px',
          marginLeft:'-10px'
        }}
      >
        FEED
      </Button>
    </div>
    </>
  );
}
