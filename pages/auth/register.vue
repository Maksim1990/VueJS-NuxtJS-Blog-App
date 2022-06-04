<template>
  <b-row>
    <b-col md="6" sm="12" class="b-left-auth">
      <b-row style="padding-top: 5em">
        <b-col md="10" offset-md="1">
          <Spinner v-if="showSpinner"/>
          <template v-else>
            <FormErrorsAlertBar :show="error.messages!==null" :messages="error.messages"/>
            <b-row class="text-center mb-5 mx-1">
              <h1 class="text-white">Register</h1>
            </b-row>
            <b-form @submit="onSubmit">
              <b-form-group id="input-group-1">
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  label="Name:"
                  type="text"
                  placeholder="Enter your name"
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
              <b-button type="submit" variant="success">Register</b-button>
            </b-form>
          </template>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6" sm="12" class="d-none d-lg-block">
      <AuthImage :width=700 :src="require('~/assets/images/design/auth/register.png')" />
    </b-col>
  </b-row>
</template>

<script>
import AuthImage from "~/components/PageComponents/AuthImage";
import Spinner from "~/components/PageComponents/Spinner";
import registerMutation from '~/apollo/mutations/register';
import FormErrorsAlertBar from "~/components/PageComponents/FormErrorsAlertBar";

export default {
  layout: 'auth',
  data() {
    return {
      showSpinner: false,
      error: {messages: null},
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  components: {Spinner, FormErrorsAlertBar, AuthImage},
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.showSpinner = true;
      this.registerUser(this.form)
    },
    async registerUser(form) {
      await this.$apollo.mutate({
        mutation: registerMutation,
        variables: {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation
        }
      }).then((data) => {
        //Redirect to login page
        this.showSpinner = false;
        if (data.data.register.status === 'REGISTERED') {
          this.$router.push({name:'auth-login'});
        } else {
          console.info(data.data.register.message)
        }
      }).catch((error) => {
        // Error
        this.showSpinner = false;
        error = this.errorMessageFormatter(error)
        if (error.extensions.category === 'validation') {
          let errorMessages = [];
          for (const key in error.extensions.validation) {
            error.extensions.validation[key].forEach(errorMessage => {
              errorMessages.push(errorMessage)
            });
          }
          this.error.messages = errorMessages;
        } else {
          this.error.messages = [error.message]
        }
      })
    }
  }
}
</script>
