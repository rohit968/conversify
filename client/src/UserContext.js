import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('/profile').then((response) => {
      setUserData(response.data);
      setIsLoggedIn(true);
    })
  }, [])

  return (
    <UserContext.Provider value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>)
}