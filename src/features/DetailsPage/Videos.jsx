import Video from "./Video";

function Videos({videos,trailer}) {
  return (
    <div className="py-10">
      {trailer && (
        <>
          <h2 className="py-8 dark:text-white font-bebas text-lightext text-5xl">
            Trailer
          </h2>

          <Video id={trailer.key} small={false} />
        </>
      )}
      {!videos.length==0&&
        <>
          <h2 className="py-8 dark:text-white font-bebas text-lightext text-5xl ">
            Extra Videos
          </h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 pb-10">
            {videos?.slice(0,10).map((video) => (
              <Video key={video.key} small={true} id={video.key} />
            ))}
          </div>
        </>
      }
    </div>
  );
}

export default Videos