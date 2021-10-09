import { useState } from "react";
import { Photo } from "utils/Types";
import { useSwipeable } from "react-swipeable";
import Thumbnail from "./ThumbnailCarousel";

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
    <button className={`btn-outline slide-btn ${direction}`} onClick={moveSlide}>
      <i className={`fas fa-2x fa-caret-${direction}`} />
    </button>
  );
};

const Slide = ({ photo, active }: SlideProps) => {
  return (
    <div className={active ? "slider-item active" : "slider-item"}>
      <div className="overlay"></div>
      <picture className="content-image">
        <source srcSet={photo.urls.small} media="(max-width: 688px)" />
        <img src={photo.urls.regular} alt={photo.description} />
      </picture>
      <div className="olay-details">
        <h3>{photo.description || photo.alt_description || "untitled"}</h3> {/* eslint-disable-line camelcase */}
        <p>{photo.user.name}</p>
      </div>
      <div className="olay-sm-details">
        <h5 className="px-3 pt-3">{photo.description || photo.alt_description || "untitled"}</h5>
        {/* eslint-disable-line camelcase */}
        <p className="px-3 pb-3">{photo.user.name}</p>
      </div>
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

  const swipeHandler = useSwipeable({
    onSwipedLeft: () => prevSlide(),
    onSwipedRight: () => nextSlide(),
  });

  return (
    <div>
      <div {...swipeHandler} className="slider-container">
        {photos.map((photo, idx) => (
          <Slide photo={photo} active={slideIndex === idx + 1} key={photo.id} />
        ))}
        <CarouselController moveSlide={nextSlide} direction={Direction.NEXT} />
        <CarouselController moveSlide={prevSlide} direction={Direction.PREV} />
      </div>
      <Thumbnail setSlideIndex={setSlideIndex} slideIndex={slideIndex} photos={photos} />
    </div>
  );
};

export default CustomCarousel;
