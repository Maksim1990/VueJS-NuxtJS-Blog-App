<template>
  <div class="h100">
    <div v-if="messages.length === 0" class="h100 d-flex align-items-center">
      <div class="container text-center">
        <img src="~/assets/images/design/noresult.png" />
      </div>
    </div>
    <MessageItem v-else v-for="message in messages" :authUser="authUser" :key="message._id" :message="message"/>
  </div>
</template>

<script>
import MessageItem from "~/components/Messages/RightPanel/MessageItem";

export default {
  components: {MessageItem},
  props: {
    messages: {
      type: Array,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  }
}
</script>

