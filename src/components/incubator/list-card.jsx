import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@mui/icons-material/Lock';
import {FaLockOpen} from 'react-icons/fa'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CircularProgress from '@mui/material/CircularProgress';
import { Circles } from 'react-loading-icons'
import { Button } from '@mui/material';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { useDispatch,useSelector } from 'react-redux';
import {updateVideoAndUserWatchlists,updateCurrentlyWatchingOnly } from 'src/redux/actions/group.action'

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'#F8FFEECC',
    border:'1px solid lightgrey',
    borderRadius:'5pxyyy',
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  text: {
    width: '80%',
    color: 'grey',
  },
  button: {
    width: '20%',
    marginLeft: 'auto',
  },
}));

const ListRowCard = ({data,index,user,watched,playable}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log("THE VIDEO'S  UNDER SUB LEVEL IS",data.levelInfo.underSubLevel)

  const[loading,setLoading] = useState(false)

  const sendToWatchList = (userId,videoId,underSubLevel)=>{
    //console.log("this function is under construction")
     setLoading(true)
    dispatch(updateVideoAndUserWatchlists(userId,videoId,underSubLevel))
    setTimeout(setLoading(false),1000)
  }

  const updateWatchListOnly = (userId,videoId)=>{
 
    dispatch(updateCurrentlyWatchingOnly(userId,videoId)) 
 
}
  return (
    <div className={classes.row}>
      <div className={classes.text}>
        <div style={{ color: 'black' }}>
          <b>{ `${index + 1}.) `/*data.id*/} {data && data.title} --</b>
        </div>{' '}
        <span style={{ marginLeft: '20px' }}>{data && data.details}</span>
      </div>

{watched?
   <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'white',color:"black" }}>
   &nbsp;&nbsp;
   <b onClick={()=>{updateWatchListOnly(user,data.uid)}}><span>Watch</span></b> 
 <FaLockOpen style={{fontSize:"22px",marginLeft:"10px"}}/>
</Button>
     :(
  playable?
       <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black' }}>
       &nbsp;&nbsp;
        <b onClick={()=>{sendToWatchList(user,data.uid,data.levelInfo.underSubLevel)}}><span>Watch</span></b> 
       <FaLockOpen style={{fontSize:"22px",marginLeft:"10px"}} />
      </Button>
    

      :(
        loading?
      <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'white',color:"black" }}>
              &nbsp;&nbsp;
              <b ><span>Loading</span></b> 
              <CircularProgress style={{ marginLeft:"10px" ,height:"20px",width:"20px"}}/>
     </Button>
     :
     
    <Button variant="contained" style={{minHeight: '45px', minWidth: '145px', backgroundColor: 'black', }}>
    &nbsp;&nbsp;
     <b onClick={()=>{notifyErrorFxn("This video is not unlocked yet!")}}><span>Watch</span></b> 
    <LockIcon />
    </Button>
      )
     )
    
     }
    </div>
  );
};

export default ListRowCard;
