
import Home from './components/Home'
import Menu from './components/Menu'
import About from './components/about/About'
import Admin from './components/Admin'
import Login from './components/Login'
import Regiter from './components/Regiter'

//二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import Histroy from './components/about/Histroy.vue'
import OrderingGuide from './components/about/OrderingGuide.vue'

// 三级路由
import Phone from './components/about/contact/Phone.vue'
import PersonName from './components/about/contact/PersonName.vue'

export const routes = [
    {path:'/',name:'homeLink',components:{
      default: Home,
      'orderingGuide':OrderingGuide,
      'delivery':Delivery,
      'histroy':Histroy,
    }},
    {path:'/menu',name:'menuLink',component: Menu},
    {path:'/about',name:'aboutLink',redirect:'/about/contact',component: About,children:[
      {path:'/about/contact',name:'contactLink',redirect:'/personName',component:Contact,children:[
        {path:'/phone',name:'Phone',component:Phone},
        {path:'/personName',name:'PersonName',component:PersonName}
      ]},
      {path:'/histroy',name:'histroyLink',component:Histroy},
      {path:'/delivery',name:'deliveryLink',component:Delivery},
      {path:'/orderingGuide',name:'orderingGuideLink',component:OrderingGuide},
    ]},
    {path:'/admin',name:'adminLink',component: Admin},
    {path:'/login',name:'loginLink',component: Login},
    {path:'/regiter',name:'regiterLink',component: Regiter},
    {path:'*',redirect:'/'}
] 