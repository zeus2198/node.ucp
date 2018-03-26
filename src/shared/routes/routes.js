/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/
import indexPage from '../components/index';
import loginPage from '../components/login';
import userProfile from '../components/user';
import searchPage from '../components/search';
import topPage from '../components/top';
import propPage from '../components/properties';
import settingsPage from '../components/settings';
import logout from '../components/logout';
import NotFound from '../components/NotFound';

function getFullCatName(cat) {
    switch(cat.toLowerCase()) {
        case 'cash':        
        case 'score': 
        case 'kills': 
        case 'deaths':
            return cat.charAt(0).toUpperCase() + cat.substring(1);
        case 'kd': return 'K/D';
        case 'races': return 'Races won';
        case 'onlinetime': return 'Online Time';
        default: return 'N/A';
    }
}

const routes = [    
    {
        path:"/",
        component: indexPage,
        exact: true,
        title: () => "node.ucp",
        keywords: () => "node.ucp,node ucp,node-ucp,nodejs,node-js,node js,control panel,user control panel,cp,ucp,isomorphic,react,javascript,server side rendering,scalable,flexible,modern,express,isomorphic",
        description: () => "node.ucp is a modern isomorphic control panel built on top of nodejs and react. It is scalable, flexible and an awesome looking control panel."
    },
    {
        path: "/login",
        component: loginPage,
        title: () => "Login | node.ucp",
        keywords: () => "node.ucp,node ucp,node-ucp,login,sign-in,sign in",
        description: () => "node.ucp's login page"
    },
    {
        path: "/user/:userid",
        component: userProfile,
        title: (data) => `${data.name}'s Profile | node.ucp`,
        keywords: (data) => `node.ucp,node ucp,node-ucp,${data.name},profile,info,id`,
        description: (data) => `${data.name}'s profile'`
    },
    {
        path: "/search/:text?",
        component: searchPage,
        title: (data, params) => `${params.text ? params.text + ' - ' : ''}Search | node.ucp`,
        keywords: (data, params) => `node.ucp,node ucp,node-ucp,${params.text ? params.text : 'search page'},search,result`,
        description: (data, params) => `${params.text ? params.text + ' ' : ''}'Search Result`
    }, 
    {
        path: "/top/:cat",
        component: topPage,
        title: (data, params) => `${getFullCatName(params.cat)} Top List | node.ucp`,
        keywords: (data, params) => `node.ucp,node ucp,node-ucp,${getFullCatName(params.cat)},${params.cat},top,toplist,top list,top page`,
        description: (data, params) => `${getFullCatName(params.cat)} top list`
 
    },
    {
        path: "/properties",
        component: propPage,      
        title: () => "Properties | node.ucp",
        keywords: () => "node.ucp,node ucp,node-ucp,properties,houses,map,google map",
        description: () => "node.ucp's google map implementation"
    },
    {
        path: "/settings",
        component: settingsPage,
        protected:true,
        title: () => "Settings | node.ucp",
        keywords: () => "",
        description: () => "Settings page"
    },
    {
        path: "/logout",
        component: logout,
        title: () => `Logout | node.ucp`,
        keywords: () => "",
        description: () => ""
    },
    {
        // make sure not found route is always at last
        component: NotFound,
        title: () => `404 Page not found | node.ucp`,
        keywords: () => "404,not-found,not found,meme",
        description: () => "404 Page not found"
    }
];

export default routes;