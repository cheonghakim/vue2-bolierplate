import Vue from "vue";
import axios from "axios";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

new Subject().pipe(debounceTime(1000)).subscribe((msg) => {
  Vue.prototype.$subject.$emit("error", msg);
});

axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const code = err?.response?.data?.code;
    console.error(code);
    return Promise.reject(err);
  }
);
