import { Component } from '@angular/core';
import { LivresService } from '../../../services/livres.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Livre } from '../../../models/livre.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-modale',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
  MatButtonModule, MatDialogModule],
  templateUrl: './modale.component.html',
  styleUrl: './modale.component.scss'
})
export class ModaleComponent {

  livre!: Livre;

  constructor(
    private livresService: LivresService,
    private dialogRef: MatDialogRef<ModaleComponent>
  ) { }

  onSave() {
    this.livresService.createLivre(this.livre).subscribe(this.dialogRef.close);
  }
}
