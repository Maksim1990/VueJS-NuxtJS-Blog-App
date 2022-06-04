export default function ({redirect}) {
  if (process.env.NUXT_ENV_ON_MAINTENANCE === 'true') {
    return redirect({name: 'platform-coming'})
  }
}
