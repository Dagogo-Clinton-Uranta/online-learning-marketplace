import SvgColor from '../../../components/svg-color';
import {AiOutlineHome} from 'react-icons/ai'
 import {AiOutlineInbox} from 'react-icons/ai'
 import {AiOutlineBulb} from 'react-icons/ai'
 import {CgToolbox} from 'react-icons/cg'
 import {FiSettings} from 'react-icons/fi' 
 import {AiOutlineLock} from 'react-icons/ai'
 import {BsFillChatFill} from 'react-icons/bs'
 import {BiLogOut} from 'react-icons/bi'
 import {BiBasket} from 'react-icons/bi'
 import {SlDocs} from 'react-icons/sl'

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/home',
    icon:<AiOutlineHome/>
    // icon: icon('ic_analytics'),
  },
  {
    title: 'My Courses',
    // path: '/dashboard/test-payment',
    path: '/dashboard/saved-courses',
    icon:<AiOutlineInbox/>
    // icon: icon('ic_analytics'),
  },
  {
    title: 'Purchased Courses',
    path: '/dashboard/purchased-courses',
    icon:<AiOutlineInbox/>
    // icon: icon('ic_analytics'),
  },
  /*{
    title: 'Packs',
    path: '/dashboard/packs',
    icon:<SlDocs/>,
     icon: icon('ic_analytics'),
},*/
  {
    title: 'My Cart',
    path: '/dashboard/my-cart',
    icon:<BiBasket/>
    // icon: icon('ic_analytics'),
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon:<CgToolbox/>
    // icon: icon('ic_analytics'),
  },
  {
    title: 'Terms',
    path: '/dashboard/terms',
    icon:<SlDocs/>
    // icon: icon('ic_analytics'),
  },

  {
    title: 'Logout',
    path: '/dashboard/logout',
    icon:<BiLogOut/>
    // icon: icon('ic_analytics'),
  },
 
  
];

export default navConfig;
