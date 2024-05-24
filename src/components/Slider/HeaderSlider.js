import React from 'react';
import "./HeaderSlider.scss";
import { sliderImgs } from "../../utils/images";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeaderSlider = () => {
  let settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='slider'>
      <div className='container'>
        <div className='slider-content overflow-x-hidden'>
          <Slider {...settings}>
            <div className='slider-item'>
              <img src = {sliderImgs[2]} alt = "" />
            </div>
            <div className='slider-item'>
              <img src = {sliderImgs[3]} alt = "" />
            </div>
            <div className='slider-item'>
              <img src = {sliderImgs[4]} alt = "" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default HeaderSlider