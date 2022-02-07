const admin = require("firebase-admin");
console.log('Initializing firebase Admin module...');
const envKeys = process.env.GOOGLE_SERVICE_ACCOUNT;
if (!envKeys) {
    throw new Error('The $GOOGLE_SERVICE_ACCOUNT variable was not found.');
}

const serviceAccount = JSON.parse(envKeys); // json string into object

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log("Succesfully connected to Google Firebase");

module.exports.admin = admin;