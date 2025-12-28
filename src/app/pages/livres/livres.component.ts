import { Component, OnInit } from '@angular/core';
import { Livre } from '../../models/livre.model';
import { LivresService } from '../../services/livres.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-livres',
  imports: [
    CommonModule,
    FormsModule,

  ],
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.scss'
})
export class LivresComponent implements OnInit {

  livres: Livre[] = [];
  livre!: Livre;

  constructor(private livresService: LivresService, 
  ) { }

  ngOnInit(): void {
    this.livresService.getAllLivres().subscribe(data => {
      this.livres = data;
    });
  }

  zoneRecherche: string = '';

  //Faire la recherche coté back !  
  get livresFiltres(): Livre[] {
    return this.livres.filter(livre =>
      livre.titre.toLowerCase().includes(this.zoneRecherche.toLowerCase()) ||
      livre.auteurs?.some(auteur => 
      auteur.nomAuteur.toLowerCase().includes(this.zoneRecherche.toLowerCase())
      )
    );
  }

  getNomsAuteurs(livre: Livre): string {
  return livre.auteurs?.map(a => a.nomAuteur).join(', ') || 'Aucun auteur';
}

}