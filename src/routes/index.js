import { createRouter, createWebHistory } from 'vue-router'
import { isUserAuthenticated } from '../utils/common.js'


const Home = () => import("../views/Home.vue");
const Login = () => import("../views/Login.vue");
const MutualFundDashboard = () => import("../views/MutualFundDashboard.vue");
const StockDashboard = () => import("../views/StockDashboard.vue");
const MutualFundDetailed = () => import("../views/MFDetails.vue");
const StockDetailed = () => import("../views/StockDetails.vue");

const routes = [
    { path: "/", name: 'Home', component: Home },
    { path: "/login", name: 'Login', component: Login },
    { path: "/mf/detailed/:id", name: 'MFDetail', component: MutualFundDetailed },
    { path: "/mf/dashboard/", name: 'MFDash', component: MutualFundDashboard },
    { path: "/stock/dashboard/", name: 'StockDash', component: StockDashboard },
    { path: "/stock/detailed/:id", name: 'StockDetail', component: StockDetailed },

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