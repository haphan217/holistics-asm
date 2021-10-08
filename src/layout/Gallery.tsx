import { useState, useEffect, createContext, useRef, useCallback } from "react";
import { getPhotos } from "services/galleryService";
import { Photo } from "utils/Types";
import { Modal, ModalBody, Container, Spinner } from "reactstrap";
import PhotoCard from "components/PhotoCard";
import Carousel from "components/Carousel";

interface ContextProps {
  startIdx: number;
}

export const Context = createContext<ContextProps>({ startIdx: 0 });

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [carouselStartIdx, setCarouselStartIdx] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // const { data } = await getPhotos(page);
        // const newList: Photo[] = data.results as Photo[];
        // setPhotos((prevList) => {
        //   return [...prevList, ...newList];
        // });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const observer = useRef<any>();
  const lastPhotoRef = useCallback(
    (lastPhoto) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && photos.length <= 1000) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (lastPhoto) observer.current.observe(lastPhoto);
    },
    [loading, photos.length],
  );

  const openModalAtIdx = (idx: number) => {
    setModal(true);
    setCarouselStartIdx(idx);
  };

  const externalCloseBtn = <i className="close-btn fas fa-lg fa-times" onClick={() => setModal(false)} role="button" />;

  // useEffect(() => {
  //   if (modal) {
  //     document.documentElement.scrollTop = 0;
  //     if (document.scrollingElement) {
  //       document.scrollingElement.scrollTop = 0;
  //     }
  //     if (modalRef.current) {
  //       modalRef.current.scrollTop = 0;
  //     }
  //   }
  // }, [modal]);

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
        {photos.map((photo, i) => {
          return photos.length - 1 === i ? (
            <PhotoCard ref={lastPhotoRef} key={photo.id} photo={photo} openModalAtIdx={() => openModalAtIdx(i)} />
          ) : (
            <PhotoCard key={photo.id} photo={photo} openModalAtIdx={() => openModalAtIdx(i)} />
          );
        })}
      </div>
      {!loading && (
        <div className="d-flex justify-content-center">
          <Spinner style={{ color: "#fe3e82", width: "3rem", height: "3rem" }} />
        </div>
      )}
      {/* </Context.Provider> */}
    </Container>
  );
};

export default Gallery;
