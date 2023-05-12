import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/clientside/LoginAdmin.vue')
    },
    {
        path: '/show',
        name: 'clientside.show',
        component: () => import('../views/clientside/ShowClient.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;