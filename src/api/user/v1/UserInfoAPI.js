import axios from "axios";
import { queryString } from "@/utils/utils";

export default class UserInfoAPI {
  static getUserInfo() {
    return axios.get(`${process.env.V1}/user/info${queryString({})}`);
  }

  static getTestInfo() {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve({
          userName: "Simpson",
          age: 31,
          gender: "Male",
        });
      }, 100);
    });
  }
}
