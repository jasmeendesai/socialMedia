import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUser, setOnlineUser] = useState([])

    return(
        <ChatContext.Provider value={{currentChat, setCurrentChat, onlineUser, setOnlineUser}}>
            {children}
        </ChatContext.Provider>
    )
}