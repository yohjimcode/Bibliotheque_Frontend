import { Component } from '@angular/core';
import { LivresService } from '../../../services/livres.service';
import { Livre } from '../../../models/livre.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-modale',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    ButtonModule
  ],
  templateUrl: './modale.component.html',
  styleUrl: './modale.component.scss'
})
export class ModaleComponent {

  livre!: Livre;
  loading: boolean = false;
  error: string = '';
  private destroy = new Subject<void>();

  constructor(
    private livresService: LivresService,
    public ref: DynamicDialogRef
  ) { }

  protected readonly form = new FormGroup({
    titre: new FormControl({ value: '', disabled: true }),
    auteur: new FormControl({ value: '', disabled: true }),
    isbn: new FormControl('', Validators.required),
  });

  /**
    * Récupère les infos du livre via l'ISBN
    */
  getinfosLivre() {
    const isbnControl = this.form.get('isbn');

    if (!isbnControl?.valid) {
      this.error = 'Veuillez entrer un ISBN';
      return;
    }

    const isbn = isbnControl.value;

    if (!isbn) {
      this.error = 'ISBN vide';
      return;
    }

    this.loading = true;
    this.error = '';

    this.livresService.rechercheLivreParIsbn(isbn)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (livre) => {
          this.livre = livre;
          this.form.patchValue({
            titre: livre.titre,
            auteur: livre.auteurs?.map(a => a.nomAuteur).join(', ') || ''
          });
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Livre non trouvé avec cet ISBN';
          this.loading = false;
          console.error('Erreur:', err);
        }
      });
  }

  // Pour afficher dans le template
  getNomsAuteurs(livre: Livre): string {
    return livre.auteurs?.map(a => a.nomAuteur).join(', ') || '';
  }

  addLivre() {
    if (!this.livre) {
      this.error = 'Aucun livre à ajouter';
      return;
    }

    this.loading = true;

    this.livresService.ajouterLivreDepuisIsbn(this.livre.isbn).subscribe({
      next: (livreAjoute) => {
        console.log('Livre ajouté avec succès:', livreAjoute);
        // Fermer la modale en retournant le livre ajouté
        // this.dialogRef.close(livreAjoute);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du livre:', err);
        this.error = 'Erreur lors de l\'ajout du livre';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    this.form.valid;
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
