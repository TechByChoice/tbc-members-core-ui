import React, { createContext, useState, useContext } from 'react';

const MsgStatusContext = createContext(null);

export const StatusProvider = ({ children }) => {
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // success, error, info
  const [isAlertOpen, setIsAlertOpen] = useState(false);


  return (
    <MsgStatusContext.Provider
        value={{
          statusMessage,
          setStatusMessage,
          isAlertOpen,
          setIsAlertOpen,
          statusType,
          setStatusType }}
    >
      {children}
    </MsgStatusContext.Provider>
  );
};

export const useStatus = () => {
  return useContext(MsgStatusContext);
};
