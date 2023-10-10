import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Paper, Button, Stack, Skeleton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import HomeBox from '../components/home/home-box';
import PublicCoolerRowCard from 'src/components/public-cooler/public-cooler-card';
import { fetchGroups, fetchPublicGroup } from 'src/redux/actions/group.action';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fCurrency } from '../utils/formatNumber';

import IncubatorRowCard from 'src/components/incubator/incubator-row-card';
import CustomSearchBar from 'src/components/global/CustomSearchBar';



export default function IncubatorVideoPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

const { categoryVideos } = useSelector((state) => state.group);
   console.log("VIDEOS IN THIS SECTION ARE NOW:",categoryVideos)
 
   const dummyData = [
    {id: 1, imageUrl: '', title: "Finance", body: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 2, imageUrl: '', title: "Legal", body: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"},
    {id: 3, imageUrl: '', title: "Insurance", body: "lorem ard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompani"}
]
 
 
 
 
 
   const [data,setData] = useState(categoryVideos?categoryVideos:dummyData)




/*useEffect(()=>{
  dispatch(fetchCategories())
},[])*/






const allIncubatorVideos = data?.length ? (
    data.map(dt => {
    return (
      <IncubatorRowCard 
      id={dt.id}
      title={dt.title} 
      body={dt.body}
      img={dt.imageUrl}
      />
    )
  })
) : 
<>
<div className="container">
      <center><p className="center">No videos in this section yet</p></center>
  </div>
</>


  return (
    <>
      <Helmet>
        <title> Bonecole </title>
      </Helmet>
      <Container maxWidth="xl">
        
         {/*I USE THE DIV TO REGULATE STYLE AND POSITIONING OF THE  SEARCH BAR */}
        <div style={{width:"35%",marginBottom:"40px"}}>
        <CustomSearchBar/>
        </div>

      <h1 style={{position:"relative",fontWeight:"bold",marginBottom:"40px",fontSize:"30px"}}>{data&&data[0].category.toUpperCase()}</h1>
      {/* <SearchBox style={{ width: '100%' }} /> */}
      <br/>
      {/* <Grid  container direction="row" justifyContent="flex-end" alignItems="flex-end">
      <Button variant="contained" style={{backgroundColor: "#348AED", paddingTop: '10px', paddingBottom: '10px',  paddingRight: '30px', paddingLeft: '30px'}}>
      FILTER
    </Button>
    </Grid>
      <br/> */}

        {allIncubatorVideos}
  </Container>
      
     
    </>
  );
}