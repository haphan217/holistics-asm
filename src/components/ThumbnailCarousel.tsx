import { useState, useEffect } from "react";
import { Photo } from "utils/Types";
import { useSwipeable } from "react-swipeable";

interface ThumbnailCarouselProps {
  photos: Photo[];
  slideIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface ThumbnailProps {
  active: boolean;
  index: number;
  photo: Photo;
  onThumbnailClick: (event: any, index: number) => void;
}

const Thumbnail = ({ photo, index, active, onThumbnailClick }: ThumbnailProps) => {
  return (
    <div className={`image-gallery-thumbnail ${active && "active"}`} onClick={(e) => onThumbnailClick(e, index)}>
      <img className="image-gallery-thumbnail-image" src={photo.urls.thumb} width="auto" alt={photo.alt_description} />
    </div>
  );
};

const ThumbnailCarousel = ({ setSlideIndex, photos, slideIndex }: ThumbnailCarouselProps) => {
  const startOfThumb = slideIndex - 1 - ((slideIndex - 1) % 5);
  const thumbIdx = [1, 2, 3, 4, 5];
  const [currentThumbs, setCurrentThumbs] = useState<number[]>(thumbIdx.map((n) => n + startOfThumb));

  useEffect(() => {
    const goTo = slideIndex - 1 - ((slideIndex - 1) % 5);
    if (!currentThumbs.includes(slideIndex)) {
      setCurrentThumbs(thumbIdx.map((n) => n + goTo));
    }
  }, [slideIndex]);

  const onThumbnailClick = (event: any, index: number) => {
    event.target.parentNode.parentNode.blur();
    setSlideIndex(index);
  };

  const nextSlide = () => {
    currentThumbs[4] === photos.length
      ? setCurrentThumbs(thumbIdx)
      : setCurrentThumbs((prevThumbs) => prevThumbs.map((thumb) => thumb + 5));
  };

  const prevSlide = () => {
    const backTo = photos.length - 1 - ((photos.length - 1) % 5);
    currentThumbs[0] === 1
      ? setCurrentThumbs(thumbIdx.map((t) => t + backTo))
      : setCurrentThumbs((prevThumbs) => prevThumbs.map((thumb) => thumb - 5));
  };

  const swipeHandler = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
  });

  return (
    <div {...swipeHandler} className="thumbnail-container">
      <button className="thumb-btn" onClick={prevSlide}>
        <i className="fas fa-2x fa-caret-left " />
      </button>
      {currentThumbs.map((p) => (
        <Thumbnail
          key={photos[p - 1].id}
          photo={photos[p - 1]}
          onThumbnailClick={onThumbnailClick}
          index={p}
          active={slideIndex === p}
        />
      ))}
      <button className="thumb-btn " onClick={nextSlide}>
        <i className="fas fa-2x fa-caret-right" />
      </button>
    </div>
  );
};

export default ThumbnailCarousel;
