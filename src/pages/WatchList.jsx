import { useEffect, useState } from "react";
import WatchListCard from "../components/WatchListCard";
import { useAuth } from "../context/AuthContext"
import useFireStore from "../hooks/useFireStore";

function WatchList() {
  const { user} = useAuth();
  const { getWatchlist, isLoading } = useFireStore();
  const [watchList,setWatchList] = useState([]);


  useEffect(()=>{
    if(user){
      getWatchlist(`${user.uid}`).then((data) => {
        setWatchList(data);
        console.log(data);
      });
    }
  },[user,getWatchlist])
  if(isLoading) return <div>Loading...</div>
  
  return (
    <div className="bg-bkg text-primary  font-overpass py-4 min-h-[calc(100vh_-_84px)]">
      <div className="py-14 container">
        <h2 className="text-primary md:text-6xl text-4xl">Watch List</h2>
        <div className="flex flex-col gap-6 py-6">
          {watchList.map((item) => (
            <WatchListCard item={item} key={item.id} setWatchList={setWatchList}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchList