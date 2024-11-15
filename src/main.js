import { createApp } from 'vue'
import App from './App.vue'
import router from './Router';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


// Crear la aplicación
const app = createApp(App);

// Usar el router
app.use(router);

// Montar la aplicación
app.mount('#app');
