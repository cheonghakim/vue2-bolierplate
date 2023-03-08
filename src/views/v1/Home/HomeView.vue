<script>
import UserInfoAPI from "@/api/user/UserInfoAPI";
import { getCurrentInstance, reactive } from "vue";

export default {
  setup() {
    const instance = getCurrentInstance();
    const proxy = instance.proxy;
    proxy.$subject.$emit("error", "test!");
    const userData = reactive({ data: {} });

    const getUserInfo = async () => {
      try {
        const data = await UserInfoAPI.v1.getTestInfo();
        userData.data = data;
      } catch (error) {
        proxy.$subject.$emit("error", error);
      }
    };
    getUserInfo();

    return {
      userData,
    };
  },
};
</script>

<template>
  <div>
    <div class="text-danger">메인화면</div>
    <div>{{ userData.data.userName }}</div>
    <div>{{ userData.data.age }}</div>
  </div>
</template>
