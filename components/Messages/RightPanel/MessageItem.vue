<template>
  <b-row class="m-item mb-3" :id="'message-' + message._id">
    <b-col class="m-item-col" :style="{backgroundColor:messageColor}" md="6" :offset="messageOffset">
      {{ message.text }}
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      defaultColor: '#d9dddc',
      activeColor: '#d7e9d7',
    }
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    },
  },
  computed: {
    messageOffset: function () {
      return (this.message.sender._id === this.authUser._id) ? 6 : 0;
    },
    messageColor: function () {
      return this.messageOffset > 0 ? this.activeColor : this.defaultColor;
    }
  }
}
</script>
<style scoped>
.m-item {
  min-height: 40px;
  margin: 0 10px;
}

.m-item-col {
  border-radius: 10px;
  padding: 1% 3%;
}
</style>
