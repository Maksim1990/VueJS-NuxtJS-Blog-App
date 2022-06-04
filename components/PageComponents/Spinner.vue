<template>
  <div class="text-center mb-3 d-flex justify-content-between" :class="{h100:isUseFullHeightClass}">
    <b-spinner class="m-auto" :variant="variant"></b-spinner>
  </div>
</template>

<script>
export default {
  data() {
    return {
      variant: 'secondary',
      defaultFullHeight: false,
    }
  },
  props: {
    isFullHeight: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    isUseFullHeightClass:function () {
      return this.isFullHeight ? this.isFullHeight : this.defaultFullHeight;
    }
  }
}
</script>
