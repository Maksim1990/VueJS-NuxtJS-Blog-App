<template>
  <b-col md="10" offset-md="1">
    <Spinner v-if="showSpinner"/>
    <template v-else>
      <FormErrorsAlertBar :show="error.messages!==null" :messages="error.messages"/>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-1"
            v-model="email"
            label="Email:"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success">Reset password</b-button>
      </b-form>
    </template>
  </b-col>
</template>

<script>
import Spinner from "~/components/PageComponents/Spinner";
import FormErrorsAlertBar from "~/components/PageComponents/FormErrorsAlertBar";
import forgetPasswordMutation from '~/apollo/mutations/forgetPassword';

export default {
  components: {Spinner,FormErrorsAlertBar},
  data() {
    return {
      error: {messages: null},
      showSpinner: false,
      email: null,
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.showSpinner = true;
      if (this.email !== '') {
        this.sendForgetPasswordCode(this.email)
      }
    },
    async sendForgetPasswordCode(email) {
      await this.$apollo.mutate({
        mutation: forgetPasswordMutation,
        variables: {email: email}
      }).then((data) => {
        this.showSpinner = false;
        if (data.data.forgetPassword.confirmed) {
          this.$router.push({name: 'auth-reset-password', query: {email: email}});
        } else {
          this.error.messages = [data.data.forgetPassword.message];
        }
      }).catch((error) => {
        this.showSpinner = false;
        error = this.errorMessageFormatter(error);
        this.error.messages = [error.message];
        console.log(error);
      })
    }
  }
}
</script>
