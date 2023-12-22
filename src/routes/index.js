import { createRouter, createWebHistory } from 'vue-router'


const Home = () => import("../views/Home.vue");
const MutualFundDashboard = () => import("../views/MutualFundDashboard.vue");

const routes = [
    { path: "/", component: Home },
    { path: "/mf/dashboard/:investor", component: MutualFundDashboard },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;