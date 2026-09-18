<script setup>
import TodoList from './components/TodoList.vue'
</script>

<template>
  <main class="page">
    <TodoList />
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
}
</style>
