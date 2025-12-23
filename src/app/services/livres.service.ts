import { Injectable } from '@angular/core';
import { Livre } from '../models/livre.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivresService {

  constructor(private http: HttpClient) { }

  getAllLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${environment.apiUrl}/livres/all`);
  }

  createLivre(livre:Livre): Observable<Livre>{
    return this.http.post<Livre>(`${environment.apiUrl}/livres`, livre);
  }

  rechercheLivreParIsbn(isbn: string): Observable<Livre> {
    return this.http.get<Livre>(`${environment.apiUrl}/livres/info/${isbn}`);
  }


  createLivreParIsbn(livre:Livre): Observable<Livre>{
    return this.http.post<Livre>(`${environment.apiUrl}/livres`, livre);
  }

  ajouterLivreDepuisIsbn(isbn: string): Observable<Livre> {
    return this.http.post<Livre>(`${environment.apiUrl}/livres/depuis-isbn?isbn=${isbn}`, {});
  }
}