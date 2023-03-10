<script>
import UserInfoAPI from "@/api/user/UserInfoAPI";
import { computed, getCurrentInstance, reactive, ref } from "vue";

export default {
  setup() {
    const instance = getCurrentInstance();
    const proxy = instance.proxy;
    const store = proxy.$store;

    // store
    const runningEvtMessages = computed(() => store.state.runningEvtMessages);
    const pushMsg = (data) => store.dispatch("pushMsg", data);
    const showToast = () => store.dispatch("showToast");

    // $subject
    proxy.$subject.$emit("success", "Main page!");

    // reactive
    const userData = reactive({ data: {} });

    // ref
    const testRef = ref([10, 20, 30]);

    // methods
    const getUserInfo = async () => {
      try {
        const data = await UserInfoAPI.v1.getTestInfo();
        userData.data = data;
      } catch (error) {
        proxy.$subject.$emit("error", error);
      }
    };
    getUserInfo();
    pushMsg({
      title: "Vue2 test",
      content: "Test를 합니다!",
    });
    showToast();
    return {
      userData,
      runningEvtMessages,
      testRef,
    };
  },
};
</script>

<template>
  <div>
    <div class="text-danger">메인화면</div>
    <div>{{ userData.data.userName }}</div>
    <div>{{ userData.data.age }}</div>

    <div v-for="(item, index) in testRef" :key="index">{{ item }}</div>
  </div>
</template>
