<template>
  <b-alert :show="messages!==null" dismissible variant="danger">
    <p v-for="message in messages">{{ message }}</p>
  </b-alert>
</template>
<script>
export default {
  props: ['messages'],
};
</script>
