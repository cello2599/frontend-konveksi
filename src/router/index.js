import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/clientside/LoginAdmin.vue')
    },
    {
        path: '/show',
        name: 'ShowProduk',
        component: () => import('../views/clientside/ShowClient.vue')
    },
    {
        path: '/create',
        name: 'CreateProduk',
        component: () => import('../views/clientside/CreateProduk.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;