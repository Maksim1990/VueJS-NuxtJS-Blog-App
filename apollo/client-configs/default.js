import { onError } from 'apollo-link-error'

export default function ({app,store}) {
  let headers = {};
  let token = null;
  if (process.server) {
    token = app.$cookies.get('wug-token');
  }
  if (process.browser) {
    token = store.getters['auth/getToken'];
  }

  if (process.browser) {
    // headers= {
    //   'Authorization': `Bearer ${token}`,
    // }
  }

  //Handle errors
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      app.router.push('/auth/login');
    }
  })


  return {
    link: errorLink,
    httpEndpoint: process.env.NUXT_ENV_API_URL + '/graphql',
    httpLinkOptions: {
      headers: headers,
      fetchOptions: {
        mode: 'cors' //Cors Needed for external Cross origins, need to allow headers from server
      },
      credentials: "omit"
    },
  }
}
