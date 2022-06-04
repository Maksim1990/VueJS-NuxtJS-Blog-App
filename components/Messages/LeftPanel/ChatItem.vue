<template>
  <div class="m-item" :style="{backgroundColor:chatColor}" @click="chatSelected(chat._id)">
    <b-row class="m-item-row">
      <b-col lg="4" class="d-none d-lg-block">
        <b-avatar variant="primary" text="BV"></b-avatar>
      </b-col>
      <b-col lg="8">{{ chat.user.name }}</b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultColor: '#dddddd',
      activeColor: '#bac1be',
      hoverColor: '#bac1be',
      isChatSelected: false,
    }
  },
  props: {
    chat: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  },
  computed: {
    chatColor: {
      get: function () {
        return this.isChatSelected ? this.activeColor : this.defaultColor;
      },
      // setter
      set: function (chatColor) {
        this.isChatSelected = this.activeColor === chatColor;
      }
    }
  },
  methods: {
    chatSelected(chatId) {
      this.$nuxt.$emit('chatSelectedEvent', {chatId: chatId, authUser: this.authUser});
    }
  },
  created() {
    this.$nuxt.$on('chatSelectedEvent', (data) => {
      this.chatColor = data.chatId !== this.chat._id ? this.defaultColor : this.activeColor;
    })
  },
}
</script>
<style scoped>
.m-item {
  position: relative;
  height: 100px;
}

.m-item-row {
  margin: 0;
  padding: 10% 0 10% 0;
}
</style>
