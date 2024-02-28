import Skeleton from "react-loading-skeleton";

function SkeletonCard() {
  return (
    <div  className="flex flex-col gap-2">
      <Skeleton height="350px" baseColor="#363738" highlightColor="#404142" />
      <div className="flex justify-between ">
        <Skeleton
          height="10px"
          width={"75px"}
          baseColor="#363738"
          highlightColor="#404142"
          count={1}
        />
        <Skeleton
          height="10px"
          width={"50px"}
          baseColor="#363738"
          highlightColor="#404142"
          count={1}
        />
      </div>
      <Skeleton
        height="10px"
        width={"50px"}
        baseColor="#363738"
        highlightColor="#404142"
        count={1}
      />
      <Skeleton
        height="10px"
        width={"50px"}
        baseColor="#363738"
        highlightColor="#404142"
        count={1}
      />
    </div>
  );
}

export default SkeletonCard