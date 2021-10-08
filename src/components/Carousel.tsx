import { Context } from "layout/Gallery";
import { useContext } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Photo } from "utils/Types";
interface Props {
  startIdx: number;
  photos: Photo[];
}

const Slide = (photo: Photo) => {
  return (
    <div>
      <picture className="content-image">
        {/* <source srcSet={photo.urls.small} media="(max-width: 480px)" /> */}
        <source srcSet={photo.urls.small} media="(max-width: 1024px)" />
        <img src={photo.urls.regular} alt={photo.description} />
      </picture>
      <div className="content-details">
        <h3>{photo.description || photo.alt_description || "untitled"}</h3> {/* eslint-disable-line camelcase */}
        <p>{photo.user.name}</p>
      </div>
    </div>
  );
};

//TODO: onScreenChange toggle fullscreen

const Carousel = ({ photos, startIdx }: Props) => {
  // const { startIdx } = useContext(Context);
  const images = photos.map((p) => {
    return {
      original: p.urls.small,
      thumbnail: p.urls.thumb,
      thumbnailClass: "custom-thumb",
      renderItem: () => Slide(p),
    };
  });
  return <ImageGallery startIndex={startIdx} showPlayButton={false} items={images} />;
};

export default Carousel;
