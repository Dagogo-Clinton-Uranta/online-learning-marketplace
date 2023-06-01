import SvgColor from '../../../components/svg-color';
import {AiOutlineHome} from 'react-icons/ai'
 import {AiOutlineInbox} from 'react-icons/ai'
 import {AiOutlineBulb} from 'react-icons/ai'
 import {CgToolbox} from 'react-icons/cg'
 import {FiSettings} from 'react-icons/fi' 
 import {AiOutlineLock} from 'react-icons/ai'

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/home',
    icon:<AiOutlineHome/>
    // icon: icon('ic_analytics'),
  },
  {
    title: 'feed',
    path: '/dashboard/feed',
    icon:<AiOutlineInbox/>
    // icon: icon('ic_analytics'),
  },
  {
    title: 'incubator',
    path: '/dashboard/categories-videos',
    icon:<AiOutlineBulb/>
    // icon: icon('ic_disabled'),
    /*children: [
      {
        title: 'videos',
        type: 'item',
        // icon: 'Savings',
        path: '/dashboard/video',
      },
      {
        title: 'docs',
        type: 'item',
        // icon: 'LockIcon',
        path: '/dashboard/docs',
      },
    ],*/
  },
  {
    title: `bids`,
    // path: '/dashboard/chat',
    // icon: icon('ic_msg'),
    //iconLabel: 'msg',
    icon:<CgToolbox/>
  },
  {
    title: 'settings',
     path: '/dashboard/settings',
   // iconLabel: 'settings',
   icon:<FiSettings/>
  },
];

export default navConfig;
