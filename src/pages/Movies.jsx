import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";
import PaginationComponent from "../components/PaginationComponent";
import SkeletonCard from "../components/SkeletonCard";
import { getMovies } from "../services/api";
import { useSearchParams } from "react-router-dom";
import FilterComponent from "../components/FilterComponent";

function Movies() {
  const [movies, setMovies] = useState({
    results: [],
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") * 1 || 1;
  const sortBy = searchParams.get("sort") || "popularity.desc";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getMovies(currentPage,sortBy);
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);
  return (
    <div className=" py-4 ">
      <div className="container py-14 ">
        <div className="flex justify-between items-center">
          <h2 className="dark:text-white text-lightext font-bebas text-4xl   md:text-6xl">
            Discover Movies
          </h2>
        </div>
        <FilterComponent
          label="sort"
          options={[
            {
              value: "vote_average.desc&vote_count.gte=1000",
              label: "top rated",
            },
            { value: "popularity.desc", label: "popular" },
          ]}
        />

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 rounded-md  py-4">
          {movies?.results?.map((item,i) =>
            loading ? (
              <SkeletonCard key={i} />
            ) : (
              <Card type={"movie"} key={item?.id} item={item} />
            )
          )}
        </div>
        {movies?.total_pages > 1 && (
          <PaginationComponent
            count={movies?.total_pages > 30 ? 30 : movies.total_pages}
          />
        )}
      </div>
    </div>
  );
}

export default Movies;
