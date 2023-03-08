import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/notifications";
import "./plugins/axios";
import "./plugins/eventBus";
import "./plugins/bootstrap";
import "./design/app.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
