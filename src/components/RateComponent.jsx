import React from 'react'
import { MdStarRate } from "react-icons/md";

function RateComponent({rate}) {
  return (
    <p className="text-white flex gap-1 py-2 items-center text-xl">
      <span className="text-yellow-400 ">
        <MdStarRate className="flex items-center " />
      </span>
      {rate.toFixed(1)}
    </p>
  );
}

export default RateComponent