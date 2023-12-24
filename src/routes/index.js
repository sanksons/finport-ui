import { createRouter, createWebHistory } from 'vue-router'
import { isUserAuthenticated } from '../utils/common.js'


const Home = () => import("../views/Home.vue");
const Login = () => import("../views/Login.vue");
const MutualFundDashboard = () => import("../views/MutualFundDashboard.vue");
const MutualFundDetailed = () => import("../views/MFDetails.vue");

const routes = [
    { path: "/", name: 'Home', component: Home },
    { path: "/login", name: 'Login', component: Login },
    { path: "/mf/detailed/:investor", component: MutualFundDetailed },
    { path: "/mf/dashboard/", name: 'MFDash', component: MutualFundDashboard },

]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (!isUserAuthenticated() && to.name !== 'Login') { // abvoid infinite loop.
        // redirect the user to the login page
        return { name: 'Login' }
    }

})


export default router;