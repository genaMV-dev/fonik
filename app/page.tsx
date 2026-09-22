"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import css from "./page.module.css"
import Image from "next/image"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

const slides = [
  { src: "/img/iphone17.webp", alt: "IPHONE 17" },
  { src: "/img/SamsungS24.webp", alt: "Samsung S24" },
  { src: "/img/GooglePixel1.webp", alt: "Google Pixel" },
  { src: "/img/Xiaomi17.webp", alt: "Xiaomi 17T" },
]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className={css.container}>
      <div className={css.text}>
        <h2 className={css.title}>SMARTPHONES FOR YOU</h2>
        <p className={css.paragraph}>
          Turn your used phone into <br /> cash or find your next smartphone
          directly <br /> from other users.
        </p>

        <ul className={css.btnList}>
          <li className={css.btnItem}>
            <Link className={css.sell} href="/sell">
              SELL NOW
            </Link>
          </li>
          <li className={css.btnItem}>
            <Link className={css.buy} href="/products">
              BUY NOW
            </Link>
          </li>
        </ul>
      </div>

      <div className={css.galleryWrapper}>
        <div className={css.gallery}>
          <div className={css.slideTrack}>
            <Image
              key={currentSlide.src}
              src={currentSlide.src}
              alt={currentSlide.alt}
              width={700}
              height={680}
              priority
              className={css.slideImage}
            />
          </div>
        </div>

        <div className={css.slider}>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous slide"
          >
            <IoIosArrowBack size={25} />
          </button>

          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`${css.sliderBtn} ${
                index === currentIndex ? css.sliderBtnActive : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}

          <button type="button" onClick={goToNext} aria-label="Next slide">
            <IoIosArrowForward size={25} />
          </button>
        </div>
      </div>
    </div>
  )
}
