import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

import { io } from "socket.io-client";

let socket;

const DataContext = React.createContext();

export function useDataContext() {
    return useContext(DataContext);
}

export function DataProvider({ children }) {
    const [token, setToken] = useLocalStorage("token", "");
    const [userDetails, setUserDetails] = useLocalStorage("user", {
        username: "",
        name: "",
        role: "",
    });

    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const logout = () => {
        setToken("");
        setUserDetails({
            username: "",
            name: "",
            role: "",
        });
    };

    useEffect(() => {
        socket = io("http://localhost:3005", {
            transports: ["websocket"],
        });

        socket.on("new_post", (data) => {
            let uniqueArray = [];
            let uniqueIds = {};

            let array = [data, ...notifications];

            for (let i = 0; i < array.length; i++) {
                if (!uniqueIds[array[i].id]) {
                    uniqueArray.push(array[i]);
                    uniqueIds[array[i].id] = true;
                }
            }

            setNotifications(array);
        });
    }, []);

    const sendNewBlogNotification = (blog) => {
        socket.emit("on_post_creation", blog);
    };

    const values = {
        token,
        setToken,
        userDetails,
        setUserDetails,
        logout,

        showNotification,
        setShowNotification,
        sendNewBlogNotification,
        notifications,
    };

    return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
}
