// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6pF08FI4dyDLU4BQ9bb51w2KjdkrU7eY",
    authDomain: "pokedraw-393c4.firebaseapp.com",
    databaseURL: "https://pokedraw-393c4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pokedraw-393c4",
    storageBucket: "pokedraw-393c4.appspot.com",
    messagingSenderId: "619788416418",
    appId: "1:619788416418:web:0246c5a4148e6fd9972efb"
};
// variable(s) à exporter
//export const prefixe_sessions = firebaseConfig.projectId;
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase();
/*
function writeUserData(username, email, password) {
    set(ref(database, 'users/' + username), {
        email: email,
        password: password
    });
}
*/
//writeUserData('user2', 'test2@f.fr', 'user2');