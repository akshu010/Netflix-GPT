import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" absolute py-48 px-24 text-white w-screen h-screen  bg-black bg-opacity-10">
      <h1 className=" text-5xl font-bold ">{title}</h1>
      <p className=" w-3/12 mt-7 text-white font-medium ">{overview}</p>
      <div className="mt-7 flex gap-4">
        <button className=" h-12 w-32 font-semibold rounded-lg bg-white  text-black hover:bg-opacity-80">
          <i class="ri-play-fill"></i>Play
        </button>
        <button className=" h-12 w-32 font-semibold rounded-lg bg-gray-500 text-white hover:bg-opacity-120">
          <i class="ri-information-line"></i> More Info
        </button>
      </div>
    </div>
  );
}
export default VideoTitle;
