import { Component, Input, OnInit } from '@angular/core';
import { Livre } from '../../models/livre.model';
import { LivresService } from '../../services/livres.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ModaleComponent } from '../commun/ajouter-livre/modale.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-livres',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    RatingModule,
    TagModule,
    ButtonModule
  ],
  providers: [DialogService],
  templateUrl: './livres.component.html',
  styleUrl: './livres.component.scss'
})
export class LivresComponent implements OnInit {

  livres: Livre[] = [];
  //livre!: Livre;
  zoneRecherche = new FormControl('');
  private destroy = new Subject<void>();

  status!: 'Lu' | 'En cours' | 'À lire';
  dialog: any;

  constructor(private livresService: LivresService, private dialogService: DialogService
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

  getStatus(status: string) {
    switch (status) {
      case 'Lu':
        return 'success';
      case 'En cours':
        return 'warn';
      case 'À lire':
        return 'danger';
      default:
        return 'À venir';
    }
  }

  getNomsAuteurs(livre: Livre): string {
    return livre.auteurs?.map(a => a.nomAuteur).join(', ') || 'Aucun auteur';
  }

  ajouterLivre() {
    this.dialogService.open(ModaleComponent, {
      header: 'Ajouter un livre',
      width: '500px',
      modal: true
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}