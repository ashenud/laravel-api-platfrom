import './assets/main.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import companyRoutes from '@/router/company';
import { createPinia } from 'pinia';

// Create the router instance
const router = createRouter({
    history: createWebHistory(), // Use `createWebHistory` for history mode
    routes: [
        ...companyRoutes,
    ],
});

const app = createApp(App);
app.use(createPinia())
app.use(router);

app.mount('#app');
