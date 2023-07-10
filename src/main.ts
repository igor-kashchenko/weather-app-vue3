import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/main.css';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import router from './router';

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
const app = createApp(App).use(router).use(vuetify);

app.use(pinia);
app.mount('#app');