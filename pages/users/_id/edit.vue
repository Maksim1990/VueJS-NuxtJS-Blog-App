<template>
  <div >
    <Spinner v-if="showSpinner"/>
    <div v-if="userData !== null" class="mb-5">
      <b-button variant="outline-secondary" size="sm" :to="{name:'users-id',params:{'id':userData._id}}">
        Back to profile
      </b-button>
      <UserForm :user="userData"/>
    </div>
  </div>
</template>

<script>
import userItemQuery from '~/apollo/queries/userItem';
import Spinner from "~/components/PageComponents/Spinner";
import UserForm from "~/components/Users/UserForm";

export default {
  components: {UserForm, Spinner},
  layout: 'default-static',
  data() {
    return {
      userData: null,
      currentUser: null,
      showSpinner: true,
    }
  },
  async fetch() {
    this.showSpinner = true;
    await this.$apollo.query({
      query: userItemQuery,
      fetchPolicy: 'no-cache',
      variables: {
        id: this.$route.params.id,
      },
    }).then((res) => {
      this.userData = res.data.user;
      console.log(this.userData)
      this.showSpinner = false;
    }).catch(() => {
      this.showSpinner = false;
    })
  }
}
</script>
