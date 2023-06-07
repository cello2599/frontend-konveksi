import { createRouter, createWebHistory } from "vue-router"

const routes = [{
        path: '/',
        name: 'login',
        component: () =>
            import ('../views/clientside/LoginAdmin.vue')
    },
    {
        path: '/show',
        name: 'ShowProduk',
        component: () =>
            import ('../views/clientside/ShowProduk.vue')
    },
    {
        path: '/create',
        name: 'CreateProduk',
        component: () =>
            import ('../views/clientside/CreateProduk.vue')
    },
    {
        path: '/edit/:id',
        name: 'EditProduk',
        component: () =>
            import ('../views/clientside/EditProduk.vue')
    },
    {
        path: '/transaksi',
        name: 'Transaksi',
        component: () =>
            import ('../views/clientside/TransaksiProduk.vue')
    },
    {
        path: '/customer',
        name: 'ShowCustomer',
        component: () =>
            import ('../views/clientside/ShowCustomer.vue')
    },
    {
        path: '/createcustomer',
        name: 'CreateCustomer',
        component: () =>
            import ('../views/clientside/CreateCustomer.vue')
    },
    {
        path: '/detailTransaksi/:id_transaksi',
        name: 'DetailTransaksi',
        component: () =>
            import ('../views/clientside/DetailTransaksiProduk.vue'),
        props: true
    },
    {
        path: '/customer/:id_customer',
        name: 'EditCustomer',
        component: () =>
            import ('../views/clientside/EditCustomer.vue')
    },
    {
        path: '/transaksi/:id_transaksi',
        name: 'ShowDetailTransaksi',
        component: () =>
            import ('../views/clientside/ShowDetailTransaksi.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;