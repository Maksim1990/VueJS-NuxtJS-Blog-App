<template>
  <b-col md="3" class="d-none d-md-block m-area m-area-left">
    <ChatItem v-for="chat in chats" :key="chat._id" :authUser="currentAuthUSer" :chat="chat"/>
    <Observer @intersect="loadChats"/>
    <Spinner v-if="showSpinner"/>
  </b-col>
</template>
<script>
import chatsQuery from '~/apollo/queries/chats';
import Spinner from "~/components/PageComponents/Spinner";
import Observer from "~/components/PageComponents/Observer";
import ChatItem from "~/components/Messages/LeftPanel/ChatItem";

export default {
  components: {ChatItem, Observer, Spinner},
  data: () => ({
    chats: [],
    offset: 0,
    number: 20,
    orderType: "DESC",
    showSpinner: true,
    currentAuthUSer: null
  }),
  methods: {
    async loadChats() {
      //If offset equal to NULL then reached full list of chats from DB
      if (this.offset !== null) {
        await this.fetchChats()
      }
    },
    async fetchChats() {
      let authUser = this.$store.getters['auth/getAuthUser'];
      if (authUser === null) {
        await this.getAuthUser();
        authUser = this.authUser;
      }
      this.currentAuthUSer = authUser;
      this.showSpinner = true;
      await this.$apollo.query({
        query: chatsQuery,
        fetchPolicy: 'no-cache',
        variables: {
          user_id: authUser._id,
          offset: this.offset,
          number: this.number,
          useCache: true,
          orderBy: [{column: 'updated_at', order: this.orderType}],
        },
      }).then((res) => {
        let chats = res.data.chats;
        if (chats.length > 0) {
          let chatsList = [];
          for (let i = 0; i < chats.length; i++) {
            const user = chats[i].first_member._id !== authUser._id ? chats[i].first_member : chats[i].second_member;
            chatsList.push({
              _id: chats[i]._id,
              user: user,
              created_at: chats[i].created_at,
              updated_at: chats[i].updated_at,
              updatedAtInMinutes: this.getDatesDifferenceInMinutes(chats[i].updated_at),
            });
            this.offset += this.number;
          }
          this.chats.push(...chatsList);
        } else {
          this.offset = null
        }
        this.showSpinner = false;
      }).catch((error) => {
        this.showSpinner = false;
        console.log(error)
      })
    },
  },
}
</script>
<style scoped>
.m-area-left {
  overflow-y: auto;
  border-right-style: none;
}
</style>
