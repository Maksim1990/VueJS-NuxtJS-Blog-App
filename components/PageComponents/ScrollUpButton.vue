<template>
  <transition name="fade">
    <div class="s-button" v-show="scY > 0" :style="scrollStyle" @click="toTop">
      <p class="h1 mb-2 ml-3">
        <b-icon icon="arrow-up-square"></b-icon>
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ScrollUpButton",
  data() {
    return {
      scTimer: 0,
      scY: 0,
    }
  },
  props: {
    bottom: {
      type: Number,
      default: 0
    }
  },
  computed:{
    scrollStyle: function (){
      return {
        bottom: this.bottom + 'px'
      };
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      if (this.scTimer) return;
      this.scTimer = setTimeout(() => {
        this.scY = window.scrollY;
        this.$nuxt.$emit('changeNavBarColor', this.scY);
        clearTimeout(this.scTimer);
        this.scTimer = 0;
      }, 100);
    },
    toTop: function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  },
}
</script>

<style scoped>
.s-button {
  position: fixed;
  right: 10px;
  color: #0006062b;
}

.s-button:hover {
  color: #00000073;
}
</style>
