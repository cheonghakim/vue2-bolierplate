<script>
import { ref, getCurrentInstance, watch, computed } from "vue";

export default {
  setup() {
    const instance = getCurrentInstance();
    const store = instance?.proxy?.$store;

    const pushMsg = (data) => store.dispatch("pushMsg", data);
    const showToast = () => store.dispatch("showToast");
    const runningEvtMessages = computed(
      () => store.state.runningEvtMessages
    );
    const currentNewNotis = computed(() => {
      return store.getters["currentNewNotis"];
    });
    const allMessages = computed(() => {
      return store.getters["allMessages"];
    });

    // 알림을 업데이트하면 자동으로 호출, socket을 통해 알림을 업데이트
    watch(
      runningEvtMessages,
      () => {
        showToast();
      },
      {
        immediate: false,
        deep: true,
      }
    );

    return {
      pushMsg,
      showToast,
      runningEvtMessages,
      currentNewNotis,
      allMessages,
    };
  },
};
</script>

<template>
  <notifications :group="'norification'" :position="'top center'">
    <template slot="body" slot-scope="{ item, close }">
      <div
        class="my-notification"
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
                <router-link :to="item.data.link" class="noti-router">{{
                  item.title
                }}</router-link>
              </strong>
              <small class="text-muted mr-2" v-if="item.regDtime">{{
                item.regDtime
              }}</small>
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
.vue-notification-group {
  width: 500px !important;
}

.my-notification {
  margin: 0.5rem;
  border-radius: 5px;
  color: #856404;
  .toast-custom-header {
    padding: 0.5rem;
    background: #fff2c9;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    .noti-router {
      text-decoration: underline !important;
      color: #856404;
    }
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
    padding: 0.5rem;
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
