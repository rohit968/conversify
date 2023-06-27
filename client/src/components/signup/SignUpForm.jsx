import React, { useContext, useState } from "react";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

const SignUpForm = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const { isLoggedIn } = useContext(UserContext);

  console.log(isLoggedIn);
  console.log(photo);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate name
    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }

    // Validate gender
    if (!gender) {
      setGenderError("Gender is required");
      return;
    }

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

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // If all validations pass, submit the form
    props.setData({ name, gender, email, photo, password });
    setName("");
    setGender("");
    document.getElementById("photo").value = "";
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;
    setEmail("");
    setPhoto("");
    setPassword("");
    setConfirmPassword("");
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="flex flex-col justify-evenly mb-4 relative">
        <input
          type="text"
          className="border border-black rounded-md px-2 p-1.5 w-full font-thin focus:outline-none"
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          value={name}
        />
        <span className="absolute bottom-3/4 left-5 px-2 text-cyan-700 bg-white tracking-widest uppercase text-xs pointer-events-none">
          Name
        </span>
      </div>
      {nameError && <p className="text-red-500 mb-3 -mt-3">{nameError}</p>}

      <div className="flex items-center  gap-4 mb-4">
        <div className="w-1/2">
          <input
            type="radio"
            name="gender"
            value="male"
            id="male"
            className="hidden peer"
            onChange={(e) => {
              setGender(e.target.value);
              setGenderError("");
            }}
          />
          <label
            htmlFor="male"
            className="h-10 cursor-pointer flex justify-center items-center rounded-md hover:shadow hover:bg-white peer-checked:bg-blue-200"
          >
            <BsGenderMale />
            <span className="ml-2 text-gray-700 ">Male</span>
          </label>
        </div>

        <div className="w-1/2">
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            className="hidden peer"
            onChange={(e) => {
              setGender(e.target.value);
              setGenderError("");
            }}
          />
          <label
            htmlFor="female"
            className="h-10 cursor-pointer flex justify-center items-center rounded-md hover:shadow hover:bg-white peer-checked:bg-blue-200"
          >
            <BsGenderFemale />
            <span className="ml-2 text-gray-700 ">Female</span>
          </label>
        </div>
        {genderError && <span className="text-red-500">{genderError}</span>}
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

      <div className="flex flex-col justify-evenly mb-4">
        <input
          type="file"
          id="photo"
          className="border border-black rounded-md px-2 p-1.5 w-full font-thin focus:outline-none"
          onChange={(e) => {
            setPhoto(e.target.files[0]);
          }}
        />
      </div>

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

      <div className="flex flex-col justify-evenly mb-4 relative">
        <input
          type="password"
          className="border border-black rounded-md px-2 p-1.5 w-full font-thin focus:outline-none"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError("");
          }}
          value={confirmPassword}
        />
        <span className="absolute bottom-3/4 left-5 px-2 bg-white tracking-widest uppercase text-xs text-cyan-700 pointer-events-none">
          Repeat the Password
        </span>
      </div>
      {confirmPasswordError && (
        <p className="text-red-500 mb-3 -mt-3">{confirmPasswordError}</p>
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
        Sign Up
      </button>
      {submitted && <Navigate to={"/chat"} />}
    </form>
  );
};

export default SignUpForm;
