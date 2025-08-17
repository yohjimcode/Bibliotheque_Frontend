import { Routes } from '@angular/router';
import { BibliothequeComponent } from './pages/bibliotheque/bibliotheque.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { LivresComponent } from './pages/livres/livres.component';



export const routes: Routes = [
    { path: 'home', title: 'Home', component: HomeComponent },
    { path: 'livres', title: 'Livres', component: LivresComponent },
    { path: 'bibliotheque', title: 'Bibliotheque', component: BibliothequeComponent },
    { path: 'contact', title: 'Contact', component: ContactComponent },
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