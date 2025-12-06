import { useEffect, useState } from "react";
import { CONFIG } from "@config/app";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const ComercialBanner = () => {
    const [banner, setBanner] = useState({ images: [] });
    const [isLoading, setLoading] = useState(true);
    const [details, setDetails] = useState(null)
    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            detailsChanged(s) {
                setDetails(s.track.details)
            },
            initial: 2,
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 1300)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )
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
            

        }
    }, [isLoading, banner]);

    if (isLoading) {
        return <p>Cargando banners...</p>;
    }

    return (

        <>
            <div ref={sliderRef} className="keen-slider">
                {
                    banner.images.map((image, index) => (

                        <div className={" keen-slider__slide number-slide" + index} key={index}>
                            <img
                                src={image}
                                alt={`banner-${index}`}
                                className="h-[500px] md:h-[400px] w-full "
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </div>
                    ))
                }


            </div>
        </>


    );
}

export default ComercialBanner;
