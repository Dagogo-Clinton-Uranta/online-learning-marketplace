import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Philos from 'src/assets/images/philoslib.jpeg';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSubjectChapters} from 'src/redux/actions/group.action';


export default function HomeCardPage({uid,title,author,price,lessons,time,image}) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
   const dispatch = useDispatch()
  console.log("uid is actually",uid) 
  
  const [loading,setLoading] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

    const fetchChapters =(subjectId) =>{

    dispatch(fetchSubjectChapters(subjectId))
    setLoading(true)

    setTimeout(()=>{( navigate('/dashboard/selected-course'))},2500)
  }

  return (
    <Card sx={{ maxWidth: "100%"  }}>
      {/*<CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            P
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title} 
        subheader={author}
      />*/}
      <CardMedia
      sx={{ padding: "10px",borderRadius:"1rem",marginBottom:"-15px !important" }}
        component="img"
        height="100"
        image={image}
        onClick={()=>{fetchChapters(uid)}}
        alt="Paella dish"
      />


      <CardContent>
   
      <Typography sx={{fontSize:"16px",display:"flex",flexDirection:"column" ,gap:"5px"}} >
         <p style={{color:"black"}}>{`${title.substring(0,20) + `${title.length > 20?"...":""}`}`}</p>
        
         <p style={{color:"black"}}>{author} </p>
        </Typography>


      <Divider/>
       <br/>

        <Typography sx={{fontSize:"16px",marginTop:"-10px",marginBottom:"-20px"}} variant="body2" color="text.secondary">
          {loading?"LOADING ...":
        <>
        <b style={{color:"black"}}>{price?price:"22,000"} GNF</b>&nbsp;  {/*<s>50,000 GNF</s>*/}
        </>
        }

        </Typography>
      </CardContent>
      
      
      

      <CardActions >
        <IconButton sx={{fontSize:"16px",fontWeight:"bold",position:"relative",left:"-1%"}} >
          <MenuBookIcon sx={{height:"15px"}} /> {lessons} Lecons
        </IconButton>
        <IconButton sx={{fontSize:"16px",fontWeight:"bold",position:"relative",left:"0%"}} >
          <AccessTimeIcon sx={{height:"15px"}} /> {time}
        </IconButton> 
      </CardActions>
      
      
    </Card>
  );
}
