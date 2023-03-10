<script>
import EventMessage from "@/components/Event/EventMessage.vue";
import ToastMessage from "@/components/Event/ToastMessage.vue";
export default {
  components: {
    EventMessage,
    ToastMessage,
  },
};
</script>

<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
    <EventMessage />
    <ToastMessage />
  </div>
</template>
