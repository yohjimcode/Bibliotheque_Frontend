export interface Livre {
    id: number;
    titre: string;
    auteurs: Auteur[];
    prix: number;
    dateCreation: Date;
    isbn: string;
}

export interface Auteur {
    id: number;
    nomAuteur: string;
}

export interface LivresTendances {
    key: string,
    titre: string,
    auteurs : Auteur[],
    anneePublication: number,
    urlDeCouverture: string,
    sujets : string[]
}
