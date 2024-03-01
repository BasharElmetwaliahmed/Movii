import { useEffect } from "react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";
import { searchAll } from "../services/api";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStr = searchParams.get("query") || "";

  const [query, setQuery] = useState(queryStr);
  const [data, setData] = useState({
    results: [],
  });
  const [loading, setLoading] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (queryStr !== "") {
          const data = await searchAll(queryStr);
          setData(data);
        }
        else
        setData({
          results:[]
        });
      } catch (err) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);
  const submitHandler = (e) => {
    e.preventDefault();
    searchParams.set("query", query);
    setSearchParams(searchParams);
  };
  return (
    <div className=" min-h-[calc(100vh_-_76px)] py-4 relative ">
      <div className="container py-14">
        <h2 className="dark:text-white font-bebas text-lightext text-6xl py-2">Search</h2>
        <form onSubmit={submitHandler} className="relative w-fit">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            value={query}
            className="dark:placeholder:text-primary placeholder:text-lightext dark:text-white text-lightext focus:border-secondary w-[300px] 
            dark:bg-black bg-white focus:text-secondary focus:placeholder:focus:text-secondary border-[1px] dark:border-primary  border-dark outline-none pl-2 pr-7 py-2 my-2 rounded-md "
            placeholder="search"
          />
          <IoIosSearch className="absolute text-white right-2 top-1/2 -translate-y-1/2" />
          <button type="hidden" className="hidden">
            submit
          </button>
        </form>
        {data?.total_results === 0 && (
          <p className="dark:text-white text-lightext text-center py-8">
            No results founded
          </p>
        )}
        {queryStr === "" && (
          <p className="dark:text-white text-lightext text-center py-8">
            Enter Search Query
          </p>
        )}

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 rounded-md  py-4">
          {data?.results?.map((item) =>
            loading ? (
              <SkeletonCard />
            ) : (
              <Card key={item?.id} type={item.media_type} item={item} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
