import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// export const useSocket = () => {
//     return useContext(SocketContext);
// };




const SocketProvider = ({ children }) => {
    // const [socket, setSocket] = useState(null);
    const socket = io(`${import.meta.env.VITE_BASE_URL}`); 
    useEffect(() => {
        // Replace with your server URL
        

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;