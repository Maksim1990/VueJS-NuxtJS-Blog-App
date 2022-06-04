export default function ({store,app}) {
  let token = null;
  let refreshToken = null;
  let authUser = null;

  if (process.server) {
    token = app.$cookies.get('sm-token');
    refreshToken = app.$cookies.get('refreshToken');
    authUser = app.$cookies.get('authUser');
  }

  if (process.client) {
    token = store.getters['auth/getToken'];
    authUser = store.getters['auth/getAuthUser'];
    refreshToken = store.getters['auth/getRefreshToken'];

    if(!token || !authUser || !refreshToken){
      token = localStorage.getItem('sm-token');
      authUser = JSON.parse(localStorage.getItem('authUser'));
      refreshToken = localStorage.getItem('refreshToken');
    }
  }

  if (token === undefined || token === null) {
    token = null;
    refreshToken = null;
    authUser = null;
  }

  app.$apolloHelpers.onLogin(token);
  store.commit('auth/setToken', token);
  store.commit('auth/setRefreshToken', refreshToken);
  store.commit('auth/setIsAuth', typeof authUser === 'object' && authUser !== null);
  store.commit('auth/setAuthUser', authUser);
}
