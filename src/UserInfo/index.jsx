import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usrNameFirebaseRequest } from "../store/slices/usrNameFirebaseSlice";
import { usrDateFirebaseRequest } from "../store/slices/usrDateFirebaseSlice";

function UserInfo() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usrNameFirebaseRequest());
    dispatch(usrDateFirebaseRequest());
  }, [dispatch]);

  const infoUsrObj = {
    nameUser: useSelector((state) => state.usrNameFirebase.usrName),
    dateUser: useSelector((state) => state.usrDateFirebase.usrDate),
    nameUserStatus: useSelector((state) => state.usrNameFirebase.status),
    dateUserStatus: useSelector((state) => state.usrDateFirebase.status),
  };

  return (
    <div>
      <h1>User Info</h1>
      <p>
        Name:{" "}
        {infoUsrObj.nameUser ? infoUsrObj.nameUser : infoUsrObj.nameUserStatus}
      </p>
      <p>
        Date of birth:{" "}
        {infoUsrObj.dateUser ? infoUsrObj.dateUser : infoUsrObj.dateUserStatus}
      </p>
    </div>
  );
}

export default UserInfo;
