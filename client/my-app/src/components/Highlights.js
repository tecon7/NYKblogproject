import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from 'react';

function Highlights () {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);}

    return (
        <>
        <div className="carousel-wrapper">
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      <Carousel.Item>
      <iframe
              title="First slide"
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/Ki1anCU9bq8"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
        <Carousel.Caption>
          <h3>Randle Game Winner</h3>
          <p>Randle's buzzer beater takes down the Heat in a thrilling game.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <iframe
              title="First slide"
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/8-QEdMNuXZs"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

        <Carousel.Caption>
          <h3>Brunson's Career High!</h3>
          <p>Brunson goes toe to toe with Mitchell, but Knicks prevail.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <iframe
              title="First slide"
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/jZnfMZqo5Xc"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

        <Carousel.Caption>
          <h3>Knicks Young Trio</h3>
          <p>
            Toppin, Quickley, Grimes each go for 30+ in win over Pacers.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    </>
    )
}
export default Highlights; 