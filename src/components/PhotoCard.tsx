import { useEffect, useRef, useState } from "react";
import { Photo } from "utils/Types";

interface Props {
  lastPhotoRef?: any;
  photo: Photo;
  openModalAtIdx: () => void;
}

const PhotoCard = ({ photo, openModalAtIdx, lastPhotoRef }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    imgRef.current?.addEventListener("load", () => setLoaded(true));
  }, []);

  return (
    <div ref={lastPhotoRef} className="photo-wrapper" onClick={openModalAtIdx} role="button">
      {!loaded && <div className="skeleton" style={{ backgroundColor: photo.color }} />}
      <div className="overlay" style={{ height: imgRef.current?.clientHeight || 300 }}></div>
      <picture>
        <source srcSet={photo.urls.small} media="(max-width: 480px)" />
        <source srcSet={photo.urls.regular} media="(max-width: 992px)" />
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
