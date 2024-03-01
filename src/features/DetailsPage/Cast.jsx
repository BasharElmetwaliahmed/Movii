// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import {  orignalPath } from "../../services/api";

import  UnkownImage from '../../assets/71OUY6TSvvL (1).jpg'
function Cast({cast}) {
  if(cast.length===0) return;
  return (
    <div className=" py-8">
      <h2 className="py-8 dark:text-white font-bebas text-lightext text-5xl">Cast</h2>
      <Swiper spaceBetween={50}  breakpoints={ {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
      }}>
        {cast.slice(0, 10).map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={
                item.profile_path
                  ? `${orignalPath}/${item.profile_path}`
                  : UnkownImage
              }
              alt={item.name}
              className=" rounded-md "
            />
            <h3 className="py-2 text-center dark:text-white text-lightext">
              {item?.name}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Cast;
