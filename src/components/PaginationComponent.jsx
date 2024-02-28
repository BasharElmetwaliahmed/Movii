import { useSearchParams } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
function PaginationComponent({count}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") * 1 || 1;
  const nextHandler = () => {
    if (currentPage === count) return;
    const nextPage = currentPage + 1;

    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  };
    const prevHandler = () => {
      console.log(currentPage);
      if (currentPage === 1) return;
      const prevPage = currentPage - 1;

      searchParams.set("page", prevPage);
      setSearchParams(searchParams);
    };
  
  const paginatebtns = `flex items-center gap-2 hover:text-secondary duration-75 disabled:cursor-not-allowed cursor-pointer disabled:text-primary disabled:opacity-50 `;
  return (
    <div className="text-primary flex gap-4 items-center  font-overpass  bg-black w-fit rounded-md py-1 px-2">
      <button className={paginatebtns} onClick={prevHandler} disabled={currentPage===1}>
        <GrFormPrevious />
        prev
      </button>
      <div>
        <span className="text-secondary">{currentPage}</span> of {count}
      </div>
      <button
        className={paginatebtns}
        onClick={nextHandler}
        disabled={currentPage === count}>
        next
        <GrFormNext />
      </button>
    </div>
  );
}

export default PaginationComponent;
