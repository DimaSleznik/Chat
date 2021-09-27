import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9iZzojA4e7XiyuHKVYnO7we1dEKBhEwA",
  authDomain: "react-chat-e1695.firebaseapp.com",
  projectId: "react-chat-e1695",
  storageBucket: "react-chat-e1695.appspot.com",
  messagingSenderId: "283825881637",
  appId: "1:283825881637:web:06736fc4c219b3434975cc",
  measurementId: "G-LLR44PPKM5",
};
export const Context = createContext(null);
const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = firebase.auth();
ReactDOM.render(
  <Provider store={store}>
    <Context.Provider
      value={{
        auth,
        firestore,
        app,
      }}
    >
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById("root")
);
