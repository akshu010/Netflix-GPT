import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  
  return (
    <div className="">
      <h1 className="text-3xl py-5 px-5 text-white">{title}</h1>
      <div className="flex overflow-x-scroll px-5 scroll-smooth custom-scrollbar overflow-y-auto h-64">
        <div className="flex gap-3 ">
          {movies && Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))
          ) : (
            <p className="text-white">No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
