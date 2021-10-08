import { useState, useEffect, createContext } from "react";
import { getPhotos } from "services/galleryService";
import { Photo } from "utils/Types";
import { Modal, ModalBody, Container } from "reactstrap";
import PhotoCard from "components/PhotoCard";
import Carousel from "components/Carousel";

interface ContextProps {
  startIdx: number;
}

export const Context = createContext<ContextProps>({ startIdx: 0 });

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [carouselStartIdx, setCarouselStartIdx] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getPhotos(1);
        const tempList: Photo[] = data.results as Photo[];
        setPhotos(tempList);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const openModalAtIdx = (idx: number) => {
    setModal(true);
    setCarouselStartIdx(idx);
  };

  const externalCloseBtn = (
    <button className="close-btn" onClick={() => setModal(false)}>
      &times;
    </button>
  );

  return (
    <Container>
      {/* <Context.Provider value={{ startIdx: carouselStartIdx }}> */}
      <Modal
        size="lg"
        isOpen={modal}
        className="custom-modal"
        external={externalCloseBtn}
        toggle={() => setModal(!modal)}
      >
        <ModalBody>
          <Carousel photos={photos} startIdx={carouselStartIdx} />
        </ModalBody>
      </Modal>
      <div className="gallery">
        {photos.map((photo, i) => (
          <PhotoCard key={photo.id} photo={photo} openModalAtIdx={() => openModalAtIdx(i)} />
        ))}
      </div>
      {/* </Context.Provider> */}
    </Container>
  );
};

export default Gallery;
