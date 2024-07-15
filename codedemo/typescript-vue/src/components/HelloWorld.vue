<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const store = useStore();
    const count = computed(() => store.state.count);
    const increment = () => store.dispatch('increment');
    
    return {
      count,
      increment
    };
  }
});
</script>

<style scoped>
.hello {
  padding: 20px;
}
</style>