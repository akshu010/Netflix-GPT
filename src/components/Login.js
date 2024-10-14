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
          const user = userCredential.user;
          console.log(user);
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
    <div className="relative h-screen w-screen ">
      <Header />

      <div className=" flex items-center justify-center h-screen w-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg')] bg-cover bg-center">
        <div className="absolute border border-black bg-black opacity-80 w-1/3 px-20 py-7 rounded-md">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4  "
          >
            <h1 className=" text-white text-4xl font-bold ">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="m-2 p-2 bg-transparent border border-white rounded-md text-white "
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="m-2 p-2 bg-transparent border border-white rounded-md  text-white"
            />

            {isSignInForm && (
              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="m-2 p-2 bg-transparent border border-white rounded-md text-white "
              />
            )}
            {!isSignInForm && (
              <input
                ref={createPassword}
                type="password"
                placeholder=" Create Password"
                className="m-2 p-2 bg-transparent border border-white rounded-md text-white "
              />
            )}
            <p className="text-red-500 font-semibold">{errorMessage}</p>
            <button
              onClick={handleButtonClick}
              className="bg-[#C11119] text-white h-11 rounded-md"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p
              onClick={toggleSignInForm}
              className="text-white text-center cursor-pointer"
            >
              {isSignInForm
                ? "New to Netflix? Sign up now."
                : "Allready Registerd? Sign In now"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
