import { Auteur } from "./auteur.model";

export interface Livre {
    id: number;
    titre: string;
    auteur: Auteur;
    prix: number;
    dateCreation: Date;
    isbn : string;
}
