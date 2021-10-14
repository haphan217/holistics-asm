import { useState, useEffect, useRef, useCallback } from "react";
import { getPhotos } from "services/galleryService";
import { Photo } from "utils/Types";
import { Modal, ModalBody, Container, Spinner } from "reactstrap";
import CustomCarousel from "components/CustomCarousel";
import { useResize } from "utils/useResize";
import GalleryContent from "./GalleryContent";

const sortPhotos = (photoArr: Photo[], colNum: number) => {
  const sortedArr: Photo[] = [];
  let baseColNum = 0;

  while (baseColNum < colNum) {
    for (let i = baseColNum; i < photoArr.length; i += colNum) {
      sortedArr.push(photoArr[i]);
    }
    baseColNum++;
  }

  return sortedArr;
};

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [sortedPhotos, setSortedPhotos] = useState<Photo[]>([]);
  const [columns, setColumns] = useState<number>();
  const [width] = useResize();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [carouselStartIdx, setCarouselStartIdx] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await getPhotos(page);
        const newList: Photo[] = data.results as Photo[];
        setPhotos((prevList) => {
          return [...prevList, ...newList];
        });
        if (page === 1) setPage(2);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  useEffect(() => {
    if (width >= 1280 && columns !== 3) {
      setColumns(3);
    } else if (width >= 992 && width < 1280 && columns !== 2) {
      setColumns(2);
    } else if (width < 992 && columns !== 1) {
      setColumns(1);
    }
  }, [width]);

  useEffect(() => {
    if (columns === 1 || !columns) {
      setSortedPhotos(photos);
    } else {
      setSortedPhotos(sortPhotos(photos, columns));
    }
  }, [columns, photos]);

  const observer = useRef<any>();
  const lastPhotoRef = useCallback((lastPhoto) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && photos.length <= 1000) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (lastPhoto) observer.current.observe(lastPhoto);
  }, []);

  const externalCloseBtn = <i className="close-btn fas fa-lg fa-times" onClick={() => setModal(false)} role="button" />;

  return (
    <Container className="pb-5">
      <Modal
        isOpen={modal}
        className="custom-modal"
        external={externalCloseBtn}
        toggle={() => setModal(!modal)}
        backdropClassName="custom-backdrop"
      >
        <ModalBody>
          <CustomCarousel photos={sortedPhotos} startIdx={carouselStartIdx} />
        </ModalBody>
      </Modal>
      <GalleryContent
        photos={sortedPhotos}
        setCarouselStartIdx={setCarouselStartIdx}
        setModal={setModal}
        lastPhotoRef={lastPhotoRef}
      />
      {loading && (
        <div className="d-flex justify-content-center py-3">
          <Spinner style={{ color: "#fe3e82", width: "3rem", height: "3rem" }} />
        </div>
      )}
    </Container>
  );
};

export default Gallery;
