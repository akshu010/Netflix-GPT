import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGE } from "../utils/languageConstanat";
import { changeLanguage } from "../utils/configSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());  
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute top-0 left-0  z-20 w-full flex justify-between bg-black bg-opacity-20 ">
      <img className="w-52 " src={LOGO} alt="logo" />
      {user && (
        <div className="flex gap-3">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="border border-white h-10 mt-7 m-2 p-2 cursor-pointer  text-white rounded-md w-28 bg-transparent"
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option
                  className="text-black"
                  key={lang.identifier}
                  value={lang.identifier}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptSearchClick}
            className="border border-white h-10 mt-7 m-2 p-2 cursor-pointer  text-white rounded-md w-28 bg-transparent"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-12 h-12 mt-6 rounded-3xl cursor-pointer"
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="border border-white h-10 mt-7 m-2 p-2 cursor-pointer  text-white rounded-md w-28 bg-transparent"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
