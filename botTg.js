const { getDatabase, set, ref } = require("firebase/database");
const { initializeApp } = require("firebase/app");

const TelegramBot = require("node-telegram-bot-api");

const tokenBot = "6619816335:AAGL870Yd5QaHKCpJcn3lPOs15vWi6CFbXA";

const bot = new TelegramBot(tokenBot, { polling: true });

const firebase = {
  apiKey: "AIzaSyDzNEaWGczzT9RthEGTXqo5m1F1M7ZG1ro",
  authDomain: "tgdubproject.firebaseapp.com",
  projectId: "tgdubproject",
  storageBucket: "tgdubproject.appspot.com",
  messagingSenderId: "1014793018809",
  appId: "1:1014793018809:web:b8e164b3539fda1e33aa68",
  measurementId: "G-TBDEF4JDDN",
};

const firebaseApp = initializeApp(firebase);
// Получение ссылки на сервис базы данных
const fireDatabaseTg = getDatabase(firebaseApp);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text == "/start") {
    bot.sendMessage(
      chatId,
      "Привет, Я практический бот. Введи свое имя и дату рождения следующим образом: \n /name 'Ваше имя' \n /dateOfBirth 'Ваша дата рождения'"
    );
  } else if (text.startsWith("/name")) {
    const name = text.trim().substring(5).trim();
    if (!/^([А-ЯЁа-яёA-Za-z][А-ЯЁа-яёA-Za-z\s]*)$/.test(name)) {
      bot.sendMessage(
        chatId,
        "Проверьте корректность данных. Первая буква должна быть заглавной, и это должны быть буквы."
      );
    } else {
      bot.sendMessage(chatId, "Ваше имя сохранено");

      const dbRefTg = ref(fireDatabaseTg, "Name");
      set(dbRefTg, { name });
    }
  } else if (text.startsWith("/dateOfBirth")) {
    const dateOfBirth = text.trim().substring(12).trim();

    if (
      !/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(dateOfBirth)
    ) {
      bot.sendMessage(chatId, "Проверьте корректность данных. Даты рождения");
    } else {
      bot.sendMessage(chatId, "Ваша дата рождения сохранена");
      const dbRefTg = ref(fireDatabaseTg, "DateOfBirth");
      set(dbRefTg, { dateOfBirth });
    }
  }
});
