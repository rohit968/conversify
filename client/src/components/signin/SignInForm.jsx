import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

const SignInForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const { isLoggedIn } = useContext(UserContext);

  console.log(isLoggedIn);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    // If all validations pass, submit the form
    props.setData({ email, password });
    setEmail("");
    setPassword("");
    console.log(props.error);
    if (props.error === " ") {
      setSubmitted(false);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-red-600 text-center -mt-4 mb-4 text-lg">
        {props.error}
      </div>
      <div className="flex flex-col justify-evenly mb-4 relative">
        <input
          type="email"
          className="border border-black rounded-md px-2 p-1.5 w-full font-thin focus:outline-none"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
          value={email}
        />
        <span className="absolute bottom-3/4 left-5 px-2 bg-white text-cyan-700 stracking-widest uppercase text-xs pointer-events-none">
          E-mail
        </span>
      </div>
      {emailError && <p className="text-red-500 mb-3 -mt-3">{emailError}</p>}

      <div className="flex flex-col justify-evenly mb-4 relative">
        <input
          type="password"
          className="border border-black rounded-md px-2 p-1.5 w-full font-thin focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          value={password}
        />
        <span className="absolute bottom-3/4 left-5 px-2 bg-white tracking-widest uppercase text-xs text-cyan-700 pointer-events-none">
          Password
        </span>
      </div>
      {passwordError && (
        <p className="text-red-500 mb-3 -mt-3">{passwordError}</p>
      )}

      <p className="text-slate-400 mt-4 text-sm mb-3">
        By clikcing the button, I accept the
        <span className="text-blue-400"> Terms of Use of the service </span>
        and its
        <span className="text-blue-400"> Privacy Policy,</span> as well as
        consent to the processing of personal data.
      </p>
      <button
        className="text-white flex items-center justify-center rounded-md w-1/3 py-1 bg-cyan-700 m-auto text-sm md:text-base md:py-2"
        type="submit"
      >
        Login
      </button>
      {submitted && <Navigate to={"/chat"} />}
    </form>
  );
};

export default SignInForm;
