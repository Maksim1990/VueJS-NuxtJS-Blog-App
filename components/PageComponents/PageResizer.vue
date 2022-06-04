<template>
  <div/>
</template>

<script>

export default {
  data() {
    return {
      windowHeight: null,
    }
  },
  watch: {
    windowHeight(newHeight, oldHeight) {
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (process.client) {
        window.addEventListener('resize', this.onResize);
      }
    })
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener('resize', this.onResize);
    }
  },
  methods: {
    onResize() {
      if (process.client) {
        this.$emit("pageResize", window.innerHeight);
      }
    }
  }
}
</script>
