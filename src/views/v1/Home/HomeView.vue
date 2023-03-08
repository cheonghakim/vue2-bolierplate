<script>
import { getCurrentInstance } from "vue";

export default {
  setup() {
    const instance = getCurrentInstance();
    const proxy = instance.proxy;
    proxy.$subject.$emit("error", "test!");
  },
};
</script>

<template>
  <div>메인화면</div>
</template>
