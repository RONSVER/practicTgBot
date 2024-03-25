import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

import UserInfo from "../UserInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  addBotChatPhotoId,
  postPhotoTgRequest,
} from "../store/slices/postPhotoTgSlice";
import { getMsgTgRequest } from "../store/slices/getMsgTgSlice";

function Main() {
  const webcamRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [isPhotoActive, setIsPhotoActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMsgTgRequest());
  }, [dispatch]);

  const data = useSelector((state) => state.getMsgTg.listTg);

  function postPhotoTobotFun(img) {
    const latestMessage = data[data.length - 1]?.message;
    if (latestMessage) {
      dispatch(addBotChatPhotoId(latestMessage.chat.id));
      console.log("Latest Message:", latestMessage);
      dispatch(postPhotoTgRequest(img));
      console.log("Photo sent to bot successfully!");
    } else {
      console.log("Latest message is not defined.");
    }
  }

  const capturePhoto = useCallback(() => {
    const photo = webcamRef.current.getScreenshot();
    setPhotoData(photo);
  }, [webcamRef]);

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
            <button onClick={() => postPhotoTobotFun(photoData)}>
              отправить фото боту
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
