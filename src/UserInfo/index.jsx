import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChatId, postMsgTgRequest } from "../store/slices/postMsgTgSlice";
import { getMsgTgRequest } from "../store/slices/getMsgTgSlice";

function UserInfo() {
  const [isWelcomeSent, setIsWelcomeSent] = useState(false);
  const [usrName, setUsrName] = useState(null);
  const [usrDateOfBirth, setUsrDateOfBirth] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMsgTgRequest());
  }, [dispatch]);

  const data = useSelector((state) => state.getMsgTg.listTg);

  useEffect(() => {
    if (!isWelcomeSent && data.length > 0) {
      const latestMessage = data[data.length - 1].message;
      if (
        latestMessage.text === "/start" &&
        latestMessage.entities.some((entity) => entity.type === "bot_command")
      ) {
        const welcomeSent = localStorage.getItem("welcomeSent") === "true";
        if (!welcomeSent) {
          dispatch(addChatId(latestMessage.chat.id));
          dispatch(
            postMsgTgRequest(
              "Привет, Я практический бот. Введи свое имя и дату рождения следующим образом: \n /name 'Ваше имя' \n /dateOfBirth 'Ваша дата рождения'"
            )
          );
          setIsWelcomeSent(true);
          localStorage.setItem("welcomeSent", "true");
        }
      } else if (
        latestMessage.text.startsWith("/name") &&
        latestMessage.entities.some((entity) => entity.type === "bot_command")
      ) {
        const name = latestMessage.text.trim().substring(5).trim();

        if (!name) {
          dispatch(addChatId(latestMessage.chat.id));
          dispatch(postMsgTgRequest("Ты не написал свое имя =("));
        } else {
          localStorage.setItem("usrName", name);
          setUsrName(name);
        }
      } else if (
        latestMessage.text.startsWith("/dateOfBirth") &&
        latestMessage.entities.some((entity) => entity.type === "bot_command")
      ) {
        const dateOfBirth = latestMessage.text.trim().substring(12).trim();

        if (!dateOfBirth) {
          dispatch(addChatId(latestMessage.chat.id));
          dispatch(postMsgTgRequest("Ты не написал свою дату рождения =("));
        } else {
          localStorage.setItem("usrDateDateOfBirth", dateOfBirth);
          setUsrDateOfBirth(dateOfBirth);
        }
      }
    }
  }, [data, dispatch, isWelcomeSent]);

  useEffect(() => {
    const nameFromStorage = localStorage.getItem("usrName");
    const dateOfBirthFromStorage = localStorage.getItem("usrDateDateOfBirth");

    if (nameFromStorage) {
      setUsrName(nameFromStorage);
    }

    if (dateOfBirthFromStorage) {
      setUsrDateOfBirth(dateOfBirthFromStorage);
    }
  }, []);

  return (
    <div>
      <h1>{usrName ? `Привет ${usrName}` : ""}</h1>
      <h1>
        {usrDateOfBirth ? `вот твоя дата рождения: ${usrDateOfBirth}` : ""}
      </h1>
      <button onClick={() => console.log(data)}>логировать</button>
    </div>
  );
}

export default UserInfo;
