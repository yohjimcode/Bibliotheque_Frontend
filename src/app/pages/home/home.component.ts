import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivresService } from '../../services/livres.service';
import { Subject, takeUntil } from 'rxjs';
import { LivresTendances } from '../../models/livre.model';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule,CardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  private destroy = new Subject<void>();
  livresTendances : LivresTendances[] =  []; 

  constructor(private livreService:LivresService) { }

  ngOnInit(): void {
    this.afficherTendances();
  }

  afficherTendances(){
    this.livreService.getLivresTendancesParSemaine()
    .pipe(takeUntil(this.destroy))
    .subscribe(data => {
      this.livresTendances = data;
    })
  } 

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
