import { Component, OnInit } from '@angular/core';
import { Livre } from '../../models/livre.model';
import { LivresService } from '../../services/livres.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livres',
  imports: [
    CommonModule,     
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.scss'
})
export class LivresComponent implements OnInit {

  livres: Livre[] = [];

  constructor(private livresService: LivresService) { }

  ngOnInit(): void {
    this.livresService.getAllLivres().subscribe(data => {
      this.livres = data;
    });
  }

  zoneRecherche: string = '';

  get livresFiltres(): Livre[] {
    return this.livres.filter(livre =>
      livre.titre.toLowerCase().includes(this.zoneRecherche.toLowerCase()) ||
      livre.auteur.nom.toLowerCase().includes(this.zoneRecherche.toLowerCase()) ||
      livre.auteur.prenom.toLowerCase().includes(this.zoneRecherche.toLowerCase())
    );
  }
}