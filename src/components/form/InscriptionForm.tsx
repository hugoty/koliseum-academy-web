import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryWidget from "../CloudinaryWidget/CloudinaryWidget";
import { validateInscriptionForm } from "../../utils/formErrorUtils";
import ButtonLoader from "../common/ButtonLoader";

interface InscriptionFormProps {
    onSubmit: (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        uploadedDocs: string[]
    ) => void;
}

const InscriptionForm: React.FC<InscriptionFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        sqlInjection?: string;
    }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cloudName = "djz1yrhvb";
    const cld = new Cloudinary({
        cloud: {
            cloudName,
        },
    });

    const handleUploadSuccess = async (publicId: string, info: any) => {
        const docUrl = cld.image(publicId).toURL();

        // Ajoute le document sans déclencher la soumission du formulaire
        setUploadedDocs((prevDocs) =>
            prevDocs.includes(docUrl) ? prevDocs : [...prevDocs, docUrl]
        );

        // Marque la fin de l'upload mais ne soumet pas le formulaire
        setUploading(false);
    };
    const handleRemoveDoc = (docUrl: string) => {
        setUploadedDocs((prevDocs) => prevDocs.filter((doc) => doc !== docUrl));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (uploading) {
            alert("Veuillez attendre la fin du téléchargement des documents.");
            return;
        }

        const formValues = {
            email,
            password,
            firstName,
            lastName,
        };

        const validationErrors = validateInscriptionForm(formValues);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                await onSubmit(
                    email,
                    password,
                    firstName,
                    lastName,
                    uploadedDocs
                );
            } finally {
                setIsSubmitting(false); // Remettre à false après la soumission
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="w-full flex flex-col md:m-auto m-0">
            <form onSubmit={handleSubmit} noValidate>
                {/* Champs du formulaire */}
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="mb-4">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting || uploading}
                    />
                    {errors.email && (
                        <span className="text-red-500 mt-2">
                            {errors.email}
                        </span>
                    )}
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="firstName" className="mb-4">
                        Prénom *
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={isSubmitting || uploading}
                    />
                    {errors.firstName && (
                        <span className="text-red-500 mt-2">
                            {errors.firstName}
                        </span>
                    )}
                </div>
                <div className="flex flex-col mb-8">
                    <label htmlFor="lastName" className="mb-4">
                        Nom *
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={isSubmitting || uploading}
                    />
                    {errors.lastName && (
                        <span className="text-red-500 mt-2">
                            {errors.lastName}
                        </span>
                    )}
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="password" className="mb-2">
                        Mot de passe *
                    </label>
                    <span className="text-xs font-thin mb-4">
                        (8 caractères minimum, 1 chiffre et 1 caractère spécial)
                    </span>
                    <div className="flex relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="rounded-lg bg-[#2c3540b5] px-4 py-2 w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isSubmitting || uploading}
                        />
                        <div
                            className="absolute right-5 top-2.5 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEyeSlash size={20} />
                            ) : (
                                <FaEye size={20} />
                            )}
                        </div>
                    </div>
                    {errors.password && (
                        <span className="text-red-500 mt-2">
                            {errors.password}
                        </span>
                    )}
                </div>
                {/* Upload des documents */}
                <div className="flex flex-col mb-8">
                    <label htmlFor="documents" className="mb-4">
                        Sélectionner des documents
                    </label>
                    <CloudinaryWidget
                        cloudName={cloudName}
                        uploadPreset="ml_default"
                        onUploadSuccess={(info: any) => {
                            const publicId = info.public_id;
                            handleUploadSuccess(publicId, info); // Gère l'upload des PDF
                        }}
                        isPP={false}
                    />
                </div>
                {/* Prévisualisation des documents */}
                {uploadedDocs.length > 0 && (
                    <div className="flex flex-col mb-8">
                        <h4 className="mb-4">Prévisualisation des documents</h4>
                        <div className="flex flex-wrap gap-4">
                            {uploadedDocs.map((doc, index) => (
                                <div key={index} className="relative">
                                    {doc.endsWith(".pdf") ? (
                                        <div className="border border-gray-300 p-2">
                                            <iframe
                                                src={doc}
                                                className="w-32 h-40"
                                                title={`pdf-preview-${index}`}
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <img
                                            src={doc}
                                            alt={`upload-preview-${index}`}
                                            className="w-32 h-32 object-cover"
                                        />
                                    )}
                                    <button
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold"
                                        onClick={() => handleRemoveDoc(doc)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="text-xs font-thin mb-6">
                    (*) Champs obligatoires
                </div>
                <div className="w-full flex flex-row justify-between">
                    <button
                        className="rounded-lg bg-[#2c3540b5] px-4 py-2 hover:bg-[#2c35405a]"
                        type="submit"
                        disabled={isSubmitting || uploading}
                    >
                        {isSubmitting || uploading ? (
                            <div className="flex flex-row flex-nowrap">
                                <ButtonLoader />
                                <span className="ml-2">
                                    Veuillez patienter...
                                </span>{" "}
                            </div>
                        ) : (
                            "S'inscrire"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InscriptionForm;
