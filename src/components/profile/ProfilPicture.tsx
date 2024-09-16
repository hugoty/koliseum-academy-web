import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryWidget from "../CloudinaryWidget/CloudinaryWidget";
import { User } from "../../utils/types/types";
import { useApiUser } from "../../hooks/useApiUser";

interface RoundedImageProps {
  src?: string | null;
  alt: string;
  size?: string;
  user: User;
}
interface MyRoundedImageProps {
  src?: string | null;
  alt: string;
  size?: string;
}
const ProfilPicture: React.FC<MyRoundedImageProps> = ({
  src = "",
  alt,
  size,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(src || "");

  return (
    <div>
      <div
        className={
          size
            ? `w-20 h-20 overflow-hidden rounded-full`
            : `w-10 h-10 overflow-hidden rounded-full`
        }
      >
        <img
          src={imageSrc || ""}
          alt={alt}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

const MyProfilPicture: React.FC<RoundedImageProps> = ({
  src = "",
  user,
  alt,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(user.profilePicture);
  const [publicId, setPublicId] = useState<string | null>(null);

  const cloudName = "djz1yrhvb"; // Utilise ton propre cloud name
  const apiUser = useApiUser(); // Appelle le hook ici, dans le composant principal

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const handleUploadSuccess = async (publicId: string, info: any) => {
    setPublicId(publicId); // Met à jour le publicId avec celui fourni après le téléversement

    const myImage = cld.image(publicId);
    const imageUrl = myImage.toURL();
    console.log("Image uploaded to Cloudinary:", imageUrl);
    setImageSrc(imageUrl); // Met à jour l'image affichée avec l'URL Cloudinary

    // Appel à updateProfil pour mettre à jour l'utilisateur avec l'URL de la nouvelle image
    try {
      const updatedUser = {
        ...user, // Garde les autres champs inchangés
        profilePicture: imageUrl, // Met à jour uniquement l'image de profil
      };
      console.log(updatedUser);

      await apiUser.updateProfil(updatedUser); // Utilise apiUser ici
      setImageSrc(imageUrl);
      console.log("Profil mis à jour avec succès");
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil:", err);
    }
  };

  return (
    <div className=" flex flex-col  gap-2 justify-center items-center ">
      <div className="w-48 h-48 overflow-hidden rounded-full">
        <img
          src={imageSrc || ""}
          alt={alt}
          className="object-cover w-full h-full"
        />
      </div>
      <CloudinaryWidget
        cloudName="djz1yrhvb"
        uploadPreset="ml_default"
        onUploadSuccess={(info: any) => {
          const publicId = info.public_id; // Extraire le publicId de l'info de téléversement
          handleUploadSuccess(publicId, info);
        }}
      />
    </div>
  );
};

export { ProfilPicture, MyProfilPicture };
