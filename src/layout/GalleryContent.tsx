import PhotoCard from "components/PhotoCard";
import { Photo } from "utils/Types";
import { memo } from "react";

interface Props {
  photos: Photo[];
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCarouselStartIdx: React.Dispatch<React.SetStateAction<number>>;
  lastPhotoRef?: any;
}

const GalleryContent = ({ photos, setModal, setCarouselStartIdx, lastPhotoRef }: Props) => {
  const openModalAtIdx = (idx: number) => {
    setModal(true);
    setCarouselStartIdx(idx);
  };
  return (
    <div className="gallery">
      {photos.map((photo, i) => {
        return photos.length - 1 === i ? (
          <PhotoCard
            lastPhotoRef={lastPhotoRef}
            key={photo.id}
            photo={photo}
            openModalAtIdx={() => openModalAtIdx(i + 1)}
          />
        ) : (
          <PhotoCard key={photo.id} photo={photo} openModalAtIdx={() => openModalAtIdx(i + 1)} />
        );
      })}
    </div>
  );
};

export default memo(GalleryContent);
