import axios from "axios";
import { queryString } from "@/utils/utils";

export class UserInfoAPI {
  static getUserInfo() {
    return axios.get(`${process.env.V1}/user/info${queryString({})}`);
  }
}
