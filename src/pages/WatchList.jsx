import { useEffect, useState } from "react";
import FullScreen from "../components/FullScreen";
import WatchListCard from "../components/WatchListCard";
import { useAuth } from "../context/AuthContext";
import useFireStore from "../hooks/useFireStore";

function WatchList() {
  const { user } = useAuth();
  const { getWatchlist, isLoading } = useFireStore();
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    if (user) {
      getWatchlist(`${user.uid}`).then((data) => {
        setWatchList(data);
        console.log(data);
      });
    }
  }, [user, getWatchlist]);
  if (isLoading)
    return (
      <FullScreen>
        <span className="loader"></span>
      </FullScreen>
    );

  return (
    <FullScreen>
      <div className="py-14 container dark:text-white text-lightext  ">
        <h2 className="dark:text-white text-lightext md:text-6xl text-4xl">
          Watch List
        </h2>
        {watchList.length === 0 ? (
          <div className="h-[50vh] md:text-2xl text-xl  flex items-center text-center w-full justify-center">
            <p>Empty Watch List</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 py-6">
            {watchList.map((item) => (
              <WatchListCard
                item={item}
                key={item.id}
                setWatchList={setWatchList}
              />
            ))}
          </div>
        )}
      </div>
    </FullScreen>
  );
}

export default WatchList;
