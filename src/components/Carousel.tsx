import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Modal, ModalBody, Button } from "reactstrap";
import { Photo } from "utils/Types";

interface Props {
  photos: Photo[];
}

const Slide = (photo: Photo) => {
  return (
    <div>
      <picture className="content-image">
        <source srcSet={photo.urls.thumb} media="(max-width: 480px)" />
        <source srcSet={photo.urls.small} media="(max-width: 1024px)" />
        <img src={photo.urls.regular} alt={photo.description} />
      </picture>
      <div className="content-details">
        <h3>{photo.description || photo.alt_description}</h3> {/* eslint-disable-line camelcase */}
        <p>{photo.user.name}</p>
      </div>
    </div>
  );
};

const Carousel = ({ photos }: Props) => {
  const images = photos.map((p) => {
    return {
      original: p.urls.small,
      thumbnail: p.urls.thumb,
      thumbnailClass: "custom-thumb",
      renderItem: () => Slide(p),
    };
  });
  const toggle = () => {
    return 1;
  };
  const externalCloseBtn = (
    <button className="close-btn" onClick={toggle}>
      &times;
    </button>
  );
  return (
    <Modal size="lg" isOpen className="custom-modal" external={externalCloseBtn}>
      <ModalBody>
        <ImageGallery showPlayButton={false} items={images} />
      </ModalBody>
    </Modal>
  );
};

export default Carousel;
