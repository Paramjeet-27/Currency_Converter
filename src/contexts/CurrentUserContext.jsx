import { createContext, useEffect, useState } from "react";

export const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("allUsers"));
    setAllUsersData(allUsers || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("allUsers", JSON.stringify(allUsersData));
  }, [allUsersData]);

  const allUsers = (userData) => {
    const allUserDataCopy = [...allUsersData, userData];
    setAllUsersData(allUserDataCopy);
  };

  const authenticateUser = (loginData) => {
    const currUser = allUsersData.find(
      (ele) =>
        ele.user_name === loginData.user_name &&
        ele.password === loginData.password
    );
    if (currUser) {
      alert("You have Logged In Successfully");
      setCurrentUser(currUser);
    } else {
      alert("Incorrect Username or Password !!");
    }
  };

  const handleLogOut = () => setCurrentUser({});

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, allUsers, authenticateUser, handleLogOut }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
