import { useState } from "react";
import { Photo } from "utils/Types";
useState;
enum Direction {
  NEXT = "right",
  PREV = "left",
}

interface CarouselProps {
  startIdx: number;
  photos: Photo[];
}

interface ControllerProps {
  direction: Direction;
  moveSlide: () => void;
}

interface SlideProps {
  photo: Photo;
  active: boolean;
}

const CarouselController = ({ direction, moveSlide }: ControllerProps) => {
  return (
    <button className={`btn-outline slide-btn ${direction}`}>
      <i className={`fas fa-2x fa-caret-${direction}`} onClick={moveSlide} />
    </button>
  );
};

const Slide = ({ photo, active }: SlideProps) => {
  return (
    <div className={active ? "slider-item active" : "slider-item"}>
      <picture className="content-image">
        {/* <source srcSet={photo.urls.small} media="(max-width: 480px)" /> */}
        <source srcSet={photo.urls.small} media="(max-width: 1024px)" />
        <img src={photo.urls.regular} alt={photo.description} />
      </picture>
    </div>
  );
};

const CustomCarousel = ({ startIdx, photos }: CarouselProps) => {
  const [slideIndex, setSlideIndex] = useState<number>(startIdx);

  const nextSlide = () => {
    slideIndex === photos.length ? setSlideIndex(1) : setSlideIndex(slideIndex + 1);
  };

  const prevSlide = () => {
    slideIndex === 1 ? setSlideIndex(photos.length) : setSlideIndex(slideIndex - 1);
  };
  return (
    <div className="slider-container">
      {photos.map((photo, idx) => (
        <Slide photo={photo} active={slideIndex === idx + 1} key={photo.id} />
      ))}
      <CarouselController moveSlide={nextSlide} direction={Direction.NEXT} />
      <CarouselController moveSlide={prevSlide} direction={Direction.PREV} />
    </div>
  );
};

export default CustomCarousel;
