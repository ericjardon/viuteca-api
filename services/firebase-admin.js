const admin = require('firebase-admin');
const {getAuth} = require('firebase-admin/auth');


let adminApp; // we define multiple methods and services for the adminApp variable;

async function initialize() {
  const envKeys = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!envKeys) {
      throw new Error('The $GOOGLE_SERVICE_ACCOUNT variable was not found.');
  }
  
  const serviceAccount = JSON.parse(envKeys); // json string into object
  
  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  console.log("Succesfully connected to Google Firebase");
  // let defaultAuth = getAuth(adminApp);
  // let defaultDatabase = getDatabase(adminApp);
}

module.exports.initialize = initialize;


function testAuth() {
  let uid = 'txZMPyk7OvNQ9mBvonSM8QLbQ8l1';
  getAuth()
  .getUser(uid)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data:`);
    console.dir(userRecord.toJSON());
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });

}

module.exports.testAuth = testAuth;