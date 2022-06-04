<template>
  <b-col md="9" class="m-area m-area-right">
    <div class="h100" style="position: relative;">
      <div v-if="!showMessages" class="h100 d-flex align-items-center">
        <div class="container text-center">
          No chat selected.
          Please select any chat or create new one.
        </div>
      </div>
      <div v-else-if="showSpinner" class="h100">
      <Spinner :is-full-height="true"/>
      </div>
      <template v-else>
        <div style="overflow-y: auto;height: 85%;" id="messageBlockB" @scroll="handleScroll">
          <div id="scrollBottom" v-if="showScrollBar" @click="returnToBottom">Scroll to bottom</div>
          <Observer v-if="showObserver" @intersect="loadMessages"/>
          <MessagesBlock :messages="messages.slice().reverse()" :authUser="authUser"/>
        </div>
        <InputView/>
      </template>
    </div>
  </b-col>
</template>
<script>
import messagesQuery from '~/apollo/queries/messages';
import Spinner from "~/components/PageComponents/Spinner";
import Observer from "~/components/PageComponents/Observer";
import MessagesBlock from "~/components/Messages/RightPanel/MessagesBlock";
import InputView from "~/components/Messages/RightPanel/InputView";

export default {
  components: {MessagesBlock, InputView, Observer, Spinner},
  data: () => ({
    messages: [],
    offset: 0,
    number: 20,
    chatId: null,
    authUser: null,
    orderType: "DESC",
    showMessages: false,
    cursorMessageId: null,
    firstMessageId: null,
    isLoadedNewMessages: false,
    showScrollBar: false,
    showSpinner: false,
    showObserver: false,
  }),
  updated() {
    if (this.showScrollBar && !this.isLoadedNewMessages) {
      return;
    }
    this.scrollToBottom();
    this.isLoadedNewMessages = false;
  },
  methods: {
    async loadMessages() {
      //If offset equal to NULL then reached full list of chats from DB
      if (this.offset !== null && this.showObserver && this.messages.length >= this.number) {
        await this.fetchMessages()
      }
    },
    returnToBottom: function () {
      this.showScrollBar = false;
      this.cursorMessageId = this.firstMessageId
      this.scrollToBottom()
    },
    scrollToBottom: function () {
      this.$el.scrollTop = this.$el.lastElementChild.offsetTop;
      let element = document.getElementById('message-' + this.cursorMessageId);
      if (element) {
        element.scrollIntoView();
      }
    },
    async fetchMessages() {
      this.isLoadedNewMessages = true;
      this.showSpinner = true;
      await this.$apollo.query({
        query: messagesQuery,
        fetchPolicy: 'no-cache',
        variables: {
          user_id: this.authUser._id,
          chat_id: this.chatId,
          offset: this.offset,
          number: this.number,
          orderBy: [{column: "created_at", order: this.orderType}],
        },
      }).then((res) => {
        this.showSpinner = false;
        if (res.data.messages.length === 0) {
          this.offset = null;
          return;
        }
        this.showObserver = true;
        const messages = res.data.messages;
        this.cursorMessageId = messages[0]._id;
        if (this.firstMessageId === null) {
          this.firstMessageId = this.cursorMessageId;
        }
        this.cursorMessageId = messages[0]._id;
        this.messages = [...this.messages, ...messages];
        this.offset += this.number;
      }).catch((error) => {
        this.showSpinner = false;
        console.log(error)
      })
    },
    handleScroll() {
      if (this.firstMessageId === null) {
        return;
      }

      const element = document.getElementById('message-' + this.firstMessageId);
      if (element === null) {
        return;
      }

      const rect = element.getBoundingClientRect();
      if (!(rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth))
      ) {
        this.showScrollBar = true;
      }else{
        this.showScrollBar = false;
      }
    }
  },
  created() {
    this.$nuxt.$on('chatSelectedEvent', (data) => {
      this.messages = [];
      this.showMessages = true;
      this.firstMessageId = null;
      this.showObserver = false;
      this.offset = 0;
      this.chatId = data.chatId;
      this.authUser = data.authUser;
      this.fetchMessages();
    })
  },
}
</script>
<style scoped>
.m-area-right {
  border-left-style: none;
}

#scrollBottom {
  position: absolute;
  display: inline-block;
  background-color: #8080804d;
  width: 120px;
  margin-left: 30%;
  padding: 2px;
  border-radius: 20px;
}

@media (max-width: 800px) {
  .m-area-right {
    border-left-style: solid;
  }
}
</style>
