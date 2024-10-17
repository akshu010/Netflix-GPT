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
    <div className="fixed top-0 left-0 z-20 w-full flex items-center justify-between bg-black bg-opacity-90 px-4 py-2 md:px-8 md:py-4">
      <img className="w-24 md:w-40" src={LOGO} alt="logo" />
      {user && (
        <div className="flex items-center gap-4">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="border border-white h-8 md:h-10 px-2 text-white rounded-md bg-transparent cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out"
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
            className="border border-white h-8 md:h-10 px-2 text-white rounded-md bg-transparent cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out"
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer"
            alt="usericon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="border border-white h-8 md:h-10 px-2 text-white rounded-md bg-transparent cursor-pointer hover:bg-white hover:text-black transition duration-300 ease-in-out"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
