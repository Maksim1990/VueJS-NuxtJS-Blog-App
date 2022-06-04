export default function ({redirect,store}) {
  if (!store.getters['auth/isAuth']) {
    return redirect({name: 'auth-login'})
  }
}
