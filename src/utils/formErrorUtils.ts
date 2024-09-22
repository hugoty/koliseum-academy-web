import { Level } from "./types/types";

interface FormUserErrors {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    sqlInjection?: string;
}

interface FormCoursErrors {
    sports?: string;
    participants?: string;
    dateDebut?: string;
    dateFin?: string;
    lieu?: string;
    prix?: string;
    niveau?: string;
    sqlInjection?: string;
}

// Validation spécifique pour le formulaire de connexion
export const validateConnexionForm = (formValues: {
    email: string;
    password: string;
}): FormUserErrors => {
    const errors: FormUserErrors = {};

    // Validation de l'email
    if (!isNotEmpty(formValues.email)) {
        errors.email = "L'email ne peut pas être vide.";
    } else if (!validateEmail(formValues.email)) {
        errors.email = "Veuillez entrer un email valide.";
    }

    // Validation du mot de passe
    if (!isNotEmpty(formValues.password)) {
        errors.password = "Le mot de passe ne peut pas être vide.";
    }

    // Vérification anti-injection SQL
    if (
        !validateSQLInjection(formValues.email) ||
        !validateSQLInjection(formValues.password)
    ) {
        errors.sqlInjection = "Caractères non autorisés détectés.";
    }

    return errors;
};

// Validation spécifique pour le formulaire d'inscription
export const validateInscriptionForm = (formValues: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}): FormUserErrors => {
    const errors: FormUserErrors = {};

    // Validation de l'email
    if (!isNotEmpty(formValues.email)) {
        errors.email = "L'email ne peut pas être vide.";
    } else if (!validateEmail(formValues.email)) {
        errors.email = "Veuillez entrer un email valide.";
    }

    // Validation du mot de passe
    if (!isNotEmpty(formValues.password)) {
        errors.password = "Le mot de passe ne peut pas être vide.";
    } else if (!validatePassword(formValues.password)) {
        errors.password =
            "Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.";
    }

    // Validation du prénom
    if (!isNotEmpty(formValues.firstName)) {
        errors.firstName = "Le prénom ne peut pas être vide.";
    }

    // Validation du nom
    if (!isNotEmpty(formValues.lastName)) {
        errors.lastName = "Le nom ne peut pas être vide.";
    }

    // Vérification anti-injection SQL
    if (
        !validateSQLInjection(formValues.email) ||
        !validateSQLInjection(formValues.password) ||
        !validateSQLInjection(formValues.firstName) ||
        !validateSQLInjection(formValues.lastName)
    ) {
        errors.sqlInjection = "Caractères non autorisés détectés.";
    }

    return errors;
};

// Validation spécifique pour le formulaire de mise à jour de profil
export const validateUpdateProfilForm = (formValues: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string | null;
}): FormUserErrors => {
    const errors: FormUserErrors = {};

    // Validation du prénom
    if (!isNotEmpty(formValues.firstName)) {
        errors.firstName = "Le prénom ne peut pas être vide.";
    }

    // Validation du nom
    if (!isNotEmpty(formValues.lastName)) {
        errors.lastName = "Le nom ne peut pas être vide.";
    }

    // Validation de l'email
    if (!isNotEmpty(formValues.email)) {
        errors.email = "L'email ne peut pas être vide.";
    } else if (!validateEmail(formValues.email)) {
        errors.email = "Veuillez entrer un email valide.";
    }

    // Validation du mot de passe
    if (!validatePassword(formValues.password)) {
        errors.password =
            "Le mot de passe doit contenir au moins 8 caractères, un chiffre et un caractère spécial.";
    }

    // Validation de la date de naissance (optionnelle mais doit être valide si présente)
    if (formValues.dateOfBirth && isNaN(Date.parse(formValues.dateOfBirth))) {
        errors.dateOfBirth = "Veuillez entrer une date de naissance valide.";
    }

    // Vérification anti-injection SQL
    if (
        !validateSQLInjection(formValues.email) ||
        !validateSQLInjection(formValues.password) ||
        !validateSQLInjection(formValues.firstName) ||
        !validateSQLInjection(formValues.lastName)
    ) {
        errors.sqlInjection = "Caractères non autorisés détectés.";
    }

    return errors;
};

export const validateCreateCoursForm = (formValues: {
    sports: { value: number; label: string }[];
    participants: string;
    dateDebut: string;
    dateFin: string;
    lieu: string;
    prix: string;
    niveau: { value: Level; label: string } | null;
}): FormCoursErrors => {
    const errors: FormCoursErrors = {};

    // Validation des sports
    if (formValues.sports.length === 0) {
        errors.sports = "Vous devez sélectionner au moins un sport.";
    }

    // Validation du nombre de participants
    if (!isNotEmpty(formValues.participants)) {
        errors.participants =
            "Le nombre de participants ne peut pas être vide.";
    } else if (
        isNaN(Number(formValues.participants)) ||
        Number(formValues.participants) <= 0
    ) {
        errors.participants =
            "Le nombre de participants doit être un nombre positif.";
    }

    // Validation de la date de début
    if (!isNotEmpty(formValues.dateDebut)) {
        errors.dateDebut = "La date de début ne peut pas être vide.";
    }

    // Validation de la date de fin
    if (!isNotEmpty(formValues.dateFin)) {
        errors.dateFin = "La date de fin ne peut pas être vide.";
    } else if (new Date(formValues.dateDebut) > new Date(formValues.dateFin)) {
        errors.dateFin = "La date de fin doit être après la date de début.";
    }

    // Validation du lieu
    if (!isNotEmpty(formValues.lieu)) {
        errors.lieu = "Le lieu ne peut pas être vide.";
    }

    // Validation du prix
    if (!isNotEmpty(formValues.prix)) {
        errors.prix = "Le prix ne peut pas être vide.";
    } else if (isNaN(Number(formValues.prix)) || Number(formValues.prix) < 0) {
        errors.prix = "Le prix doit être un nombre positif.";
    }

    // Validation du niveau
    if (!formValues.niveau) {
        errors.niveau = "Vous devez sélectionner un niveau.";
    }

    // Vérification anti-injection SQL
    const sqlCheckFields = [
        formValues.participants,
        formValues.lieu,
        formValues.prix,
    ];
    if (sqlCheckFields.some((field) => !validateSQLInjection(field))) {
        errors.sqlInjection = "Caractères non autorisés détectés.";
    }

    return errors;
};

export const validateUpdateCoursForm = (formValues: {
    sports: { value: number; label: string }[];
    participants: string;
    dateDebut: string;
    dateFin: string;
    lieu: string;
    prix: string;
    niveau: { value: Level; label: string } | null;
}): FormCoursErrors => {
    const errors: FormCoursErrors = {};

    // Validation des sports
    if (formValues.sports.length === 0) {
        errors.sports = "Vous devez sélectionner au moins un sport.";
    }

    // Validation du nombre de participants
    if (!isNotEmpty(formValues.participants)) {
        errors.participants =
            "Le nombre de participants ne peut pas être vide.";
    } else if (
        isNaN(Number(formValues.participants)) ||
        Number(formValues.participants) <= 0
    ) {
        errors.participants =
            "Le nombre de participants doit être un nombre positif.";
    }

    // Validation de la date de début
    if (!isNotEmpty(formValues.dateDebut)) {
        errors.dateDebut = "La date de début ne peut pas être vide.";
    }

    // Validation de la date de fin
    if (!isNotEmpty(formValues.dateFin)) {
        errors.dateFin = "La date de fin ne peut pas être vide.";
    } else if (new Date(formValues.dateDebut) > new Date(formValues.dateFin)) {
        errors.dateFin = "La date de fin doit être après la date de début.";
    }

    // Validation du lieu
    if (!isNotEmpty(formValues.lieu)) {
        errors.lieu = "Le lieu ne peut pas être vide.";
    }

    // Validation du prix
    if (!isNotEmpty(formValues.prix)) {
        errors.prix = "Le prix ne peut pas être vide.";
    } else if (isNaN(Number(formValues.prix)) || Number(formValues.prix) < 0) {
        errors.prix = "Le prix doit être un nombre positif.";
    }

    // Validation du niveau
    if (!formValues.niveau) {
        errors.niveau = "Vous devez sélectionner un niveau.";
    }

    // Vérification anti-injection SQL
    const sqlCheckFields = [
        formValues.participants,
        formValues.lieu,
        formValues.prix,
    ];
    if (sqlCheckFields.some((field) => !validateSQLInjection(field))) {
        errors.sqlInjection = "Caractères non autorisés détectés.";
    }

    return errors;
};

// Autres validations générales ou pour d'autres formulaires
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
};

export const validateSQLInjection = (input: string): boolean => {
    const sqlRegex =
        /(\b(SELECT|UPDATE|DELETE|INSERT|WHERE|DROP|TRUNCATE|EXEC|UNION|ORDER|GROUP)\b|--|;|\/\*)/i;
    return !sqlRegex.test(input); // Retourne true si pas d'injection SQL détectée
};

export const isNotEmpty = (input: string): boolean => {
    return input.trim().length > 0;
};
