import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import randomGuy from 'src/assets/images/random-guy.jpg'
import ShortDashboardLayout from 'src/layouts/dashboard/ShortDashboardLayout';

import { fetchGroups, fetchMyGroups, uploadUserSettings} from 'src/redux/actions/group.action';

import { useDispatch, useSelector } from 'react-redux';
import { notifyErrorFxn } from 'src/utils/toast-fxn';
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";

import users from 'src/_mock/user';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: "80vw",
      height: "80vh",
      maxWidth: "500px",
      maxHeight: "700px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    paper2: {
      width: "80vw",
      maxWidth: "500px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "relative"
    },
    container: {
      maxWidth:"xs",
      width: "100vw",
      border:"1px solid lightgray",
      height: "100vh",
      display: "flex",
      flexDirection:"column",
      position:"relative",
      alignItems: "center",
      justifyContent: "center"
    },
    messagesBody: {
      width: "calc( 100% - 20px )",
      margin: 10,
      overflowY: "scroll",
      height: "calc( 100% - 80px )"
    }
  })
);


function MobileChatPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    

   <>
    
    <div className={classes.container}>
    <Button   variant="contained" 
            style={{ backgroundColor: "#000000",color:"#FFFFFF",border:"1px solid black",fontSize:"15px",
            paddingRight: '3px', paddingLeft: '3px',position:"absolute",left:"3%",top:"3%"}}
            onClick ={()=>{navigate('/dashboard/home')}}
            >
           Back
    </Button>

      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" style={{border:"1px solid black",padding:"0.5rem"}} className={classes.messagesBody}>
          <MessageLeft
            message="You are welcome to Bon Ecole, we are happy to have you! We hope our platform will change your learning Experience !"
            timestamp="13/06 07:00"
            photoURL={randomGuy}
            displayName="Bon-Ecole Assistant"
            avatarDisp={true}
          />
          <MessageLeft
            message="We suggest starting out with our popular courses Page !"
            timestamp="13/06 07:00"
            photoURL={randomGuy}
            displayName="Bon-Ecole Assistant"
            avatarDisp={false}
          />
          <MessageRight
            message="Hi, I am Jacques Paul, thanks for your suggestion."
            timestamp="13/06 07:10"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Jacques paul"
            avatarDisp={true}
          />
          <MessageRight
            message="Yes I think I will do that, any more suggestions?"
            timestamp="13/06 07:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Jacques Paul"
            avatarDisp={false}
          />
        </Paper>
        <TextInput />
      </Paper>
    </div>
  </> 
  );
}

export default MobileChatPage;