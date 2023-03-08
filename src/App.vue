<script>
import EventMessage from "@/components/Event/EventMessage.vue";
export default {
  components: {
    EventMessage,
  },
};
</script>

<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
    <EventMessage />
  </div>
</template>
