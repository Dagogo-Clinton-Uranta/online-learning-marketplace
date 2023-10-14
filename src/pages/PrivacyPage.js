import React,{useState,useEffect,useRef,useMemo} from 'react'
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { styled } from '@mui/system';
import { findDOMNode } from 'react-dom'
import { useNavigate } from 'react-router-dom';
import { blobToDataURL } from 'blob-util'




import { useLiveQuery } from 'dexie-react-hooks';
import db from '../browserDb/db'

import soundBytes from 'src/assets/images/soundBytes.mp3'
import soundBytes2 from 'src/assets/images/soundBytes2.mp3'

function PrivacyPage() {
  const navigate = useNavigate()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "95%",
    height:"90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 





/*DEXIE MANIPULATION LOGIC */
const URLSound = window.URL || window.webkitURL;
const [savedMedia,setSavedMedia] = useState([])
const [videoLink,setVideoLink] = useState(null)
let Files = useLiveQuery(() => db.savedCourses.where("courseName").notEqual("Sample name").toArray(),[]);
const linkMaker = (blob) => {
 let link;

  blobToDataURL(blob).then((url)=>{
   link =url
   console.log("final url is",url)
    
    setVideoLink(url)
    
  })

  

}

useEffect(()=>{


setSavedMedia(Files)

//linkMaker(savedMedia[0].fileObject)
},[Files])








/*DEXIE MANIPULATION LOGIC END */




/*MODAL MANIPULATION LOGIC */

  const [open, setOpen] = React.useState(false);
 
/*MODAL MANIPULATION LOGIC */


 /*video manipulation logic */
 
  const [videoTime,setVideoTime] = useState(false)
  const [fullScreen, setFullScreen] = useState(false);


  
  const videoRef = useRef(true)
 

  const handleEsc = (event) => {
   
    window.removeEventListener('fullscreenchange', handleEsc)
    setTimeout(()=>{setOpen(false); setFullScreen(!fullScreen); setVideoTime(false)},10)
    
  };


  const doVideoActions = () => {
    setOpen(true)
    
    setTimeout(
     ()=> {
    
    setVideoTime(!videoTime)
    
     if(!videoTime){
      findDOMNode(videoRef.current).requestFullscreen()
      }
    },10) 

    setTimeout(()=>(window.addEventListener('fullscreenchange', handleEsc)),1000)
  }

  
  
  
  useEffect(()=>{
 
    if(open === false){
      setTimeout(()=>(window.removeEventListener('fullscreenchange', handleEsc)),10)
    }

  },[open])

  /*video manipulation logic end */

 






  return (
    <>
    <Container maxWidth="xs" sx={{backgroundColor:"white", border:"1px solid lightgray",fontSize:"0.85rem"}}> 



    <center  style={{ display: 'flex', justifyContent: 'center',marginTop:"30px",marginBottom:"50px",gap:"10px" }}>
    
    <Button   variant="contained" 
     style={{  backgroundColor: "#FFFFFF",color:"#000000",
     padding: '8px'}}
    
     onClick={()=>{navigate('/dashboard/terms')}}
     >
     conditions d'utilisation
     </Button>

     <Button   variant="contained" 
     style={{backgroundColor:"#000000",color:"#FFFFFF",
     border:"1px solid black", fontSize:"12px",width:"40%",
     padding: '8px'}}
     onClick={()=>{navigate('/dashboard/privacy')}}
     >
     
politique confidentialité
     </Button>


</center>


    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem"}}>
    <center>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",marginBottom:"1rem",borderBottom:"3px solid red",width:"max-content"}}>Politique de confidentialité </p>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",borderBottom:"3px solid red",width:"max-content"}}>de Bonecole INC SARLU</p>
    </center>
    </Grid>

  <Grid container xs={12} style={{paddingTop:"1.5rem"}}>


 
   
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    I / L’objectif de la politique de confidentialité
     </p>

     <p style={{padding:"5%"}}>

     Cette politique de confidentialité est établie dans le but d’informer les utilisateurs du sitehttps://www.bonecole.com/, possédé et géré par BONECOLE INC SARLU, des modalités suivantes :
     <br/><br/>
     ●   Les données personnelles recueillies par le site internet
     <br/>
     ●   L’utilisation faite de ces données
     <br/>
     ●   L’accès à ces données
     <br/>
     ●   Les droits que possèdent les utilisateurs du site
     <br/>
     ●   La politique liée à l’utilisation de cookies
     <br/><br/>
     Cette  politique  de  confidentialité  fonctionne  parallèlement  aux  conditions  générales  du site Bonecole.
     </p>
    
    </Grid>

    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    II / Lois applicables
     </p>

     <p style={{padding:"5%"}}>

     Conformément au Règlement Général sur la Protection des Données, cette politique de confidentialité est sujette aux règlements suivants :
   Les données personnelles sont :
     
     <br/><br/>

    <ul>
     <li style={{listStyleType:"circle"}}> traitées de manière licite et transparente;</li>
     <br/>
     <li style={{listStyleType:"circle"}}>  collectées à des fins déterminées, explicites et légitimes, et ne seront pas traitées ultérieurement d’une manière incompatible avec ces fins. Conformément à la loi No L/2016/037/AN, relative à la cyber-sécurité et la protection des données à caractère personnel en République de Guinée ;</li>
    <br/>
    <li style={{listStyleType:"circle"}}>  adéquates, pertinentes et limitées à ce qui est nécessaire dans le cadre des finalités pour lesquelles elles sont traitées ;</li>
    <br/>
    <li style={{listStyleType:"circle"}}>  exactes, et si nécessaires tenues à jour. Toutes les mesures raisonnables seront prises pour corriger des données incorrectes au regard de la finalité pour laquelle celles-ci sont collectées ;</li>
    <br/>
    <li style={{listStyleType:"circle"}}>  conservées sous une forme permettant l’identification des personnes concernées pour une durée suffisante pour leur traitement ;</li>
    <br/>
    <li style={{listStyleType:"circle"}}> traitées d’une façon qui garantit la sécurité de celles-ci, y compris en ce qui concerne le traitement non autorisé ou illicite, la perte ou la destruction de ces données, accidentelle ou volontaire.</li>
    </ul>  
     
     
    
      Le traitement des données collectées n’est licite que si au moins l’une des conditions suivantes est remplie:
     </p>

     <p style={{padding:"5%"}}>

   

    <ul>
     <li style={{listStyleType:"circle"}}> La personne concernée par les données a consenti au traitement de celles-ci pour une ou plusieurs finalités spécifiques.</li>
     <br/>
     <li style={{listStyleType:"circle"}}>  Le traitement des données est nécessaire à l’exécution d’un contrat dont la personne concernée est partie ou à l’exécution des mesures précontractuelles prises à la demande de celui-ci</li>
    <br/>
    <li style={{listStyleType:"circle"}}> Le traitement est nécessaire à la réalisation d’une obligation légale à laquelle le responsable, Bonecole INC SARLU, est soumis.</li>
    <br/>
    <li style={{listStyleType:"circle"}}> Le traitement est nécessaire à la réalisation d’une mission d’intérêt public dont est investi Bonecole INC SARLU.</li>
    <br/>
    <li style={{listStyleType:"circle"}}>  conservées sous une forme permettant l’identification des personnes concernées pour une durée suffisante pour leur traitement ;</li>
    <br/>
    <li style={{listStyleType:"circle"}}> Le traitement est nécessaire aux fins des intérêts légitimes poursuivis par le responsable du traitement ou par un tiers, à moins que ne prévalent les intérêts, libertés ou droits fondamentaux de la personne concernée.</li>
    </ul>  
     
     </p>
    
    </Grid>
    
    

    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    III / Consentement
     </p>

     <p style={{padding:"5%"}}>
     <ul>
     <li style={{listStyleType:"circle"}}> Toutes les conditions incluses dans la présente politique de confidentialité;</li>
     <br/>
     <li style={{listStyleType:"circle"}}>  La collecte, l’utilisation et la conservation des données listées dans la présente politique de confidentialité.</li>
    </ul>  
     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    IV / Données personnelles collectées
     </p>

     <p style={{padding:"5%"}}>

     Lors de la navigation du site ou application Bonecole, différentes données personnelles au sujet des utilisateurs sont collectées.
     <br/> 
     <b>Les données suivantes sont collectées de manière automatique :</b>
    <br/> 
    
    Adresse email et ou compte Facebook, et numéro de téléphone 
    <br/> <br/>

    <b>Les données suivantes sont recueillies de manière non-automatique :</b>
    <br/>
    Nom et prénom, numéro de téléphone, école d’origine, 
    Ces données sont recueillies après remplissage du profil d’utilisateur dans la section mon profil.
    Aucune donnée supplémentaire n’est collectée sans vous en informer au préalable.

     <br/>
     
     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    V / Traitement de ces données
     </p>

     <p style={{padding:"5%"}}>

     Les données personnelles recueillies sur le site Bonecole ne sont collectées et traitées que dans le cadre des fins précisées dans la présente politique de confidentialité et / ou dans les pages pertinentes du site. Les données personnelles que nous collectons ne seront pas utilisées à d’autres fins hormis l’analyse pour le simple but d’amélioration de la qualité des services fournis aux utilisateurs.
     </p>
    
    </Grid>

    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    VI / Partage des données personnelles recueillies
     </p>

     <p style={{padding:"5%"}}>
     <ul>
     <li style={{listStyleType:"circle"}}> Employés : Nous pouvons ouvertement divulguer les informations aux employés de l’entreprise Bonecole dans la mesure où ceux-ci en ont besoin pour poursuivre la fin prévue dans cette politique;</li>
     <br/>
     <li style={{listStyleType:"circle"}}>  L’usage de notre site pourrait solliciter le transfert de données spécifiques (email, nom d’utilisateur et numéro de téléphone) à nos fournisseur d’API (Google, Facebook et Orange Finances Mobile Guinée)</li>
    </ul>  
     </p>

     <p style={{padding:"2%"}}>
     Par ailleurs, les données personnelles collectées pourront être partagées :
     </p>


     <p style={{padding:"5%"}}>
     <ul>
     <li style={{listStyleType:"circle"}}> Si l’entreprise Bonecole y est contrainte par la loi</li>
     <br/>
     <li style={{listStyleType:"circle"}}> Si les informations sont requises pour toute procédure judiciaire</li>
     <br/>
     <li style={{listStyleType:"circle"}}>Afin de protéger les droits légaux de l’entreprise Bonecole</li>
    </ul>  
     </p>

     <p style={{padding:"5%"}}>
     En dehors des situations prévues dans cette présente politique, 
     les informations personnelles ne seront en aucun cas divulguées ou partagées à des tiers.
     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    VII / Stockage et protection des données personnelles
     </p>

     <p style={{padding:"5%"}}>

     L’entreprise Bonecole ne conserve pas les données personnelles plus longtemps que ce qui est nécessaire à la réalisation des fins pour lesquelles elles sont collectées.
     Afin de protéger ces données, nous mettons en oeuvre les mesures suivantes :
     <br/><br/>
     Déploiement d’un dispositif de sécurité élevé sur tous nos produits (site et application) pour protéger les données de l’entreprise et des utilisateurs, et l’engagement de non divulgation des données d’utilisateurs à des tierces parties.

     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    VIII / Droits de l’utilisateur
     </p>

     <p style={{padding:"5%"}}>

     Conformément à la loi en vigueur, les utilisateurs du site Bonecole ont, en ce qui concerne leurs données personnelles, les droits suivants :
     </p>


     <p style={{padding:"5%"}}>
     <ul>
     <li style={{listStyleType:"circle"}}>Droit d’accès</li>
     <li style={{listStyleType:"circle"}}> Droit de rectification</li>
     <li style={{listStyleType:"circle"}}>Droit à l’effacement</li>
     <li style={{listStyleType:"circle"}}>Droit de restreindre le traitement</li>
     <li style={{listStyleType:"circle"}}>Droit à la portabilité des données</li>
     <li style={{listStyleType:"circle"}}>Droit d’objection</li>
    </ul>  
     </p>



     <p style={{padding:"5%"}}>

     Pour faire valoir l’un de ses droits, accéder à vos données, les modifier ou les supprimer d’une quelconque manière, vous pouvez communiquer avec notre service client via email: <b style={{color:"blue"}}> contact@bonecole.com</b>
     </p>
    
    </Grid>

    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    IX / Politique au sujet des cookies
     </p>

     <p style={{padding:"5%"}}>

     Un cookie est un fichier stocké sur le disque dur d’un utilisateur lorsqu’il navigue sur un site web. Ce cookie permet de mieux connaître les données relatives aux habitudes de navigation de l’utilisateur afin de lui proposer une meilleure expérience d’utilisation.
     <br/><br/>
     Le site Bonecole utilise les cookies suivants :<br/>
    Bonecole utilise des cookies techniques pour permettre le bon fonctionnement du site.
    <br/><br/>

    Le site Bonecole utilise également les cookies tiers suivants : <br/>
    Facebook, Google services, Orange.
     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    X / Modification de la politique de confidentialité
     </p>

     <p style={{padding:"5%"}}>

     Afin de rester en accord avec la loi ou de refléter tout changement dans notre processus de gestion des données personnelles, la présente politique de confidentialité peut être amenée à changer et à être modifiée régulièrement. Il est recommandé aux utilisateurs de vérifier régulièrement cette politique afin de se tenir informés de notre politique en termes de collecte et de traitement de données personnelles.

   
     </p>
    
    </Grid>



    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    XI / Contact
     </p>

     <p style={{padding:"5%"}}>

     Contactez-nous au +224 611 23 88 88 ou encore au <b style={{color:"blue"}}> contact@bonecole.com</b>

   
     </p>
    
    </Grid>


   </Grid>


   <p style={{paddingTop:"1.5rem",paddingBottom:"1.5rem"}}>
  

   
   </p>
       

</Container>
    </>
  );
}

export default PrivacyPage;