export interface Livre {
    id: number;
    titre: string;
    auteurs: Auteur[];
    prix: number;
    dateCreation: Date;
    isbn : string;
}

export interface Auteur {
    id?: number;
    nomAuteur: string;
}
