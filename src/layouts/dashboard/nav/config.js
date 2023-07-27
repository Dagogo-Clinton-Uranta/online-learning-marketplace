import SvgColor from '../../../components/svg-color';
import {AiOutlineHome} from 'react-icons/ai'
 import {AiOutlineInbox} from 'react-icons/ai'
 import {AiOutlineBulb} from 'react-icons/ai'
 import {CgToolbox} from 'react-icons/cg'
 import {FiSettings} from 'react-icons/fi' 
 import {AiOutlineLock} from 'react-icons/ai'
 import {BsFillChatFill} from 'react-icons/bs'

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
    path: '/dashboard/other-courses',
    icon:<AiOutlineInbox/>
    // icon: icon('ic_analytics'),
  },
 
  {
    title: `All Courses`,
     path: '/dashboard/popular-courses',
    // icon: icon('ic_msg'),
    //iconLabel: 'msg',
    icon:<CgToolbox/>
  },
  {
    title: `Chat`,
     //path: '/dashboard/popular-courses',
    // icon: icon('ic_msg'),
    //iconLabel: 'msg',
    icon:<BsFillChatFill/>
  },

  {
    title: `Settings`,
    // path: '/dashboard/popular-courses',
    // icon: icon('ic_msg'),
    //iconLabel: 'msg',
    icon:<FiSettings/>
  },
  
  
];

export default navConfig;
