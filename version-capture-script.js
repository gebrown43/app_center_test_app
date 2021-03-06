const fetch = require('node-fetch');
const mutation = `
mutation {
  signIn(input: { email: "api@teamairship.com", password: "Airship123" }) {          
    success
    user {
        authenticationToken
    }          
  }
}
`;

const url = 'https://crew-api-staging.herokuapp.com/graphql';

fetch(url, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({query: mutation}),
})
  .then((res) => res.json())
  .then((data) => {
    if (data.data) {
      const {authenticationToken} = data.data.signIn.user;
      saveApp(authenticationToken);
    }
  })
  .catch((err) => console.log('Err in authentication', err));

function saveApp(authenticationToken) {
  const packageJSON = require('./package.json');
  const body = `
  mutation saveApp($name: String!, $version: String!, $platform: AppPlatform!) {
    saveApp(input: { name: $name, version: $version, platform: $platform }) {
      app {
        id
        name
        platform
        version
      }
      success
      errors {
          message
          path
      }        
    }
  }
  `;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authenticationToken}`,
    },
    body: JSON.stringify({
      query: body,
      variables: {
        name: `${packageJSON.name}`,
        version: `${packageJSON.dependencies['react-native']}`,
        platform: 'REACT_NATIVE',
      },
    }),
  }).catch((err) => console.log('ERR', err));
}
