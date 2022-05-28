import React, { useState, useEffect } from 'react'
import { useExample } from './context/ExampleContext'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const ExampleComponent = () => {
  const { exampleValue } = useExample()
  const [number, setNumber] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setNumber(number + 1)
    }, 1000)
  }, [number])

  return (
    <>
      <div>Example React useState: {number}</div>
      <div>Example React useContext: {exampleValue}</div>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide className="slide">Slide 1</SwiperSlide>
        <SwiperSlide className="slide">Slide 2</SwiperSlide>
        <SwiperSlide className="slide">Slide 3</SwiperSlide>
        <SwiperSlide className="slide">Slide 4</SwiperSlide>
        <SwiperSlide className="slide">Slide 5</SwiperSlide>
        <SwiperSlide className="slide">Slide 6</SwiperSlide>
        <SwiperSlide className="slide">Slide 7</SwiperSlide>
      </Swiper>
    </>
  )
}

export default ExampleComponent
