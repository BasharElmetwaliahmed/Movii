// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import Card from "../../components/Card";

function Recommendations({ recommendations, type }) {
  console.log(recommendations);
  if(recommendations.length===0) return;
  return (
    <div className=" py-10">
      <h2 className="py-8 dark:text-white font-bebas text-lightext md:text-5xl text-3xl">
        Recommendations
      </h2>
      <Swiper
        spaceBetween={50}
        breakpoints={{
          560: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}>
        {recommendations?.map((item) => (
          <SwiperSlide key={item.id}>
            <Card item={item} type={type} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Recommendations;
