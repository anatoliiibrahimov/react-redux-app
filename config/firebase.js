import * as firebase from 'firebase'
const config = {
  apiKey: "AIzaSyD_9CgKWzqEdkByTK6qsbpd0sQN4O8rPKg",
  authDomain: "pluralsightapp.firebaseapp.com",
  databaseURL: "https://pluralsightapp.firebaseio.com",
  projectId: "pluralsightapp",
  storageBucket: "pluralsightapp.appspot.com",
  messagingSenderId: "1066438987105"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('pluralsightApp/')