import { useState, useEffect } from "react";
import { getPhotos } from "services/galleryService";
import { Photo } from "utils/Types";
import { Container } from "reactstrap";
import PhotoCard from "components/PhotoCard";

const Gallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

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
  return (
    <Container>
      <div className="gallery">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </Container>
  );
};

export default Gallery;
