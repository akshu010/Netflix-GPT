import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/constants";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="absolute top-0 left-0  z-20 w-screen flex justify-between bg-black bg-opacity-20 ">
      <img className="w-52 " src={LOGO} alt="logo" />
      {user && (
        <div className="flex gap-3">
          <img
            className="hidden md:block w-12 h-12 mt-6 rounded-3xl cursor-pointer"
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="border border-white h-10 mt-7 m-2 p-2 cursor-pointer bg-black font-bold text-red-400 rounded-md  "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
