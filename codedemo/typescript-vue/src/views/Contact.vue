<!--创建一个contact组件-->
<template>
  <div>
    <h1>Contact</h1>
    <p>这是一个联系人页面</p>
    <form>
      <label for="name">姓名</label>
      <input type="text" id="name" name="name" placeholder="请输入姓名">
      <label for="email">邮箱</label>
      <input type="email" id="email" name="email" placeholder="请输入邮箱">
      <label for="message">留言</label>
      <textarea id="message" name="message" placeholder="请输入留言"></textarea>
      <button type="submit">提交</button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Contact',
    data() {
        return {
        name: '',
        email: '',
        message: ''
        }
    },
    methods: {
        submitForm() {
        // 提交表单的逻辑
        }
    }
    

});
</script>
<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}


