import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import Home from './components/Home.vue';
import SignUp from './components/SignUp.vue';
import LogIn from './components/LogIn.vue';
import CreateMessage from './components/CreateMessage.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/signup', component: SignUp },
    { path: '/login', component: LogIn },
    { path: '/createMessage', component: CreateMessage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');
