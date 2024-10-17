import React, { useRef } from "react";
import lang from "../utils/languageConstanat";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { AI_KEY } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const searchMovieTMDB = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        movie
      )}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0];
    } else {
      return {};
    }
  };
  const handleGptSearchClick = async () => {
    const gptQuary =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me 5 movies, comma-separated like the example result given ahead. Example: Don, Sholey, Koi Mil Gya, Tere Naam, 3 Idiots";
    const data = await fetch(AI_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: gptQuary }] }],
      }),
    });
    const json = await data.json();
    const jsonData = json?.candidates?.[0]?.content?.parts?.[0]?.text;

    const gptMovies = jsonData
      .trim()
      .split(",")
      .map((movie) => movie.trim());

    // For Tmdb api
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    const flattenedResults = tmdbResults.flat();
    dispatch(
      addGptMoviesResult({
        movieNames: gptMovies,
        movieResults: flattenedResults,
      })
    );
  };
  return (
    <div className="flex justify-center absolute top-10 left-[30%]">
      <form onSubmit={(e) => e.preventDefault()} className="py-32 ">
        <input
          ref={searchText}
          className="border border-black h-10 w-[450px] px-2 text-black rounded-lg  "
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className=" border border-white h-10 mt-7 m-2 p-2 cursor-pointer  text-white w-28 bg-transparent rounded-xl"
        >
          {lang[langKey].search} <i class="ri-search-line"></i>
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
