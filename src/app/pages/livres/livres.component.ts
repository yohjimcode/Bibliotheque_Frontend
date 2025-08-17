import { Component, OnInit } from '@angular/core';
import { Livre } from '../../models/livre.model';
import { LivresService } from '../../services/livres.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livres',
  imports: [CommonModule],
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
}
