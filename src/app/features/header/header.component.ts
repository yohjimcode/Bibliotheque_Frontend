import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Toolbar } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { Livre } from '../../models/livre.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LivresService } from '../../services/livres.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    Toolbar,
    IconField,
    InputIcon,
    ButtonModule,
    InputTextModule,
    IconField,
    InputIcon,
    AvatarModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  zoneRecherche = new FormControl('');

  livres: Livre[] = [];

   private destroy = new Subject<void>();

  constructor(private livresService: LivresService
  ) { }

  ngOnInit(): void {
    this.livresService.getAllLivres()
    .pipe(takeUntil(this.destroy))
    .subscribe(data => {
      this.livres = data;
    });
  }

  get livresFiltres(): Livre[] {
    const search = this.zoneRecherche.value || '';
    return this.livres.filter(livre =>
      livre.titre.toLowerCase().includes(search.toLowerCase()) ||
      livre.auteurs?.some(auteur =>
        auteur.nomAuteur.toLowerCase().includes(search.toLowerCase())
      ));
  }

    ngOnDestroy() {
      this.destroy.next();
      this.destroy.complete();
    }
}
