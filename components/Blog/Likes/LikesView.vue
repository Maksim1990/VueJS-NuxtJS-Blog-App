<template>
  <span>
      <b-icon scale="2" variant="danger" :icon="isLiked?'heart-fill':'heart'"></b-icon>
  </span>
</template>

<script>

export default {
  props: {
    isLiked: {
      type: Boolean,
      default: false
    }
  }
}
</script>
