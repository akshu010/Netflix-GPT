import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  useEffect(() => {
    // Automatically show suggestions when new search results are fetched
    if (movieResults && movieNames && movieNames.length === movieResults.length) {
      setIsVisible(true);
    }
  }, [movieResults, movieNames]);

  if (!movieNames || !movieResults || movieNames.length !== movieResults.length)
    return null;

  const handleHideSuggestions = () => {
    setIsVisible(false); // Hide the suggestions when button is clicked
  };

  return (
    <>
      {isVisible && (
        <div className="text-white text-lg sm:text-xl lg:text-2xl bg-black bg-opacity-70 w-[95%] px-6 sm:px-10 rounded-xl py-6 flex justify-center flex-wrap gap-8 mt-12">
          {movieResults.map((movie, index) => (
            <div key={movie.id} className="flex flex-col items-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl text-red-500 mb-4 text-center">
                {movie.title}
              </h1>
              <img
                className="w-[150px] h-[225px] sm:w-[200px] sm:h-[300px] object-cover rounded-xl cursor-pointer transition-transform transform hover:scale-105"
                src={IMG_CDN_URL + movie.poster_path}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      )}
      {isVisible && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleHideSuggestions}
            className="border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 rounded-lg px-6 py-2"
          >
            Hide Suggestions
          </button>
        </div>
      )}
    </>
  );
};

export default GptMovieSuggestion;
