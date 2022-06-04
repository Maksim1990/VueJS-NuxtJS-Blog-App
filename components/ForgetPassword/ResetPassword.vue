<template>
  <b-col md="10" offset-md="1">
    <Spinner v-if="showSpinner"/>
    <template v-else>
      <FormErrorsAlertBar :show="error.messages!==null" :messages="error.messages"/>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-2"
            v-model="form.confirmation_code"
            label="Confirmation code:"
            type="text"
            placeholder="Enter received confirmation code"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            label="Email:"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3">
          <b-form-input
            id="input-3"
            v-model="form.password"
            label="Password:"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4">
          <b-form-input
            id="input-4"
            v-model="form.password_confirmation"
            label="Password confirmation:"
            type="password"
            placeholder="Please confirm your password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success">Submit</b-button>
      </b-form>
      <div class="mt-4">
        <p>Haven't received a confirmation code?</p>
        <span class="app-link" @click="resendConfirmationCode(form.email)">Resend confirmation code</span>
      </div>
    </template>
  </b-col>
</template>

<script>
import Spinner from "~/components/PageComponents/Spinner";
import forgetPasswordMutation from '~/apollo/mutations/forgetPassword';
import FormErrorsAlertBar from "~/components/PageComponents/FormErrorsAlertBar";
import forgetPasswordConfirmMutation from '~/apollo/mutations/forgetPasswordConfirm';

export default {
  components: {Spinner,FormErrorsAlertBar},
  data() {
    return {
      error: {messages: null},
      showSpinner: false,
      form: {
        email: this.$route.query.email,
        confirmation_code: null,
        password: null,
        password_confirmation: null,
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.showSpinner = true;
      this.resetPassword(this.form)
      this.form.email = '';
      this.form.confirmation_code = '';
      this.form.password = '';
      this.form.password_confirmation = '';
    },
    async resetPassword(form) {
      await this.$apollo.mutate({
        mutation: forgetPasswordConfirmMutation,
        variables: {
          code: form.confirmation_code,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation
        }
      }).then((data) => {
        if (data.data.forgetPasswordConfirm.confirmed) {
          this.$router.push({name: 'auth-login'});
        } else {
          this.error.messages = [data.data.forgetPasswordConfirm.message];
        }
      }).catch((error) => {
        // Error
        this.showSpinner = false;
        error = this.errorMessageFormatter(error);
        this.error.messages = [error.message];
        console.log(error);
      })
    },
    async resendConfirmationCode(email) {
      await this.$apollo.mutate({
        mutation: forgetPasswordMutation,
        variables: {email: email}
      }).then((data) => {
        this.showSpinner = false;
        if (data.data.forgetPassword.confirmed) {
          console.log(data.data.forgetPassword)
        } else {
          console.info(data.data.forgetPassword.message)
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
