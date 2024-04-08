import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import Button from '@material-ui/core/Button';
import { TextField, FormControl, FormControlLabel, RadioGroup, Radio, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { Divider, Chip, Grid, Paper, Typography, Box, Avatar, Button, ButtonBase, Stack, 
    ToggleButton, ToggleButtonGroup, Hidden  } from '@mui/material';
import { borderRadius } from '@mui/system';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RectangleIMG from '../../assets/images/incu.png';
import { useNavigate } from 'react-router-dom';
import { setRequestedSection } from 'src/redux/reducers/group.slice';
import { fetchVideoSubsection } from 'src/redux/actions/group.action';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

const useStyles = makeStyles((theme) => ({
    textField: {
    padding: '8px',
     border: '1px solid grey',
    },
    paper: {
      display: "flex",
      width: "auto",
    },
    grid: {
      width: "auto",
    },
    arrow: {
      padding: theme.spacing(3),
    },
    box: {
    //   padding: theme.spacing(3),
      paddingLeft: theme.spacing(8),
    },
  }));




  const useStyles2 = makeStyles((theme) => ({
    selected: {
      "&&": {
        // backgroundColor: theme.palette.primary.main,
        backgroundColor: 'black',
        color: theme.palette.secondary.main
      }
    }
  }));

  


function IncubatorRowCard ({ id, title, body, img}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const classes = useStyles();
    const [uid, setUid] = useState(null)
    let today = new Date().toISOString().slice(0, 10);
    const [nTime, setnTime] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { allUsers, connects, isLoading } = useSelector((state) => state.user);


    return (
        <>
          <Paper
          sx={{
            p: 1,
            pt: 2,
            pb: 2,
            margin: 'auto',
            // maxWidth: 500,
            border: '0px solid black',
            borderBottom:"1px solid lightgray",
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
          <Grid item >
          <h2 style={{ fontSize: '19px', display: 'flex',flexDirection:"row",justifyContent:"center",alignItems:"center"}}><b>{title.toUpperCase()}</b></h2>
          </Grid>


          <Grid item container spacing={2}>
            <Grid item>
            {/* <Avatar alt="Profile Pic" src={EmptyAvatar} style={{ width: '120px', height: '120px'}} /> */}
              <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={img ? img : RectangleIMG} />
              </ButtonBase>
              {/* <img src={RectangleIMG} /> */}
            </Grid>
            <Grid item xs={12} sm container spacing={2}>

                <Grid item xs container direction="column" spacing={0}>
                <Grid item xs>
                    <div style={{display: 'flex', flexDirection: 'column', border: '0px solid red', marginBottom: '-20px'}}>
                    <h2 style={{ fontSize: '19px', margin: '0',opacity:'0%' }}><b>{title}</b></h2>
                    <p style={{ fontSize: '17px', margin: '0',  }}>{body}</p>
                    </div>
                </Grid>
                </Grid>

              
              <Grid item xs direction="column" spacing={2} style={{border: "0px solid red", maxWidth: '180px'}}>
              <Box display="flex" alignItems="center" className={classes.box}>
              <Grid item xs={6} sm container spacing={1} justifyContent="flex-end" alignItems="center">
              <Grid item justifyContent="flex-end" alignItems="center" sx={{mt: 5}}>
            <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}
              onClick={() => {
                //const groupData = {id, title, body, img}
                setLoading(true)
                dispatch(setRequestedSection(title))
               
               dispatch(fetchVideoSubsection(title))
                const makeRequest = async()=>{
                  //console.log("i have set the requested section as",title)
                  dispatch(setRequestedSection(title))
                  dispatch(fetchVideoSubsection(title))}
                //use a promise not setTimeout
                makeRequest().then(()=>(setTimeout(()=>{navigate('/dashboard/view-incubator', { state: { title } })},1300)))
              }}>
                {loading?"Loading...":"View"}
            </Button>
              </Grid>
              </Grid>

              </Box>
                <br/>
                  <Grid container justify="center">
                  </Grid>

              </Grid>
            </Grid>
           </Grid>
          </Grid>
        </Paper>
        <br/>

        </>

      );
}

export default IncubatorRowCard