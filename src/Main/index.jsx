import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import UserInfo from "../UserInfo";
import { getDatabase, ref, set } from "firebase/database";

function Main() {
  const webcamRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [isPhotoActive, setIsPhotoActive] = useState(false);

  const database = getDatabase();

  const capturePhoto = () => {
    const photo = webcamRef.current.getScreenshot();
    setPhotoData(photo);
  };

  // Функция для отправки данных в Firebase RTDB
  const sendDataToFirebase = () => {
    const dbRef = ref(database, "photo");
    set(dbRef, { photoData });
    console.log("Photo data sent to Firebase Realtime Database");
  };

  return (
    <div>
      <UserInfo />

      <button onClick={() => setIsPhotoActive(!isPhotoActive)}>
        Включить Камеру
      </button>

      {isPhotoActive && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
          />

          <button onClick={capturePhoto}>Сделать фото</button>
          {photoData && <img src={photoData} alt="Сделанное фото" />}
          {photoData && (
            <button onClick={sendDataToFirebase}>
              Отправить фото в Firebase RTDB
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
