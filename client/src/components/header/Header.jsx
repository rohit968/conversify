import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { GiMagicHat } from "react-icons/gi";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";

const Header = () => {
  const { userData, setUserData, setIsLoggedIn } = useContext(UserContext);
  const [userOption, setUserOption] = useState(false);

  console.log(userData);

  const handleUserOptionToggle = () => {
    setUserOption(!userOption);
  };

  const handleLogout = async () => {
    await axios.post("/logout");
    setUserData(null);
    setIsLoggedIn(false);
    <Navigate to={"/"} />;
  };

  return (
    <div className="px-2 py-4 flex justify-between items-center relative">
      <div className="flex gap-2 items-center mx-5 font-bold text-xl text-rgb(32,34,40)">
        <GiMagicHat className="text-cyan-800" />
        Conversify
      </div>
      <div className="text-sm px-3 flex gap-4 items-center">
        <div className="h-12 w-12">
          <img
            src={`https://conversify-backend.onrender.com/uploads/${userData?.photo}`}
            className="h-full w-full object-cover rounded-full"
            alt="profile-pic"
          />
        </div>
        <div className="hidden md:block sm:block">
          <h1>{userData?.name}</h1>
          <p>{userData?.email}</p>
        </div>
        <div>
          <AiOutlineDown
            className="cursor-pointer"
            onClick={handleUserOptionToggle}
          />
        </div>
        {userOption && (
          <div className="bg-slate-700 text-cyan-100 absolute h-fit flex flex-col right-5 px-6 py-2 top-16 rounded-md">
            <Link
              to="/"
              onClick={() => {
                handleLogout();
                setUserOption(false);
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
