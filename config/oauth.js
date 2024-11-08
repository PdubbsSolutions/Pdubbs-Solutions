const myRefreshToken = '...'; // Get refresh token from OAuth2 flow

initializeApp({
  credential: refreshToken(myRefreshToken),
  databaseURL: 'https://pdubbs-final-default-rtdb.firebaseio.com/'
});
// Initialize the default app
const defaultApp = initializeApp(defaultAppConfig);

console.log(defaultApp.name);  // '[DEFAULT]'

// Retrieve services via the defaultApp variable...
let defaultAuth = getAuth(defaultApp);
let defaultDatabase = getDatabase(defaultApp);

// ... or use the equivalent shorthand notation
defaultAuth = getAuth();
defaultDatabase = getDatabase();