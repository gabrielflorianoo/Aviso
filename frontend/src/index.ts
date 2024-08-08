import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";

const routes = [
	{ path: "/", component: Home },
	{ path: "/a", component: SignUp },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

createApp(App).use(router).mount("#app");
