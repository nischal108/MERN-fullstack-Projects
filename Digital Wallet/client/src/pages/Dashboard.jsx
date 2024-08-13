import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import useGetUser from "../hooks/useGetUser";
import UserList from "../components/UserList";
import EnterAmntPopup from "../components/EnterAmntPopup";

const Dashboard = () => {
  const { user, loading } = useAuthContext();
  const { isAuthenticated } = user;
  const navigate = useNavigate();
  const [searchedText, setSearchedText] = useState("");
  const [otherUsers, setOtherUsers] = useState(null);
  const [sendTo, setSendTo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (text) => {
    setSearchedText(text);
  };

  const handleOnClick = (user) =>{
    setSendTo(user);
  }

  useEffect(() => {
    if (searchedText) {
      const fetchUsers = async () => {
        const users = await useGetUser(searchedText);
        setOtherUsers(users);
      };
      fetchUsers();
    }
  }, [searchedText]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <InputBox handleChange={handleChange} />
      {otherUsers && (
        <div className="users-lists w-6/12 mx-auto  rounded mt-2 py-1 bg-slate-200">
          {otherUsers.map((user) => (
            <UserList key={user._id} user={user} handleOnClick={handleOnClick}/>
          ))}
        </div>
      )}
      {sendTo && (<EnterAmntPopup user={sendTo} setUser ={setSendTo}/>)}
    </div>
  );
};

export default Dashboard;
