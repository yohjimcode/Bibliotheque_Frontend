import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModaleComponent } from '../commun/ajouter-livre/modale.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor() { }


  ajouterLivre() {
    // this.dialog.open(ModaleComponent);
  }

}
