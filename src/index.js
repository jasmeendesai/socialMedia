import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthContextProvider } from './context/authContext';
import { ChatContextProvider } from './context/chatContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

