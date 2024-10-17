const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute py-32 px-6 md:py-48 md:px-24 text-white w-screen h-screen bg-black bg-opacity-10">
      <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
      <p className="w-full md:w-3/12 mt-7 text-white font-medium text-sm md:text-base">
        {overview}
      </p>

      <div className="mt-7 flex gap-4 justify-start"> 
        <button className="h-12 w-32 font-semibold rounded-lg bg-white text-black hover:bg-opacity-80">
          <i className="ri-play-fill"></i> Play
        </button>
        <button className="h-12 w-32 font-semibold rounded-lg bg-gray-500 text-white hover:bg-opacity-120">
          <i className="ri-information-line"></i> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
