import { Component, OnInit } from '@angular/core';
import { Livre } from '../../models/livre.model';
import { LivresService } from '../../services/livres.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-livres',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.scss'
})
export class LivresComponent implements OnInit {

  livres: Livre[] = [];
  livre!: Livre;

  constructor(private livresService: LivresService, 
    private dialog: MatDialog, 
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