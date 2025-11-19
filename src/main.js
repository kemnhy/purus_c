import "./assets/main.css";
import "./assets/styles/main.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSignaturePad from 'vue-signature-pad';

createApp(App).use(router).use(VueSignaturePad).mount("#app");