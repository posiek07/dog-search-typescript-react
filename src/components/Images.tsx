import React from 'react';
import { SRLWrapper } from 'simple-react-lightbox';

interface ImagesProps {
  images: string[];
}

const Images: React.FC<ImagesProps> = ({ images }) => {
  return (
    <SRLWrapper>
      <div className="row d-flex justify-content-center ml-0 mr-0">
        {images.map((img, index) => (
          <div
            key={index}
            className="col-4 col-md-1 m-3 image-container "
            role="feed"
          >
            <img className="img-fluid" src={img} alt={img} />
          </div>
        ))}
      </div>
    </SRLWrapper>
  );
};
export default Images;
