import { atom } from "recoil";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
}

export const userAtom = atom<User | null>({
    key: "userAtom", // Un identifiant unique pour cet atom
    default: null, // Valeur par défaut (aucun utilisateur connecté)
});

export const isConnectedAtom = atom<boolean>({
    key: "isConnectedAtom",
    default: false,
});
