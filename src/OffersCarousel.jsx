"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

const bikeOffers = [
  {
    name: "Aprilia SR 160",
    price: "₹1,43,000*",
    image: "/images/sr160.webp",
  },
  {
    name: "Aprilia SR 125",
    price: "₹1,24,000*",
    image: "/images/sr125.webp",
  },
  {
    name: "Aprilia Storm 125",
    price: "₹1,20,000*",
    image: "/images/Storm-125.webp",
  },
  {
    name: "Aprilia RS 457",
    price: "₹4,10,000*",
    image: "/images/02.webp",
  },
];

export default function PremiumOffersCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <section className="relative bg-gradient-to-b from-black via-[#111] to-[#0a0a0a] py-16 overflow-hidden text-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-cover bg-center"></div>

      {/* Title */}
      <h2 className="relative mb-10 text-4xl font-extrabold tracking-wider text-center text-transparent uppercase bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text">
        Premium Bike Offers
      </h2>

      <div className="relative px-6 mx-auto max-w-7xl">
        {/* Prev Button */}
        <button
          ref={prevRef}
          className="absolute left-0 z-10 p-3 transition -translate-y-1/2 rounded-full bg-black/70 top-1/2 hover:bg-red-600"
        >
          ❮
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={setSwiperInstance}
          spaceBetween={25}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {bikeOffers.map((bike, index) => (
            <SwiperSlide key={index}>
              <div className="relative overflow-hidden transition-all duration-500 border border-gray-800 shadow-xl group rounded-2xl bg-gradient-to-b from-gray-900 to-black hover:border-red-600">
                {/* Offer Tag */}
                <span className="absolute top-0 right-0 px-3 py-1 text-xs font-semibold text-black uppercase rounded-bl-lg bg-gradient-to-r from-yellow-400 to-red-500">
                  Offer
                </span>

                {/* Image */}
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="object-contain w-full transition-transform duration-700 h-52 md:h-60 group-hover:scale-110"
                />

                {/* Info */}
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-white transition group-hover:text-red-500">
                    {bike.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Save up to{" "}
                    <span className="font-semibold text-red-400">
                      {bike.price}
                    </span>
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 opacity-0 bg-black/70 group-hover:opacity-100">
                  <button className="px-5 py-2 text-sm font-semibold uppercase transition rounded-full bg-gradient-to-r from-red-600 to-orange-500 hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <button
          ref={nextRef}
          className="absolute right-0 z-10 p-3 transition -translate-y-1/2 rounded-full bg-black/70 top-1/2 hover:bg-red-600"
        >
          ❯
        </button>
      </div>

      {/* Note */}
      <p className="relative mt-8 text-sm text-center text-gray-500">
        *Terms & Conditions Apply
      </p>
    </section>
  );
}
