<template>
  <div>
    <b-alert v-if="isShowSessionExpiredAlert" @dismissed="alertDismissed" dismissible show variant="success"
             class="mb-0">
      Your session was expired. Do you want to login again?
      <span class="app-link" @click="redirectToLogin">Login</span>
    </b-alert>
    <b-navbar toggleable="lg" class="w-100 navbar" :class="{'fixed-p': isHomePage}" :style="{ backgroundColor: bgColor }">
      <b-col>
        <b-navbar-brand to="/">
          <b-img class="img-fluid d-sm-none d-none d-sm-block" width="170" fluid src="~/assets/images/design/logo.png"></b-img>
          <b-img class="img-fluid logo-icon d-sm-none" fluid src="~/assets/images/design/logo-text.png"></b-img>
        </b-navbar-brand>
        <b-navbar-toggle @click="toggleMenu" target="nav-collapse" class="n-toggler mt-3"></b-navbar-toggle>
        <b-collapse id="nav-collapse" class="n-collapsable mt-3" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/blog">Blog</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>
          <template v-if="authUser !== null">
            <b-navbar-nav>
              <b-nav-item to="/users">Users</b-nav-item>
              <b-nav-item to="/messages">Messages</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav>
              <b-nav-item-dropdown no-caret>
                <template #button-content>
                  <b-img class="img-fluid" width="40" fluid src="~/assets/images/design/person.png"></b-img>
                </template>
                <b-dropdown-item :to="{name:'users-id',params:{id:authUser._id}}">Profile
                </b-dropdown-item>
                <b-dropdown-item :to="{name:'auth-login'}">Log Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </template>
          <b-navbar-nav v-else>
            <b-nav-item to="/auth/register">Register</b-nav-item>
            <b-nav-item to="/auth/login">Login</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-col>
    </b-navbar>
  </div>
</template>

<script>
export default {
  props: ['color', 'isHomePage'],
  data() {
    return {
      bgColorOnScroll: '#0b495e',
      useBgColorOnScroll: false,
    }
  },
  computed: {
    bgColor: function () {
      return this.useBgColorOnScroll ? this.bgColorOnScroll : this.color;
    },
    authUser: function () {
      let authUser = this.$store.getters['auth/getAuthUser'];
      if (authUser !== null && authUser !== undefined && authUser !== '') {
        return authUser;
      }
      authUser = this.$cookies.get('authUser')
      if (authUser === null || authUser === undefined || authUser === '') {
        return null;
      }
      return authUser;
    },
    isShowSessionExpiredAlert: function () {
      if (this.$route.name === 'auth-login') {
        return false;
      }
      return this.$store.getters['auth/isShowSessionExpiredAlert'];
    }
  },
  methods: {
    toggleMenu() {
      if (this.useBgColorOnScroll) {
        return;
      }
      this.useBgColorOnScroll = !this.useBgColorOnScroll;
    },
    alertDismissed() {
      this.clearAuthUser();
      this.$store.commit('auth/setShowSessionExpiredAlert', false);
    },
    redirectToLogin() {
      this.clearAuthUser();
      this.$store.commit('auth/setShowSessionExpiredAlert', false);
      this.$router.push({name: 'auth-login'});
    }
  },
  created() {
    this.$nuxt.$on('changeNavBarColor', (data) => {
      this.useBgColorOnScroll = data > 100;
    })
  }
}
</script>

<style scoped>
.navbar {
  padding: 0 10% 0 5%;
}

.logo-icon{
  margin-top: 30px;
  margin-bottom: 20px;
  width: 100px;
}
.navbar-brand {
  padding: 0;
}

.navbar-light .navbar-nav .nav-link {
  color: white !important;
}

.navbar-light .navbar-toggler {
  color: white !important;
  border-color: white;
}

@media (min-width: 990px) {
  .n-collapsable {
    float: right;
  }
}

@media (min-width: 320px) {
  .logo-icon {
    width: 150px;
  }
}

@media (max-width: 990px) {
  .n-collapsable {
    float: none;
    margin-bottom: 20px;
  }
}

.n-toggler {
  float: right !important;
}
</style>
