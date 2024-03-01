import { useSearchParams } from "react-router-dom";

function FilterComponent({ label, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || "popularity.desc";

  const changeHandler = (e) => {
    searchParams.set("sort", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };
  return (
    <div className="w-[250px] py-4 ">
      <label
        htmlFor="sort-by"
        className="block mb-2 text-sm font-medium text-primary dark:text-white capitalize">
        {label}
      </label>
      <select
        id="sort-by"
        onChange={changeHandler}
        value={sortBy}
        className="bg-gray-50 border border-secondarydark text-gray-900 text-sm rounded-lg focus:ring-offset-secondary focus:border-secondary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary dark:focus:border-secondary">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterComponent;
