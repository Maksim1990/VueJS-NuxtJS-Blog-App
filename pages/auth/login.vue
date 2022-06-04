<template>
  <b-row>
    <b-col md="6" sm="12" class="b-left-auth">
      <b-row style="padding-top: 5em">
        <b-col md="10" offset-md="1">
          <Spinner v-if="showSpinner"/>
          <template v-else>
            <b-alert :show="error.type!==null" variant="danger">
              {{ error.message }}
              <nuxt-link
                v-if="error.type === errorTypes.notEnabled"
                :to="{ name: 'auth-enable', query: { email: email }}">Enable user
              </nuxt-link>
            </b-alert>
            <b-row class="text-center mb-5 mx-1">
              <h1 class="text-white">Login</h1>
            </b-row>
            <b-form @submit="onSubmit">
              <b-form-group id="input-group-1">
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  label="Email:"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2">
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  label="Password:"
                  type="password"
                  placeholder="Enter password"
                  required
                ></b-form-input>
              </b-form-group>
              <b-row class="mb-2">
                <b-col>
                  <nuxt-link :to="{ name: 'auth-forgot-password'}" class="app-auth-link">Forgot password?</nuxt-link>
                </b-col>
              </b-row>
              <b-button type="submit" variant="success">Login</b-button>
            </b-form>
          </template>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6" sm="12" class="d-none d-lg-block">
      <AuthImage :src="require('~/assets/images/design/auth/login-img.png')" />
    </b-col>
  </b-row>
</template>

<script>
import {mapMutations} from 'vuex';
import AuthImage from "~/components/PageComponents/AuthImage";
import logoutMutation from '~/apollo/mutations/logout';
import loginMutation from '~/apollo/mutations/login';
import Spinner from "~/components/PageComponents/Spinner";

export default {
  layout: 'auth',
  data() {
    return {
      showSpinner: false,
      email: null,
      form: {
        email: '',
        password: '',
      },
      error: {
        message: null,
        type: null,
      },
      errorTypes: {
        notEnabled: 'user_not_enabled'
      },
    }
  },
  components: {Spinner,AuthImage},
  methods: {
    ...mapMutations({
      setIsAuth: 'auth/setIsAuth',
      setToken: 'auth/setToken',
    }),
    onSubmit(event) {
      event.preventDefault()
      this.showSpinner = true;
      this.loginUser(this.form)
    },
    async loginUser(form) {
      this.email = form.email
      await this.$apollo.mutate({
        mutation: loginMutation,
        variables: {
          email: form.email,
          password: form.password
        }
      }).then((data) => {
        this.$store.commit('auth/setToken', data.data.login.access_token);
        this.$store.commit('auth/setRefreshToken', data.data.login.refresh_token);
        this.$store.commit('auth/setAuthUser', data.data.login.user);
        this.setIsAuth(true);
        this.$cookies.set('refreshToken', data.data.login.refresh_token);
        this.$cookies.set('sm-token', data.data.login.access_token);
        this.$cookies.set('authUser', data.data.login.user);

        localStorage.setItem('refreshToken', data.data.login.refresh_token);
        localStorage.setItem('sm-token', data.data.login.access_token);
        localStorage.setItem('authUser', JSON.stringify(data.data.login.user));

        this.$store.commit('auth/setShowSessionExpiredAlert', false);
        //Redirect to home page
        this.showSpinner = false;
        this.$router.push('/');
      }).catch((error) => {
        // Error
        this.showSpinner = false;
        error = this.errorMessageFormatter(error)
        this.error.message = error.message
        this.error.type = error.extensions.reason
      })
    },
    async logout() {
      const refreshToken = this.$store.getters['auth/getRefreshToken'];
      if (!refreshToken) {
        return;
      }
      await this.$apollo.mutate({
        mutation: logoutMutation,
        variables: {refreshToken: refreshToken}
      }).then((data) => {
        if (data.data.logout.code === '200') {
          this.clearAuthUser();
        }
      }).catch(() => {
        this.clearAuthUser();
      })
    }
  },
  created() {
    if (this.$store.getters['auth/getAuthUser']) {
      console.log('logout');
      this.logout();
    } else {
      console.log('clear');
      this.clearAuthUser();
    }
  }
}
</script>
