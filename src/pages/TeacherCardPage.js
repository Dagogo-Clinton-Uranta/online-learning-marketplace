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
import MathCover from 'src/assets/images/mathcover.jpeg';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useDispatch, useSelector } from 'react-redux';



import { fetchSubjectChapters} from 'src/redux/actions/main.action';
import { BiObjectsVerticalBottom } from 'react-icons/bi';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TeacherCardPage({uid,firstName,lastName,imageUrl,subject,level,bio}) {
  const [expanded, setExpanded] = React.useState(false);
  const [loading,setLoading] = React.useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  //console.log("uid is actually",uid) 

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchChapters =(subjectId) =>{

    dispatch(fetchSubjectChapters(subjectId))
    setLoading(true)

    setTimeout(()=>{( navigate('/dashboard/selected-course'))},2000)
  }

  return (
    <Card sx={{ maxWidth: "80%" }}>
      <center>
      <CardMedia
      sx={{ padding: "10px",borderRadius:"1rem",marginBottom:"-15px !important"}}
        component="img"
        height="200"
        image={imageUrl}
       
        alt="teacher's picture"
      />
     </center>
     
       <center>
      <CardContent>
   
      <Typography sx={{fontSize:"16px",display:"flex",flexDirection:"column" ,gap:"5px"}} >
         <p style={{color:"black"}}>{firstName + " " + lastName}</p>
        
         <p style={{color:"black"}}>{subject  && subject + " "+ "/" + " " + (level && level) } </p>
        </Typography>


      <Divider/>
       <br/>

        <Typography sx={{fontSize:"16px",marginTop:"-10px",marginBottom:"-20px"}} variant="body2" color="text.secondary">
        {loading?"LOADING ...":
        <>
        {/*<b style={{color:"black"}}>{price} GNF</b>&nbsp;  <s>50,000 GNF</s>*/}
        {bio}
        </>
        }

        </Typography>
      </CardContent>
      </center>
      
      

      {/*<CardActions >
       
        <IconButton sx={{fontSize:"16px",fontWeight:"bold",margin:"0 auto"}} >
          <MenuBookIcon sx={{height:"15px"}} /> {lessons} matieres
        </IconButton>
     
      </CardActions>*/}
     


     
    </Card>
  );
}