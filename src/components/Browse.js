import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Browse = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="flex justify-between">
      <div className="absolute top-0 left-0 px-2  z-20 bg-gray-600  w-screen">
        <img
          className="w-52 "
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        />
      </div>
      <button
        onClick={handleSignOut}
        className="border border-black m-2 mt-5 p-2 cursor-pointer absolute right-0 bg-blue-500 text-white rounded-md z-30 "
      >
        Sign Out
      </button>
    </div>
  );
};

export default Browse;
