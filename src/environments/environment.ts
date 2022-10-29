// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBSLSwGivLnMLHA3Atnbup5bRa4ULQ1dbo",
    authDomain: "flight-ticket-scheduler-d75a1.firebaseapp.com",
    projectId: "flight-ticket-scheduler-d75a1",
    storageBucket: "flight-ticket-scheduler-d75a1.appspot.com",
    messagingSenderId: "465624055780",
    appId: "1:465624055780:web:1d62f50b1807a65ae0d1f1",
    measurementId: "G-QEG5RYJDY9"
  }
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSLSwGivLnMLHA3Atnbup5bRa4ULQ1dbo",
  authDomain: "flight-ticket-scheduler-d75a1.firebaseapp.com",
  projectId: "flight-ticket-scheduler-d75a1",
  storageBucket: "flight-ticket-scheduler-d75a1.appspot.com",
  messagingSenderId: "465624055780",
  appId: "1:465624055780:web:1d62f50b1807a65ae0d1f1",
  measurementId: "G-QEG5RYJDY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
