import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import component_loading from "@/directives/component_loading.js";

const app = createApp(App);

app.directive('component-loading', component_loading); // Register globally

app.mount('#app')
