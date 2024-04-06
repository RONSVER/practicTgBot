import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebase = {
  apiKey: "AIzaSyDzNEaWGczzT9RthEGTXqo5m1F1M7ZG1ro",
  authDomain: "tgdubproject.firebaseapp.com",
  projectId: "tgdubproject",
  storageBucket: "tgdubproject.appspot.com",
  messagingSenderId: "1014793018809",
  appId: "1:1014793018809:web:b8e164b3539fda1e33aa68",
  measurementId: "G-TBDEF4JDDN",
};

// Инициализация приложения Firebase
const firebaseApp = initializeApp(firebase);
// Получение ссылки на сервис базы данных
const database = getDatabase(firebaseApp);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App database={database} />
  </Provider>
);
