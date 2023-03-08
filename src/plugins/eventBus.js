import Vue from "vue";
import { Subject } from "rxjs";

const listeners$ = {};
const install = (vue) => {
  vue.prototype.$eventBus = new Vue();
  vue.prototype.$subject = (function () {
    return {
      $on: (name, callback) => {
        listeners$[name] = new Subject().subscribe(callback);
      },
      $emit: (name, callback) => {
        if (!listeners$[name])
          console.error(
            `Cannot find "${name}" in listeners$, callback: ${callback}`
          );

        listeners$[name]?.next(callback);
      },
      $off: (name) => listeners$[name]?.unsubscribe(),
    };
  })();
};

Vue.use(install);
