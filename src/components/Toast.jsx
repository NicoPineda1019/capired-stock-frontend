import { Alert } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParameters } from "../store/toast/toastSlice";

const Toast = ({ containerStyles, alertStyles, timeOn = 10000 }) => {
  const dispatch = useDispatch();

  const { message, type, show } = useSelector((state) => state.toast);

  useEffect(() => {
    if (show)
      setTimeout(() => {
        dispatch(
          setParameters({
            show: false,
            msg: "",
            type: "",
          })
        );
      }, timeOn);
  }, [dispatch, show, timeOn]);

  return (
    show && (
      <div style={containerStyles}>
        <Alert
          sx={alertStyles}
          severity={type}
        >
          {message}
        </Alert>
      </div>
    )
  );
};

export default Toast;
