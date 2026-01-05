import { NgModule } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  exports: [
    CardModule,
    ButtonModule,
    CarouselModule,
    ToggleButtonModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    ProgressSpinnerModule,
    RatingModule,
    TagModule,
    MessageModule
  ],
   providers: [DialogService] 
})
export class PrimeNgModule { }
