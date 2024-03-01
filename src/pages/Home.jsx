import React, { useState } from "react";
import { useEffect } from "react";
import Card from "../components/Card";
import SelectTime from "../features/home/SelectTime";
import { getAll } from "../services/api";
import SkeletonCard from "../components/SkeletonCard";
import Header from "../features/home/Header";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("day");
  useEffect(() => {
    setLoading(true);
    getAll(time)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [time]);
  return (
    <div >
      <Header />
      <div className="container py-14 ">
        <div className="flex justify-between items-center py-2">
          <h2 className="dark:text-primary text-lightext text-2xl md:text-6xl">Trending</h2>
          <SelectTime time={time} setTime={setTime} />
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 rounded-md  py-4">
          {loading
            ? Array(20)
                .join()
                .split(",")
                .map((a, i) => <SkeletonCard key={i} />)
            : data.map((item) => (
                <Card key={item.id} item={item} type={item.media_type} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
