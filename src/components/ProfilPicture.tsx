import React from 'react';

interface RoundedImageProps {
  src: string;
  alt: string;
}

const ProfilPicture: React.FC<RoundedImageProps> = ({ src, alt }) => {
  return (
    <div className="w-10 h-10 overflow-hidden rounded-full">
      <img src={src} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
};

export default ProfilPicture;
