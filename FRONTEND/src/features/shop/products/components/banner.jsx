import { useEffect, useState } from "react";
import { CONFIG } from "@config/app";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
// import required modules
import { Scrollbar } from 'swiper/modules';


const ComercialBanner = () => {
    const [banner, setBanner] = useState({ images: [] });
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // Consultar la API
        fetch(CONFIG.API.URL.endpoints.bannerImages.get())
            .then((res) => res.json())
            .then((res) => {
                setBanner(res);
                setLoading(false);
            })
            .catch((err) => console.error("❌ Error al cargar banners:", err));
    }, []);

    // Cuando ya hay imágenes, inicializa el carrusel
    useEffect(() => {
        if (!isLoading && banner.images && banner.images.length > 0) {
            console.log("✅ Activando BAnner con imágenes:", banner.images);
            
        }
    }, [isLoading, banner]);

    if (isLoading) {
        return <p>Cargando banners...</p>;
    }

    return (

        // <div id="bannerCarousele" className="owl-carousel owl-theme">
        //   {banner.images.map((image, index) => (
        //     <div key={index} className="item">
        //       <img
        //         src={image}
        //         alt={`banner-${index}`}
        //         style={{ width: "100%", borderRadius: "10px" }}
        //       />
        //     </div>
        //   ))}
        <>
            <Swiper
                scrollbar={{
                    hide: true,
                }}
                modules={[Scrollbar]}
                className="mySwiper"
            >

                {banner.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`banner-${index}`}
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    </SwiperSlide>
                ))}

                {/* <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
        </>

    );
}

export default ComercialBanner;
