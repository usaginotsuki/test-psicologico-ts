import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const db=admin.firestore();
db.settings({ignoreUndefinedProperties:true});

const main=express();
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({extended:false}));
main.use('/api',require('./user').routes);
main.use('/api',require('./test').routes);
main.use('/api',require('./application').routes);


export const api=functions.https.onRequest(main);
export{db};
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
