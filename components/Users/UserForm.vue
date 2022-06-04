<template>
  <div>
    <Spinner v-if="showSpinner"/>
    <b-form v-else @submit="onSubmit">
      <b-alert :show="error.type!==null" variant="danger">
        {{ error.message }}
      </b-alert>
      <b-form-group id="input-group-1" label="Name:">
        <b-form-input
          id="input-1"
          v-model="userData.name"
          type="text"
          :placeholder="userData.name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Lastname:">
        <b-form-input
          id="input-2"
          v-model="userData.lastname"
          type="text"
          :placeholder="userData.lastname"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Email:">
        <b-form-input
          id="input-3"
          v-model="userData.email"
          type="text"
          :placeholder="userData.email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Country:">
        <b-form-input
          id="input-4"
          v-model="userData.country"
          type="text"
          :placeholder="userData.country"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Country code:">
        <b-form-input
          id="input-5"
          v-model="userData.country_code"
          type="text"
          :placeholder="userData.country_code"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="City:">
        <b-form-input
          id="input-6"
          v-model="userData.city"
          type="text"
          :placeholder="userData.city"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Zip code:">
        <b-form-input
          id="input-7"
          v-model="userData.zip"
          type="text"
          :placeholder="userData.zip"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-8" label="Phone:">
        <b-form-input
          id="input-8"
          v-model="userData.phone"
          type="text"
          :placeholder="userData.phone"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-9"  label="Address:">
        <b-form-input
          id="input-9"
          v-model="userData.address"
          type="text"
          :placeholder="userData.address"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-10" label="Biography:">
        <b-form-input
          id="input-10"
          v-model="userData.bio"
          type="text"
          :placeholder="userData.bio"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="warning">Update</b-button>
    </b-form>
  </div>
</template>

<script>
import updateUser from '~/apollo/mutations/users/updateUser';
import Spinner from "~/components/PageComponents/Spinner";

export default {
  data() {
    return {
      showSpinner: false,
      userData: {},
      error: {
        message: null,
        type: null,
      }
    }
  },
  props: {
    user: {
      type: Object,
      default: null,
      required: true,
    }
  },
  components: {Spinner},
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.showSpinner = true;
      this.updateUser()
    },
    async updateUser() {
      await this.$apollo.mutate({
        mutation: updateUser,
        variables: {
          input: {
            _id: this.userData._id,
            name: this.userData.name,
            lastname: this.userData.lastname,
            email: this.userData.email,
            country: this.userData.country,
            country_code: this.userData.country_code,
            city: this.userData.city,
            zip: this.userData.zip,
            phone: this.userData.phone,
            address: this.userData.address,
            bio: this.userData.bio,
          }
        }
      }).then((dataUser) => {
        this.showSpinner = false;
        if (dataUser.data.updateUser !== undefined) {
          this.$nuxt.$emit('userUpdated', {postId: this.userData._id});
          this.$router.push({name: 'users-id', params: {id: this.userData._id}});
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
  created() {
    this.userData = this.user;
  }
}
</script>
