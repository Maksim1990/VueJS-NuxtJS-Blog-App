<template>
  <div class="overflow-hidden mb-3">
    <b-row no-gutters>
      <b-col md="12">
        <b-alert :show="error.type!==null" variant="danger">
          {{ error.message }}
        </b-alert>
      </b-col>

      <b-col md="12">
        <Spinner v-if="showSpinner"/>
        <b-row v-else class="mt-5">
          <b-col md="3" sm="12" class="text-center">
            <b-col md="12" class="text-center">
              <b-button variant="outline-secondary" size="sm" class="mb-3" :to="{name:'users'}">Back to All Users
              </b-button>
            </b-col>
            <b-avatar size="12rem" class="app-avatar" :src="getUserAvatar(userData)"></b-avatar>
            <p class="mt-3">
              <b-button size="sm" v-if="isUserCanSeeItem(currentUser , userData)" type="submit" variant="warning"
                        :to="{name:'users-id-edit',params:{'id':$route.params.id}}">Edit
              </b-button>
              <b-button size="sm" v-if="isUserCanSeeItem(currentUser , userData)" variant="outline-danger"
                        @click="showConfirmationModal($route.params.id)">Delete
              </b-button>
            </p>
          </b-col>
          <b-col md="9" sm="12" v-if="userData !==null">
            <h1>{{ userData.name }} {{ userData.lastname }}</h1>
            <p>Email: {{ userData.email }}</p>
            <p>Country: {{ userData.country }}</p>
            <p>Phone: {{ userData.phone }}</p>
            <p>Zip code: {{ userData.zip }}</p>
            <p>Address: {{ userData.address }}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-modal v-if="userData !==null" :id="'delete-user-'+userData._id" button-size="sm">
        <h6>Do you want to delete this account?</h6>
      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="secondary" @click="cancel()">
          Cancel
        </b-button>
        <b-button size="sm" variant="success" @click="deleteUser(userData._id)">
          Delete
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Spinner from "~/components/PageComponents/Spinner";
import userItemQuery from '~/apollo/queries/userItem';
import deleteUser from '~/apollo/mutations/users/deleteUser';

export default {
  data() {
    return {
      userData: null,
      showSpinner: true,
      currentUser: null,
      error: {
        message: null,
        type: null,
      }
    }
  },
  components: {Spinner},
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
      this.showSpinner = false;
    }).catch((error) => {
      this.showSpinner = false;
      console.log(error)
    })
  },
  methods: {
    showConfirmationModal(userId){
      this.$bvModal.show('delete-user-'+userId)
    },
    async deleteUser(userId) {
      this.$bvModal.hide('delete-user-'+userId);
      this.showSpinner = true;
      await this.$apollo.mutate({
        mutation: deleteUser,
        variables: {
          id: userId
        }
      }).then((dataUser) => {
        this.showSpinner = false;
        if (dataUser.data.deleteUser !== undefined) {
          this.$nuxt.$emit('userDeleted', {userId: userId});
          if (this.currentUser._id === userId) {
            this.clearAuthUser();
          }
          this.$router.push({name: 'users'});
        }
      }).catch((error) => {
        // Error
        this.showSpinner = false;
        error = this.errorMessageFormatter(error)
        this.error.message = error.message
        this.error.type = error.extensions.reason
      })
    }
  },
  async created() {
    this.currentUser = this.getUserFromStore();
  }
}
</script>
