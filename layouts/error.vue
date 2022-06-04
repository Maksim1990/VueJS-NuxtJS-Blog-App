<template>
  <div>
    <h1>Whoops, {{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <NuxtLink v-if="isAuthError" :to="loginURL">
      Login
    </NuxtLink>
    <NuxtLink v-else to="/">
      Home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
      loginURL: '/auth/login'
    }
  },
  computed: {
    isAuthError() {
      return this.error.statusCode === 401;
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
