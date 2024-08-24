import { atom } from "recoil";
import { User } from "../types/types";

export const userAtom = atom<User | null>({
    key: "userAtom", // Un identifiant unique pour cet atom
    default: null, // Valeur par défaut (aucun utilisateur connecté)
});

export const isLoadingUserAtom = atom<boolean>({
    key: "isLoadingUserAtom",
    default: true, // Début avec un état de chargement activé
});
