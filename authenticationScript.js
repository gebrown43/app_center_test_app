var {google} = require('googleapis');
var serviceAccount = require('./versionTrackerKey.json');

var scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/firebase.database',
];

var jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes,
);

jwtClient.authorize((err, tokens) => {
  if (err) {
    console.log('Error making request to generate access token:', err);
  } else if (tokens.access_token === null) {
    console.log(
      'Provided service account does not have permission to generate access tokens',
    );
  } else {
    var accessToken = tokens.access_token;
    console.log(accessToken);
  }
});
