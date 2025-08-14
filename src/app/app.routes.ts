import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact/contact.component';
import { HomeComponent } from './home/home/home.component';
import { BibliothequeComponent } from './bibliotheque/bibliotheque/bibliotheque.component';

export const routes: Routes = [
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: 'contact', title: 'Contact', component: ContactComponent },
    { path: 'bibliotheque', title: 'Bibliotheque', component: BibliothequeComponent },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];




/*
    ajouter la route dans app.routes.ts 
    importer RouterOutlet, dans app.component.ts
    importer RouterLink, dans le composant où la route doit etre faite
    Dans le header le lien doit etre : <a routerLink="/Contact">Contact</a>
    Dans app.config.ts : 
    export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)]
*/