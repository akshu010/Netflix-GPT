import React, { useState } from "react";
import Header from "../components/Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative h-screen w-screen ">
      <Header />

      <div className=" flex items-center justify-center h-screen w-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg')] bg-cover bg-center">
        <div className="absolute border border-black bg-black opacity-80 w-1/3 px-20 py-7 rounded-md">
          <form className="flex flex-col gap-4  ">
            <h1 className=" text-white text-4xl font-bold ">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInForm && (
              <input
                type="text"
                placeholder="Full Name"
                className="m-2 p-2 bg-transparent border border-white rounded-md "
              />
            )}
            <input
              type="text"
              placeholder="Email Address"
              className="m-2 p-2 bg-transparent border border-white rounded-md "
            />
            {isSignInForm && (
              <input
                type="password"
                placeholder="Password"
                className="m-2 p-2 bg-transparent border border-white rounded-md "
              />
            )}
            {!isSignInForm && (
              <input
                type="password"
                placeholder=" Create Password"
                className="m-2 p-2 bg-transparent border border-white rounded-md "
              />
            )}
            <button className="bg-[#C11119] text-white h-11 rounded-md">
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
