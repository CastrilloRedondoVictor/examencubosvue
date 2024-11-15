import { createRouter, createWebHistory } from 'vue-router';

import HomeComponent from './components/HomeComponent.vue';
import CuboComponent from './components/CuboComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import MarcaComponent from './components/MarcaComponent.vue';
import ComprasComponent from './components/ComprasComponent.vue';
import PedidoComponent from './components/PedidoComponent.vue';

const routes = [
    { 
        path: '/', 
        component: HomeComponent, 
    },
    { 
        path: '/cubo/:id', 
        component: CuboComponent, 
    },
    { 
        path: '/marca/:marca',
        component: MarcaComponent, 
    },
    { 
        path: '/login', 
        component: LoginComponent, 
    },
    { 
        path: '/compras', 
        component: ComprasComponent, 
    },
    { 
        path: '/pedido', 
        component: PedidoComponent, 
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
