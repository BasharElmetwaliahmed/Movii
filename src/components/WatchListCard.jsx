import { backPath } from "../services/api";
import RateComponent from "./RateComponent";
import { CiCircleRemove } from "react-icons/ci";
import useFireStore from "../hooks/useFireStore";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function WatchListCard({ item, setWatchList }) {
  const { removeFromWatchlist } = useFireStore();
  const { user } = useAuth();
  const removeFromWatchListHander = async (e) => {
    e.preventDefault();
    try {
      await removeFromWatchlist(`${user.uid}`, `${item.id}`);
      setWatchList((watchlist) => {
        return watchlist.filter((i) => i.id !== item.id);
      });
      toast.success(
        `${
          item.type === "tv" ? "Tv series" : "Movie"
        } removed from watchlist successfully`,
        {
          position: "top-right",
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Link to={`/${item.type}/${item.id}`}>
      <div className="flex flex-col items-center md:items-start md:flex-row gap-3 items-start">
        <div className="relative w-full md:w-1/3 xl:w-1/5 lg:w-1/4">
          <img
            src={`${backPath}/${item.poster_path}`}
            className=" rounded-md w-full  "
          />
          <button
            onClick={(e) => removeFromWatchListHander(e)}
            className="absolute top-2 right-2 text-4xl bg-white bg-opacity-20 p-1 text-green-600 font-semibold rounded-sm hover:bg-opacity-70">
            <CiCircleRemove />
          </button>
        </div>
        <div className="flex flex-col gap-1 w-full md:w-2/3">
          <h3 className="text-3xl font-semibold py-1">{item.title}</h3>
          <p className="text-secondary">
            {new Date(item.release_date).getFullYear()}
          </p>
          <div className="my-2">
            <h5 className="text-xl font-semibold ">Overview</h5>
            <p className="dark:text-white text-lightext opacity-80 text-sm">
              {item?.overview}
            </p>
            {item?.vote_average && <RateComponent rate={item.vote_average} />}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default WatchListCard;
