// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { backPath, orignalPath } from "../../services/api";

function Cast({cast}) {
  return (
    <div className="bg-dark py-8">
      <h2 className='py-8 text-primary text-5xl'>Cast</h2>  
      <Swiper spaceBetween={50} slidesPerView={5}>
        {cast.slice(0,10).map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={`${orignalPath}/${item?.profile_path}`}
              alt={item.name}
              className=" rounded-md"
              
            />
            <h3 className="py-2 text-center text-white">{item?.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Cast;
