import { useEffect, useRef, useState } from "react";
import { Photo } from "utils/Types";

interface Props {
  photo: Photo;
  openModalAtIdx: () => void;
}

const PhotoCard = ({ photo, openModalAtIdx }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [spans, setSpans] = useState<number>(0);

  const getSpans = () => {
    const height = imgRef.current?.clientHeight || 1;
    setSpans(Math.round(height / 10) + 1);
  };

  useEffect(() => {
    imgRef.current?.addEventListener("load", getSpans);
  }, []);

  return (
    <div key={photo.id} style={{ gridRowEnd: `span ${spans}` }} onClick={openModalAtIdx} role="button">
      <div className="overlay" style={{ height: imgRef.current?.clientHeight }}></div>
      <picture>
        <source srcSet={photo.urls.thumb} media="(max-width: 480px)" />
        <img ref={imgRef} src={photo.urls.small} alt={photo.description} />
      </picture>
      <div className="olay-details">
        <h3>{photo.description || photo.alt_description}</h3> {/* eslint-disable-line camelcase */}
        <p>{photo.user.name}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
