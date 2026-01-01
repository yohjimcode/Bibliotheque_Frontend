import { Component, Input, OnInit } from '@angular/core';
import { Livre } from '../../models/livre.model';
import { LivresService } from '../../services/livres.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';


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
  //livre!: Livre;
  zoneRecherche = new FormControl('');
  private destroy = new Subject<void>();

  constructor(private livresService: LivresService, 
  ) { }

  ngOnInit(): void {
    this.chargerLivres();    
  }

  //Faire la recherche coté back !  
  chargerLivres(): void {
    this.livresService.getAllLivres()
    .pipe(takeUntil(this.destroy))
    .subscribe(data => {
      this.livres = data;
    });
  }

get livresFiltres(): Livre[] { // ← getter, pas méthode
  // Filtrer this.livres (déjà chargés)
  const searchTerm = this.zoneRecherche.value || '';
  return this.livres.filter(livre => 
    livre.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

  getNomsAuteurs(livre: Livre): string {
    return livre.auteurs?.map(a => a.nomAuteur).join(', ') || 'Aucun auteur';
  }

    ngOnDestroy() {
    this.destroy.next();     // Émet un signal
    this.destroy.complete(); // Complète l'observable
    }
}