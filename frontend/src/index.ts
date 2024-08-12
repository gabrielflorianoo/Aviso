import './style.css';

import App from './App.vue';
import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import LogIn from './components/LogIn.vue';
import CreateMessage from './components/CreateMessage.vue';
import persistedState from 'pinia-plugin-persistedstate';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

// Creates the routes for the router element
const routes = [
    { path: '/', component: Home },
    { path: '/signup', component: SignUp },
    { path: '/login', component: LogIn },
    { path: '/createMessage', component: CreateMessage },
];

// Creates the router
const router = createRouter({
    /* 
        'history' - Uses browser's history.pushState
        to change the URL without realoding the page
    */
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();

// Ensures that the global state is preserved across page reloads and navigations
pinia.use(persistedState);

createApp(App).use(pinia).use(router).mount('#app');
