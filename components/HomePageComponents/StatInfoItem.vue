<template>
  <b-col sm="4" xs="12" class="stat-item-col">
    <div class="stat-item animate__animated" :class="animation">
      <b-img
        v-bind="mainProps"
        :class="classObject"
        v-b-hover="hoverHandler"
        rounded
        :alt="text"
        :src="img"
      ></b-img>
      <h2>{{text}}</h2>
      <h6>{{textSub}}</h6>
    </div>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      classObject: {
        hoveredImage: false
      },
      mainProps: { width: 75, height: 75, class: 'm1 mb-2' },
    }
  },
  props: {
    text: {
      type: String,
      required: true
    },
    textSub: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    animation: {
      type: String,
      default: 'animate__fadeInLeft'
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
.stat-item{
  background-color: #16a382;
  color: white;
  height: 200px;
  border-radius: 20px;
  padding: 15px 15px;
  margin: 20px 10px 0 10px;
}
.stat-item-col{
  padding: 0 0;
}
</style>
