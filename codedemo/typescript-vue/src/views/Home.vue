<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  }
});
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
}

.home img {
  width: 300px;
  height: 300px;
}
</style>