import React from "react";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import {useStatus} from "../providers/MsgStatusProvider";
import styled from "@emotion/styled";


// const alertStyle = (theme) => css`
const AlertStyle = styled(Alert)`
    position: absolute,
    top: 16px,
    left: 50%,
    transform: translateX(-50%),
    zIndex: 2000,
    width: 90%,
    maxWidth: 600px,
`;

const StatusAlert = () => {
  const { statusMessage, statusType, setStatusMessage, setIsAlertOpen, isAlertOpen } = useStatus();

  const handleClose = () => {
    setStatusMessage(''); // Clear the status message
    setIsAlertOpen(false);
  };
  return isAlertOpen && (
    <AlertStyle severity={statusType}
           id="alerts"
           color={statusType}
    action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={handleClose}
        >
          x
        </IconButton>
      }>
      {statusMessage}
    </AlertStyle>
  );
};

export default StatusAlert;