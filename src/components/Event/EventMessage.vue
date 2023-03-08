<script>
import { ref, getCurrentInstance } from "vue";

export default {
  name: "EventMessage",
  setup() {
    // 메세지 이벤트 정의
    const instance = getCurrentInstance();
    const proxy = instance.proxy;
    const messageCallback = (message) => {
      proxy.$notify({
        group: "eventMessage",
        title: "시스템 메세지",
        duration: 10000,
        text: message,
        data: { link: "", variant: "info" },
        closeOnClick: true,
        type: "info",
      });
    };
    const errorCallback = (message) => {
      proxy.$notify({
        group: "eventMessage",
        title: "에러 메세지",
        duration: 10000,
        text: message,
        data: { link: "", variant: "danger" },
        closeOnClick: true,
        type: "danger",
      });
    };
    const successCallback = (message) => {
      proxy.$notify({
        group: "eventMessage",
        title: "성공 메세지",
        duration: 10000,
        text: message,
        data: { link: "", variant: "success" },
        closeOnClick: true,
      });
    };
    const warningCallback = (message) => {
      proxy.$notify({
        group: "eventMessage",
        title: "경고 메세지",
        duration: 10000,
        text: message,
        data: { link: "", variant: "warning" },
        closeOnClick: true,
      });
    };

    proxy.$subject.$on("info", messageCallback);
    proxy.$subject.$on("error", errorCallback);
    proxy.$subject.$on("success", successCallback);
    proxy.$subject.$on("warning", warningCallback);

    return {
      messageCallback,
      errorCallback,
      successCallback,
      warningCallback,
    };
  },
  beforeDestroy() {
    this.$subject.$off("info", this.messageCallback);
    this.$subject.$off("error", this.errorCallback);
    this.$subject.$off("success", this.successCallback);
    this.$subject.$off("warning", this.warningCallback);
  },
};
</script>

<template>
  <notifications :group="'eventMessage'" :position="'top center'">
    <template slot="body" slot-scope="{ item, close }">
      <div
        class="event-message-custom"
        :class="{
          success: item.data.variant === 'success',
          danger: item.data.variant === 'danger',
          warning: item.data.variant === 'warning',
          info: item.data.variant === 'info',
        }"
      >
        <div class="">
          <header
            class="toast-header toast-custom-header"
            :class="{
              success: item.data.variant === 'success',
              danger: item.data.variant === 'danger',
              warning: item.data.variant === 'warning',
              info: item.data.variant === 'info',
            }"
          >
            <div class="d-flex flex-grow-1 align-items-baseline">
              <strong class="mr-auto">
                {{ item.title }}
              </strong>
            </div>
            <button
              type="button"
              aria-label="Close"
              class="close ml-auto font-size-20"
              style="border: transparent; background: transparent; margin: 0px"
              @click="close"
            >
              ×
            </button>
          </header>
          <div class="toast-body toast-custom-body">
            <div v-html="item.text" class="vhtml" />
          </div>
        </div>
      </div>
    </template>
  </notifications>
</template>

<style lang="scss">
.event-message-custom {
  margin: 0.5rem;
  border-radius: 5px;
  color: #856404;
  .toast-custom-header {
    padding: 0.5rem;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    &.success {
      background: #ade5d1;
    }
    &.warning {
      background: #fbd499;
    }
    &.danger {
      background: #fac1c1;
    }
    &.info {
      background: #b0d9fc;
    }
  }
  .toast-custom-body {
    padding: 0.8rem;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }

  &.success {
    background: #ccf0e3;
  }
  &.warning {
    background: #fce0b5;
  }
  &.danger {
    background: #fde1e1;
  }
  &.info {
    background: #c6e4ff;
  }
}
</style>
