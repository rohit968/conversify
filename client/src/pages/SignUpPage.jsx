import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "../components/signup/SignUpForm";
import { UserContext } from "../UserContext";

const SignUpPage = () => {
  const [data, setData] = useState({});
  const { setUserData, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const formData = new FormData();
    formData.append("photo", data?.photo);
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("gender", data?.gender);
    formData.append("password", data?.password);
    Object.keys(data).length > 0 &&
      axios
        .post("/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setUserData(response.data);
          setIsLoggedIn(true);
        });
  }, [data]);

  return (
    <div className="flex justify-center items-center bg-cyan-700 text-white h-screen">
      <div className="flex flex-col w-11/12 p-7 bg-blue-50 text-black rounded-md h-4/5 md:w-4/6  md:p-12">
        <h1 className="text-xl md:text-2xl text-center underline uppercase mb-4">
          Sign Up
        </h1>
        <p className="text-slate-400 mb-8">
          We need you to help us with some basic information to create your
          account.
        </p>
        <div>
          <SignUpForm setData={setData} />
        </div>

        <p className="mt-4 text-slate-400 text-sm text-center">
          Already registered ? Click
          <Link to="/" className="tracking-wider uppercase mx-2 text-cyan-800">
            Log in
          </Link>
          to start chatting.
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
