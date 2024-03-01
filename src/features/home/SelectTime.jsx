
function SelectTime({setTime,time}) {
  return (
    <div className="p-1 flex gap-1 text-sm md:text-lg border-[2px] border-secondary rounded-sm  dark:text-white text-lightext">
      <button
        className={`${
          time === "day" ? "bg-secondary" : ""
        } px-1 py-2 w-[65px] md:w-[80px] rounded-sm`}
        onClick={() => setTime("day")}>
        Today
      </button>
      <button
        className={`${
          time === "week" ? "bg-secondary" : ""
        } hover:bg-secondary px-1 py-2 w-[65px] md:w-[80px] rounded-sm`}
        onClick={() => setTime("week")}>
        Weekly
      </button>
    </div>
  );
}

export default SelectTime