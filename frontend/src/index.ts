import "./style.css";

import App from "./App.vue";
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import LogIn from "./components/LogIn.vue";
import CreateMessage from "./components/CreateMessage.vue";
import persistedState from "pinia-plugin-persistedstate";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
  { path: "/createMessage", component: CreateMessage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
pinia.use(persistedState);

createApp(App).use(pinia).use(router).mount("#app");
