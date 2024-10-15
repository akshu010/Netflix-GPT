import React from "react";
import lang from "../utils/languageConstanat";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg')] w-screen h-screen  flex justify-center ">
      <form   onSubmit={(e) => e.preventDefault()} className="py-32   ">
        <input
          className="border border-black h-10 w-[450px] px-2 text-white rounded-lg  "
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className=" border border-white h-10 mt-7 m-2 p-2 cursor-pointer  text-white w-28 bg-transparent rounded-xl">
          {lang[langKey].search} <i class="ri-search-line"></i>
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
