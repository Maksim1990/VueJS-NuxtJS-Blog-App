<template>
  <b-row>
    <b-col md="6" sm="12" class="b-left-auth">
      <b-row style="padding-top: 5em">
        <b-col md="10" offset-md="1">
          <Spinner v-if="showSpinner"/>
          <template v-else>
            <b-alert :show="confirmed" variant="success">
              <b>Congratulations!</b> Registration is successfully confirmed fo {{ email }}
              <nuxt-link :to="{name: 'auth-login'}">Login</nuxt-link>
            </b-alert>
            <b-alert :show="error.type!==null" variant="danger">
              {{ error.message }}
            </b-alert>
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="warning"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
            >
              <p>Confirmation code was successfully resent to {{ email }}</p>
              <b-progress
                variant="warning"
                :max="dismissSecs"
                :value="dismissCountDown"
                height="4px"
              ></b-progress>
            </b-alert>

            <b-form @submit="onSubmit">
              <b-form-group id="input-group-1">
                <b-form-input
                  id="input-2"
                  v-model="confirmation_code"
                  label="Confirmation code:"
                  type="text"
                  placeholder="Enter your confirmation code"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="success">Confirm registration</b-button>
            </b-form>
            <div class="mt-4">
              <p>Haven't received a confirmation code?</p>
              <span class="app-link app-auth-link" @click="resendConfirmationCode">Resend confirmation code to {{ email }}</span>
            </div>
          </template>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6" sm="12" class="d-none d-lg-block">
      <AuthImage :src="require('~/assets/images/design/auth/enableaccount.png')" />
    </b-col>
  </b-row>
</template>

<script>
import Spinner from "~/components/PageComponents/Spinner";
import AuthImage from "~/components/PageComponents/AuthImage";
import confirmRegistrationMutation from '~/apollo/mutations/confirmRegistration';
import resendConfirmationCodeMutation from '~/apollo/mutations/resendConfirmationCode';

export default {
  layout: 'auth',
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      error: {
        message: null,
        type: null,
      },
      showSpinner: false,
      email: this.$route.query.email,
      confirmation_code: null,
      confirmed: false
    }
  },
  components: {Spinner, AuthImage},
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.confirmRegistration(this.confirmation_code)
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    async confirmRegistration(code) {
      this.showSpinner = true;
      await this.$apollo.mutate({
        mutation: confirmRegistrationMutation,
        variables: {
          email: this.email,
          code: code
        }
      }).then((data) => {
        this.showSpinner = false;
        if (data.data.confirmRegistration.confirmed) {
          this.confirmed = true
          this.confirmation_code = null
        }
      }).catch((error) => {
        this.processErrorMessage(error)
      })
    },
    async resendConfirmationCode() {
      this.showSpinner = true;
      await this.$apollo.mutate({
        mutation: resendConfirmationCodeMutation,
        variables: {
          email: this.email
        }
      }).then((data) => {
        this.showSpinner = false;
        if (data.data.resendConfirmationCode.confirmed) {
          this.dismissCountDown = this.dismissSecs
        }
      }).catch((error) => {
        this.processErrorMessage(error)
      })
    },
    processErrorMessage(error) {
      // Error
      this.showSpinner = false;
      this.error = this.errorMessageFormatter(error)
      console.log(this.error.message)
    }
  }
}
</script>
