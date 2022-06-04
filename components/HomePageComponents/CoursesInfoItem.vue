<template>
  <b-col md="6" sm="12">
    <div class="course-item">
      <b-img rounded :alt="text" :src="img" :class="classObject" v-b-hover="hoverHandler"></b-img>
      <h4>{{ text }}</h4>
    </div>
  </b-col>
</template>
<script>
export default {
  data() {
    return {
      classObject: {
        hoveredImage: false
      }
    }
  },
  props: {
    text: {
      type: String,
      required: true
    },
    img: {
      type: String,
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
<style scoped>
.course-item {
  background-color: white;
  color: black;
  height: 400px;
  border-radius: 20px;
  margin: 20px 10px 0 10px;
}

.course-item > img {
  width: 100%;
  height: auto;
}

@media (max-width: 995px) {
  .course-item {
    height: 300px;
  }
}
</style>
