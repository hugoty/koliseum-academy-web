import React from 'react';

interface RoundedImageProps {
  src: string;
  alt: string;
  size?: string;
}

const ProfilPicture: React.FC<RoundedImageProps> = ({ src, alt, size }) => {
  return (
    <div className={size ? `w-20 h-20 overflow-hidden rounded-full` : `w-10 h-10 overflow-hidden rounded-full` }>
      <img src={src} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
};

export default ProfilPicture;
