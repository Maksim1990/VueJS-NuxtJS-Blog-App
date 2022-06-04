export const state = () => ({
  token: null,
  authUser: null,
  refresh_token: null,
  isAuth: false,
  showSessionExpiredAlert: false,
});

export const mutations = {
  setAuthUser(state, user) {
    state.authUser = user;
  },
  setShowSessionExpiredAlert(state, showSessionExpiredAlert) {
    state.showSessionExpiredAlert = showSessionExpiredAlert;
  },
  setToken(state, text) {
    state.token = text;
  },
  setRefreshToken(state, text) {
    state.refresh_token = text;
  },
  removeToken(state) {
    state.token = null;
  },
  setIsAuth(state, isAuth) {
    state.isAuth = isAuth;
  },
};

export const actions = {
  async setAuthUser({commit}, data) {
    commit('setAuthUser', data.authUser);
  },
  async setShowSessionExpiredAlert({commit}, data) {
    commit('setShowSessionExpiredAlert', data.showSessionExpiredAlert);
  },
  async setToken({commit}, data) {
    commit('setToken', data.token);
  },
  async setRefreshToken({commit}, data) {
    commit('setRefreshToken', data.refresh_token);
  },
  async removeToken({commit}) {
    commit('removeToken');
  },
  async setIsAuth({commit}, data) {
    commit('setIsAuth', data.token);
  }
};

export const getters = {
  hasToken(state) {
    return state.token !== null;
  },
  isShowSessionExpiredAlert(state) {
    return state.showSessionExpiredAlert;
  },
  getToken(state) {
    return state.token;
  },
  getRefreshToken(state) {
    return state.refresh_token;
  },
  getAuthUser(state) {
    return state.authUser
  },
  isAuth(state) {
    return state.isAuth;
  }
};
