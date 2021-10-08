import { useEffect, useRef, useState } from "react";
import { Photo } from "utils/Types";

const PhotoCard = ({ photo }: { photo: Photo }) => {
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
    <div key={photo.id} style={{ gridRowEnd: `span ${spans}` }}>
      <div className="overlay" style={{ height: imgRef.current?.clientHeight }}></div>
      <picture>
        <source srcSet={photo.urls.thumb} media="(max-width: 480px)" />
        <img ref={imgRef} src={photo.urls.small} alt={photo.description} />
      </picture>
    </div>
  );
};

export default PhotoCard;
