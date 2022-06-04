<template>
  <div class="b-image-auth">
    <b-img
      class="animate__animated m1 mb-2" :class="effect"
      :width="width"
      :height="height"
      :src="src"
    ></b-img>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    effect: {
      type: String,
      default: 'animate__zoomIn'
    }
  }
}
</script>

