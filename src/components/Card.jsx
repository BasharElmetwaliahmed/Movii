import { Link } from "react-router-dom";
import { backPath } from "../services/api";
import RateComponent from "./RateComponent";

function Card({ item, type }) {
  const release_year = item?.first_air_date || item?.release_date;
  if (!item.poster_path) return;
  return (
    <Link to={`/${type}/${item.id}`}>
      <img
        src={`${backPath}/${item.poster_path}`}
        alt={item?.name || item?.title}
        className=" rounded-md w-full sm:w-auto sm:h-[400px] "
      />
      <div className="flex flex-col py-4 gap-1">
        <div className="flex justify-between">
          <h4 className="dark:text-primary  font-semibold text-lightext">
            {item?.name || item?.title}
          </h4>
          <p className="capitalize text-secondarydark text-xs  ">
            {item?.media_type}
          </p>
        </div>
        {release_year && (
          <span className="dark:text-white text-lightext">
            {new Date(
              item?.first_air_date || item?.release_date
            )?.getFullYear()}
          </span>
        )}

        {item.vote_average && <RateComponent rate={item?.vote_average} />}
      </div>
    </Link>
  );
}

export default Card;
