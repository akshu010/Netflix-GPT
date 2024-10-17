import React, { useRef, useState } from "react";
import Header from "../components/Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { USER_AVATAR } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const createPassword = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      email.current?.value,
      password.current?.value,
      name.current?.value,
      createPassword.current?.value,
      isSignInForm
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        createPassword.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = user;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // eslint-disable-next-line
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-screen">
      <Header />

      <div className="flex items-center justify-center h-full w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg')] bg-cover bg-center">
        <div className="absolute border border-black bg-black opacity-80 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 px-6 sm:px-10 py-7 rounded-md">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <h1 className="text-white text-3xl sm:text-4xl font-bold text-center">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            {/* Name field, only shown in Sign Up */}
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="m-2 p-2 bg-transparent border border-white rounded-md text-white w-full"
              />
            )}

            {/* Email field */}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="m-2 p-2 bg-transparent border border-white rounded-md text-white w-full"
            />

            {/* Password field, only for Sign In */}
            {isSignInForm && (
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="m-2 p-2 bg-transparent border border-white rounded-md text-white w-full"
              />
            )}

            {/* Create password field, only for Sign Up */}
            {!isSignInForm && (
              <input
                ref={createPassword}
                type="password"
                placeholder="Create Password"
                className="m-2 p-2 bg-transparent border border-white rounded-md text-white w-full"
              />
            )}

            {/* Error message */}
            <p className="text-red-500 font-semibold text-center">{errorMessage}</p>

            {/* Sign in / Sign up button */}
            <button
              onClick={handleButtonClick}
              className="bg-[#C11119] text-white h-12 rounded-md w-full mt-4"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>

            {/* Toggle Sign Up / Sign In */}
            <p
              onClick={toggleSignInForm}
              className="text-white text-center cursor-pointer mt-4"
            >
              {isSignInForm
                ? "New to Netflix? Sign up now."
                : "Already Registered? Sign In now"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
