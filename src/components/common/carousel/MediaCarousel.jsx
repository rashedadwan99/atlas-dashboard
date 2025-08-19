import React from "react";
import { Carousel } from "react-bootstrap";
import Cimg from "../image/Cimg";
import "./MediaCarousel.css"; // استيراد ملف الـ CSS المخصص

const MediaCarousel = ({ images = [], video = null, height = 100 }) => {
  return (
    <Carousel
      indicators={true}
      interval={null}
      variant="dark"
      className="media-carousel"
    >
      {images.map((img, index) => (
        <Carousel.Item key={index}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Cimg
              src={img}
              alt={`slide-${index}`}
              style={{
                width: "100%",
                height,
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </div>
        </Carousel.Item>
      ))}

      {video && (
        <Carousel.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <video
              controls
              style={{
                width: "100%",
                height,
                objectFit: "contain",
                borderRadius: 8,
              }}
            >
              <source src={video} type="video/mp4" />
              المتصفح لا يدعم تشغيل الفيديو.
            </video>
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
};

export default MediaCarousel;
