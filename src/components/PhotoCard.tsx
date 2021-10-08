import { useEffect, useRef, useState } from "react";
import { Photo } from "utils/Types";

interface Props {
  lastPhotoRef?: any;
  photo: Photo;
  openModalAtIdx: () => void;
}

const PhotoCard = ({ photo, openModalAtIdx, lastPhotoRef }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [spans, setSpans] = useState<number>(0);

  const getSpans = () => {
    const height = imgRef.current?.clientHeight || 1;
    setSpans(Math.round(height / 10) + 1);
  };

  useEffect(() => {
    imgRef.current?.addEventListener("load", getSpans);
  }, []);

  useEffect(() => {
    console.log(spans);
  }, [spans]);

  return (
    <div
      ref={lastPhotoRef}
      className="photo-wrapper"
      style={{ gridRowEnd: `span ${spans || 31}` }}
      onClick={openModalAtIdx}
      role="button"
    >
      {spans === 0 && <div className="skeleton" style={{ backgroundColor: photo.color }} />}
      <div className="overlay" style={{ height: imgRef.current?.clientHeight || 300 }}></div>
      <picture>
        <source srcSet={photo.urls.thumb} media="(max-width: 480px)" />
        <img ref={imgRef} src={photo.urls.small} alt={photo.description} />
      </picture>

      <div className="olay-details">
        <h3>{photo.description || photo.alt_description || "untitled"}</h3> {/* eslint-disable-line camelcase */}
        <p>{photo.user.name}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
