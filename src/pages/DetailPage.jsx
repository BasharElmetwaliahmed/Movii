import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  backPath,
  getCast,
  getDetails,
  getRecommendations,
  getVideos,
  orignalPath,
} from "../services/api";
import { CiCalendar } from "react-icons/ci";
import { convertToPercentage, getRateColor } from "../utils/helpers";
import { IoMdAdd } from "react-icons/io";
import Cast from "../features/DetailsPage/Cast";
import useFireStore from "../hooks/useFireStore";
import { useAuth } from "../context/AuthContext";
import { IoMdRemove } from "react-icons/io";
import { toast } from "react-toastify";
import FullScreen from "../components/FullScreen";
import Recommendations from "../features/DetailsPage/Recommendations";
import Videos from "../features/DetailsPage/Videos";

function DetailPage() {
  const { id, type } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [videos, setVideos] = useState([]);
  const { addToWatchList, isLoading, checkInWatchList, removeFromWatchlist } =
    useFireStore();
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [details, castData, recommendData, videosData] =
          await Promise.all([
            getDetails(type, id),
            getCast(type, id),
            getRecommendations(type, id),
            getVideos(type, id),
          ]);
        const video = videosData?.results.find(
          (item) => item.type === "Trailer"
        );
        const videos= videosData?.results.filter(item=>item.type!=='Trailer')
        setTrailer(video);
        setVideos(videos)
        setData(details);
        setCast(castData.cast);
        setRecommendations(recommendData.results);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, type]);

  useEffect(() => {
    if (!user) {
      setIsInWatchList(false);
      return;
    }
    checkInWatchList(`${user.uid}`, `${id}`).then((res) => {
      setIsInWatchList(res);
    });
  }, [id, user]);

  if (loading)
    return (
      <FullScreen>
        <span className="loader"></span>
      </FullScreen>
    );
  const title = data?.name || data?.title;
  const releaseDate = data?.release_date || data?.first_air_date;
  const border = `border-${getRateColor(data?.vote_average)}`;
  const handlAddToWatchList = async () => {
    if (user) {
      const newData = {
        id: data?.id,
        title,
        release_date: releaseDate,
        vote_average: data?.vote_average,
        poster_path: data?.poster_path,
        overview: data?.overview,
        type,
      };

      await addToWatchList(user.uid, data.id, newData);
      const res = await checkInWatchList(`${user.uid}`, `${data.id}`);
      setIsInWatchList(res);
      toast.success(
        `${
          type === "tv" ? "Tv series" : "Movie"
        } added to watchlist successfully`,
        {
          position: "top-right",
        }
      );
    } else {
      toast.error("You Should be logged in", {
        position: "top-right",
      });
    }
  };

  const removeFromWatchListHander = async () => {
    await removeFromWatchlist(`${user.uid}`, `${data.id}`);
    const res = await checkInWatchList(`${user.uid}`, `${data.id}`);
    setIsInWatchList(res);
    toast.success(
      `${
        type === "tv" ? "Tv series" : "Movie"
      } removed from watchlist successfully`,
      {
        position: "top-right",
      }
    );
  };
  const buttonsStyle = `relative z-10 border-[1px] hover:cursor-pointer h-fit flex items-center gap-2   px-3 py-2 rounded-md hover:opacity-50`;
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${orignalPath}/${data?.backdrop_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        className="md:min-h-[500px] h-auto  relative ">
        <div className="absolute top-0 left-0 bg-black opacity-60 h-full w-full z-[0] "></div>
        <div className="container py-10 relative z-10">
          <div className="flex md:flex-row flex-col gap-4 item-center">
            <img
              src={`${backPath}/${data?.poster_path}`}
              className="md:h-[450px] rounded-md"
              alt={title}
            />
            <div className="flex flex-col gap-1 justify-center text-primary">
              <h3 className=" md:text-4xl text-2xl font-bold">
                {title}{" "}
                {!isNaN(new Date(releaseDate)?.getFullYear()) && (
                  <span className="font-extralight">
                    {new Date(releaseDate)?.getFullYear()}
                  </span>
                )}
              </h3>
              {!isNaN(new Date(releaseDate)?.getFullYear()) && (
                <p className="flex items-center gap-2 md:text-2xl text-sm ">
                  <CiCalendar />
                  {new Date(releaseDate)?.toLocaleDateString("en-US")} (US)
                </p>
              )}
              <div className="flex gap-7 md:items-center md:flex-row flex-col  ">
                <div className="flex items-center gap-2">
                  <div className="w-[70px] h-[70px] bg-bkg rounded-full relative flex justify-center items-center   ">
                    <span
                      className={`absolute w-[60px] h-[60px] border-[2px] ${border} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full`}></span>
                    <p className="text-xs">
                      {convertToPercentage(data?.vote_average)}%
                    </p>
                  </div>
                  Score
                </div>
                {!isLoading ? (
                  !isInWatchList ? (
                    <button
                      onClick={handlAddToWatchList}
                      className={`border-primary text-primary ${buttonsStyle} w-fit   `}>
                      <IoMdAdd />
                      Add to watch list
                    </button>
                  ) : (
                    <button
                      onClick={removeFromWatchListHander}
                      className={`border-green-500 text-green-500 w-fit  ${buttonsStyle}`}>
                      <IoMdRemove />
                      Remove From Watch list
                    </button>
                  )
                ) : (
                  <div className="px-8 w-[170px] flex justify-center items-center ">
                    <span className="loader small-loader"></span>
                  </div>
                )}
              </div>
              {data?.tagline && (
                <p className="italic font-extralight opacity-80 py-2">
                  {data.tagline}
                </p>
              )}
              <div>
                <h5 className=" text-base md:text-lg font-bold">Overview</h5>
                <p className="opacity-90 md:text-base text-sm tracking-wide leading-7">
                  {data?.overview}
                </p>
              </div>
              {data?.genres && (
                <div className="flex gap-2">
                  {data.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-slate-800 md:p-2 p-1 text-white text-xs font-bold my-2">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Cast cast={cast} />
        <Videos videos={videos} trailer={trailer}/>
        <Recommendations recommendations={recommendations} type={type} />
      </div>
    </>
  );
}

export default DetailPage;
