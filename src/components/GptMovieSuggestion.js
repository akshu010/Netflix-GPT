import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const GptMovieSuggestion = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames || !movieResults || movieNames.length !== movieResults.length)
    return null;
  return (
    <div className="text-white text-4xl bg-black bg-opacity-70 w-[95%] px-10 rounded-xl py-4 flex justify-evenly flex-wrap absolute top-72 m-auto ml-9 ">
      {movieResults.map((movie, index) => (
        <div key={movie.id} className="mb-8">
          <h1 className="text-4xl text-red-500 mb-2">{movie.title}</h1>
          <img
            className="w-[200px] h-[300px] object-cover pt-4 rounded-xl cursor-pointer"
            src={IMG_CDN_URL + movie.poster_path}
            alt={movie.title}
          />
        </div>
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
