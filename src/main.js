import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import component_loading from "@/directives/component_loading.js";
import whole_page_loading from '@/directives/whole_page_loading.js';

const app = createApp(App);

app.directive('component-loading', component_loading); // Register globally
app.directive('whole-page-loading', whole_page_loading); // Register globally

app.mount('#app')
