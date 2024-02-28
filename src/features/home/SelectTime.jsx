
function SelectTime({setTime,time}) {
  return (
    <div className="p-1 flex gap-1 text-lg border-[2px] border-secondary rounded-sm  text-white">
      <button
        className={`${
          time === "day" ? "bg-secondary" : ""
        } p-1 w-[80px] rounded-sm`}
        onClick={() => setTime("day")}>
        Today
      </button>
      <button
        className={`${
          time === "week" ? "bg-secondary" : ""
        } hover:bg-secondary p-1 w-[80px] rounded-sm`}
        onClick={() => setTime("week")}>
        Weekly
      </button>
    </div>
  );
}

export default SelectTime