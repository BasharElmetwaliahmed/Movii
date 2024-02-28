import { useEffect } from "react";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import PaginationComponent from "../components/PaginationComponent";
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
    <div className="bg-bkg font-overpass min-h-[calc(100vh_-_84px)] py-4">
      <div className="container py-14">
        <h2 className="text-primary text-6xl py-2">Search</h2>
        <form onSubmit={submitHandler} className="relative w-fit">
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            value={query}
            className="placeholder:text-primary text-primary focus:border-secondary w-[300px] 
            bg-black focus:text-secondary focus:placeholder:focus:text-secondary border-[1px] border-primary outline-none pl-2 pr-7 py-2 my-2 rounded-md "
            placeholder="search"
          />
          <IoIosSearch className="absolute text-white right-2 top-1/2 -translate-y-1/2" />
          <button type="hidden" className="hidden">
            submit
          </button>
        </form>
        {data?.total_results === 0 && (
          <p className="text-primary text-center py-8">No results founded</p>
        )}
        {queryStr === "" && (
          <p className="text-primary text-center py-8">Enter Search Query</p>
        )}

        <div className="grid grid-cols-5 gap-6 rounded-md justify-between py-4">
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
