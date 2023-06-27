import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "../components/signin/SignInForm";
import { UserContext } from "../UserContext";

const SignInPage = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const { setUserData, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    Object.keys(data).length > 0 &&
      axios
        .post("/login", data)
        .then((response) => {
          setUserData(response.data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          setError(error.response.data);
          // handle the error and provide a response
        });
  }, [data]);

  return (
    <div className="flex justify-center items-center bg-cyan-700 text-white h-screen">
      <div className="flex flex-col w-11/12 p-7 bg-blue-50 text-black rounded-md h-fit md:w-4/6 md:mt-20 md:p-12">
        <h1 className="text-xl md:text-2xl text-center underline uppercase mb-4">
          Welcome Back !
        </h1>
        <p className="text-slate-400 mb-8">
          We need you to help us with some basic information to create your
          account.
        </p>
        <div>
          <SignInForm setData={setData} error={error} />
        </div>

        <p className="mt-4 text-slate-400 text-sm text-center">
          New to conversify ? Click
          <Link
            to="/signup"
            className="tracking-wider uppercase mx-2 text-cyan-800"
          >
            Register
          </Link>
          to create your account.
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
