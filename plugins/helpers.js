import Vue from 'vue';
import authUserQuery from '~/apollo/queries/authUserQuery';

Vue.mixin({
  methods: {
    heightPercentage(num, per) {
      if (num < 650) {
        per -= 20
      }
      return (num / 100) * per;
    },
    errorMessageFormatter: (error) => {
      let {graphQLErrors} = error;
      return graphQLErrors[0];
    },
    getDatesDifferenceInMinutes: (date) => {
      const today = new Date();
      const updatedAt = new Date(date);
      return Math.round((updatedAt - today) / 60000);
    },
    clearAuthUser() {
      this.$store.commit('auth/setToken', null);
      this.$store.commit('auth/setRefreshToken', null);
      this.$store.commit('auth/setAuthUser', null);
      this.$store.commit('auth/setIsAuth', false);
      this.$cookies.remove('refreshToken');
      this.$cookies.remove('sm-token');
      this.$cookies.remove('authUser');
      if(process.client){
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('sm-token');
        localStorage.removeItem('authUser');
      }
    },
    async getAuthUser() {
      await this.$apollo.query({
        query: authUserQuery
      }).then((res) => {
        this.authUser = res.data.auth;
        this.$store.commit('auth/setAuthUser', this.authUser);
      }).catch(() => {
        this.clearAuthUser();
        this.$store.commit('auth/setShowSessionExpiredAlert', true);
      })
    },
    async fetchCurrentUser() {
      let authUser = this.$store.getters['auth/getAuthUser'];
      if (authUser === null) {
        await this.getAuthUser();
        authUser = this.authUser;
      }
      return authUser;
    },
    getUserFromStore() {
      return this.$store.getters['auth/getAuthUser'];
    },
    isUserCanSeeItem(user, pageUser = null) {
      return user !== null && (user.role === 'admin' || (pageUser !== null && pageUser._id === user._id));
    },
    getPluralEnding(number) {
      return number > 1 ? 's' : '';
    },
    getUserAvatar(user) {
      if (user.avatar !== null) {
        return user.avatar;
      }

      let avatarUrl = 'https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=' + user.name;
      if (user.lastname == null) {
        return avatarUrl;
      }

      return avatarUrl + '+' + user.lastname;
    }
  }
})
