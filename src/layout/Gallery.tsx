import { useState, useEffect } from "react";
import { getPhotos } from "services/galleryService";
import { Photo } from "utils/Types";

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
    <div>
      {photos.map((photo) => (
        <div key={photo.id}></div>
      ))}
    </div>
  );
};

export default Gallery;
