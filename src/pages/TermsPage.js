import React,{useState,useEffect,useRef,useMemo} from 'react'
import { Container,Grid, TextField, Typography, TextareaAutosize, Button, Paper,Divider,Box} from '@mui/material';
import { styled } from '@mui/system';
import { findDOMNode } from 'react-dom'
import { useNavigate } from 'react-router-dom';
import { blobToDataURL } from 'blob-util'



import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Avatar from '@mui/material/Avatar';

import samplePdf from 'src/assets/images/sample.pdf'
import profile from 'src/assets/images/profile.jpeg'
import math from 'src/assets/images/math.jpeg'
import chem from 'src/assets/images/chembeak.jpeg'
import chem2 from 'src/assets/images/chem2.jpeg'
import biology from 'src/assets/images/biology.jpeg'
import english from 'src/assets/images/english.jpeg'
import philosophy from 'src/assets/images/philoslib.jpeg'
import ReactPlayer from 'react-player'
import { Document, Page ,pdfjs} from 'react-pdf';
import { MobilePDFReader,PDFReader } from 'react-read-pdf';

import AudioSwitch from './AudioSwitch';
import VideoSwitch from './VideoSwitch';


import {AiOutlineDownload} from "react-icons/ai";




import { useLiveQuery } from 'dexie-react-hooks';
import db from '../browserDb/db'

import soundBytes from 'src/assets/images/soundBytes.mp3'
import soundBytes2 from 'src/assets/images/soundBytes2.mp3'

function TermsPage() {
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
     style={{ backgroundColor:"#000000",color:"#FFFFFF",
     padding: '8px'}}
    
     onClick={()=>{navigate('/dashboard/terms')}}
     >
     conditions d'utilisation
     </Button>

     <Button   variant="contained" 
     style={{ backgroundColor: "#FFFFFF",color:"#000000",
     border:"1px solid black", fontSize:"12px",width:"40%",
     padding: '8px'}}
     onClick={()=>{navigate('/dashboard/privacy')}}
     >
     
politique confidentialité
     </Button>


</center>


    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', flexDirection:"column",marginBottom:"1rem"}}>
    <center>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",marginBottom:"1rem",borderBottom:"3px solid red",width:"max-content"}}>Conditions générales d'utilisation</p>
    <p style={{position:"relative",display:"block",fontWeight:"bold",fontSize:"0.9rem",borderBottom:"3px solid red",width:"max-content"}}>En vigueur le 17/01/2022</p>
    </center>
    </Grid>

  <Grid container xs={12} style={{paddingTop:"1.5rem"}}>


  <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    <p style={{padding:"5%"}}>
  Conditions générales d'utilisationEn vigueur le 17/01/2022Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique des  modalités  de  mise  à  disposition  du  site  et  des  services  par  BONECOLE  INC   et  de  définir  les conditions d’accès et d’utilisation des services par « l'Utilisateur ».Les présentes CGU sont accessibles sur le site à la rubrique «CGU».
  <br/><br/>
  Toute  inscription  ou  utilisation  du  site  implique  l'acceptation  sans  aucune  réserve  ni  restriction  des présentes CGU par l’utilisateur. Lors de l'inscription sur le site via le Formulaire d’inscription, chaque utilisateur accepte expressément les présentes CGU en cochant la case précédant le texte suivant : « Je reconnais avoir lu et compris les CGU et je les accepte ».
  <br/><br/>
  En cas de non-acceptation des CGU stipulées dans le présent contrat, l'Utilisateur se doit de renoncer à l'accès des services proposés par le site.BONECOLE INC. SARLU se réserve le droit de modifier unilatéralement et à tout moment le contenu des présentes CGU.
   </p>
  </Grid>
   
    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    ARTICLE 1 : Les mentions légales
     </p>

     <p style={{padding:"5%"}}>

     L'édition du site <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a> est assurée par la Société BONECOLE INC SARLU au capital de 10,000,000 GNF, immatriculée au RCCM sous le numéro GN.TCC.2021.B.13811, dont le siège social est situé à Immeuble BSIC, Lambanyi Marché, Commune de Ratoma, Conakry, République de Guinée.
     <br/><br/>
     Numéro de téléphone : +224611238888
     <br/>
     Adresse e-mail : contact@bonecole.com
     <br/><br/>
     L'hébergeur du site <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a> est la société BONECOLE INC SARLU, dont le siège social est  situé  à  Immeuble  BSIC,  Lambanyi  marché,  Commune  de  Ratoma,  Conakry,  République  de Guinée, avec le numéro de téléphone : +224611238888.
     </p>
    
    </Grid>

    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    ARTICLE 2 : Accès au site
     </p>

     <p style={{padding:"5%"}}>

     Le site <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a>  permet à l'utilisateur un accès payant aux services suivants : Ventes de cours en ligne.Le site est accessible en tout lieu à tout Utilisateur âgé de 13 ou plus, ayant un accès à Internet. Les utilisateurs âgés de moins de 13 ans doivent avoir obtenu du(des) titulaire(s) de l'autorité parentale l'autorisation le concernant d'accepter les Conditions Générales d'Utilisation.
     <br/><br/>
      Tous les frais supportés par l'Utilisateur pour accéder au service (matériel informatique, connexion Internet, coûts des cours etc.) sont à sa charge.L'utilisateur  non  membre  n'a  pas  accès  aux  services  réservés.  Pour  cela,  il  doit  s’inscrire  en remplissant  le  formulaire.  En  acceptant  de  s’inscrire  aux  services  réservés,  l'utilisateur  membre s’engage à fournir des informations sincères et exactes concernant ses coordonnées, notamment son adresse email, identifiant Facebook, école d’origine, classe, etc....Pour  accéder  aux  services,  l’Utilisateur  doit  ensuite  s'identifier  à  l'aide  de  son  compte  google  ou Facebook  tout  en  communiquant  son  nom,  adresse  email,  identifiant  Facebook,  école  d’origine, numéro de téléphone, et classe dans la section "mon profil" après son inscription.Tout  Utilisateur  membre  et  régulièrement  inscrit  pourra  également  solliciter  la  fermeture  de  son compte en nous notifiant de sa volonté via e-mail à l'adresse contact@bonecole.com. Celle-ci sera effective dans un délai raisonnable.
      <br/><br/>
      Tout événement dû à un cas de force majeure ayant pour conséquence un dysfonctionnement du site ou serveur et sous réserve de toute interruption ou modification en cas de maintenance, n'engage pas 
     la responsabilité de BONECOLE INC SARLU. Dans ces cas, l’Utilisateur accepte ainsi ne pas tenir rigueur à l’éditeur de toute interruption ou suspension de service, même sans préavis.L'utilisateur  a  la  possibilité  de  contacter  le  site  par  messagerie  électronique  à  l’adresse  email  de l’éditeur communiqué à l’ARTICLE 1.
     </p>
    
    </Grid>
    
    

    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    ARTICLE 3 : Collecte des données
     </p>

     <p style={{padding:"5%"}}>

     Le  site  fait  l’objet  de  collecte  de  données  concernant  les  Utilisateurs.  Ces  données  concernent  les informations personnelles et la navigation sur le site <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a>. Les données personnelles sont: adresse e-mail, nom, école d’origine, classe, identifiant Facebook et numéro de téléphone. Soit les   données   de   navigation   concernent   strictement   les   activités   de   l’utilisateur   sur   le   site  <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a>
     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    ARTICLE 4 : Propriété intellectuelle
     </p>

     <p style={{padding:"5%"}}>

     Les  marques,  logos,  signes  ainsi  que  tous  les  contenus  du  site  (textes,  images,  son...)  font  l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.La marque BONECOLE est une marque déposée par BONECOLE INC. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale de cette marque, de quelque nature que ce soit, est totalement prohibée.
     <br/><br/>
     L'Utilisateur  doit  solliciter  l'autorisation  préalable  du  site  pour  toute  reproduction,  publication,  copie des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation expresse de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par la loi en vigueur et le Code de la propriété intellectuelle.
     <br/><br/>
     Il est rappelé conformément au Code de propriété intellectuelle que l’Utilisateur qui reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.
     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    ARTICLE 5 : Responsabilité
     </p>

     <p style={{padding:"5%"}}>

     Les sources des informations diffusées sur le site  <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a> sont réputées fiables mais le site ne garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle. Malgré des mises à jour régulières, le site  <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a> ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication. 
     <br/><br/>
     De même, le site ne peut être tenue responsable de l’utilisation et de l’interprétation de l’information contenue dans ce site.L'Utilisateur s'assure de garder son mot de passe secret. Toute divulgation du mot de passe, quelle que  soit  sa  forme,  est  interdite.  Il  assume  les  risques  liés  à  l'utilisation  de  son  identifiant  et  mot  de passe. Le site décline toute responsabilité.
     <br/><br/>
     Le  site  <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a>  ne  peut  être  tenu  pour  responsable  d’éventuels  virus  qui  pourraient infecter l’ordinateur ou tout matériel informatique de l’Internaute, suite à une utilisation, à l’accès, ou au téléchargement provenant de ce site.La  responsabilité  du  site  ne  peut  être  engagée  en  cas  de  force  majeure  ou  du  fait  imprévisible  et insurmontable d'un tiers.
     </p>
    
    </Grid>

    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    ARTICLE 6 : Liens hypertextes
     </p>

     <p style={{padding:"5%"}}>

     Des liens hypertextes peuvent être présents sur le site. L'utilisateur est informé qu’en cliquant sur ces liens,  il  sortira  du  site  <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a>.  Ce  dernier  n’a  pas  de  contrôle  sur  les  pages  web  sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    ARTICLE 7 : Cookies
     </p>

     <p style={{padding:"5%"}}>

     L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement sur son logiciel de navigation.Les  cookies  sont  de  petits  fichiers  stockés  temporairement  sur  le  disque  dur  de  la  machine  de l’Utilisateur par votre navigateur et qui sont nécessaires à l’utilisation du site  <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a>.
     <br/><br/>
      Les cookies  ne  contiennent  pas  d’information  personnelle  et  ne  peuvent  pas  être  utilisés  pour  identifier quelqu’un. Un cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains cookies expirent à la fin de la visite de l'utilisateur, d’autres restent.L’information contenue dans les cookies est utilisée pour améliorer le site  <a href="https://www.bonecole.com" style={{color:"blue",textDecoration:"underline"}}>www.bonecole.com</a>.En naviguant sur le site, L'utilisateur les accepte.L'utilisateur doit toutefois donner son consentement quant à l’utilisation de certains cookies.
      <br/><br/>
      A défaut d’acceptation, l’Utilisateur est informé que certaines fonctionnalités ou pages risquent de lui être refusées.L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son logiciel de navigation.
     </p>
    
    </Grid>


    <Grid item xs={12} style={{paddingTop:"0.5rem"}}>
    
    <p style={{position:"relative",marginLeft:"0.4rem",display: 'flex', justifyContent: 'space-between',fontWeight:"bold",fontSize:"0.9rem",paddingBottom:"0.5rem",borderBottom:"3px solid black"}}>
    ARTICLE 8 : Droit applicable et juridiction compétente
     </p>

     <p style={{padding:"5%"}}>

     La législation guinéenne s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux guinéens seront seuls compétents pour en connaître.Pour  toute  question  relative  à  l’application  des  présentes  CGU,  vous  pouvez  joindre  l’éditeur  aux coordonnées inscrites à l’ARTICLE 1.
     </p>
    
    </Grid>


   </Grid>


   <p style={{paddingTop:"1.5rem",paddingBottom:"1.5rem"}}>
  

   
   </p>
       

</Container>
    </>
  );
}

export default TermsPage;