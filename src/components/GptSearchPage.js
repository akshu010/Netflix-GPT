import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";

const GptSearchPage = () => {
  return (
    <div className="h-full w-full">
      <div className="relative">
        <img
          className="h-full w-full object-cover fixed top-0 left-0"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_large.jpg"
          alt=""
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-screen">
          <GptSearchBar />
          <GptMovieSuggestion />
        </div>
      </div>
    </div>
  );
};

export default GptSearchPage;
