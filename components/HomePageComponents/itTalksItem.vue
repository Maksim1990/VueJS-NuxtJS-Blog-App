<template>
  <b-card
    :class="classObject"
    v-b-hover="hoverHandler"
    :img-src="post.image"
    :img-alt="post.id"
    img-top
    img-height="200"
    tag="article"
    class="my-3"
  >
    <b-card-text>{{ post.title }}</b-card-text>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      classObject: {
        hoveredImage: false
      },
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    hoverHandler(isHovered) {
      this.classObject.hoveredImage = isHovered;
    }
  }
}
</script>
