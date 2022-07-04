import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ArhiviraneComponent } from './arhivirane/arhivirane.component';
import { AzurirajComponent } from './azuriraj/azuriraj.component';
import { GostComponent } from './gost/gost.component';
import { InboxComponent } from './inbox/inbox.component';
import { IzabranaNekretninaComponent } from './izabrana-nekretnina/izabrana-nekretnina.component';
import { IzmeniNekretninuComponent } from './izmeni-nekretninu/izmeni-nekretninu.component';
import { KonverzacijaComponent } from './konverzacija/konverzacija.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { NekretnineComponent } from './nekretnine/nekretnine.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromeniLozinkuComponent } from './promeni-lozinku/promeni-lozinku.component';
import { RadnikComponent } from './radnik/radnik.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { RegistrovaniComponent } from './registrovani/registrovani.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';

const routes: Routes = [
  {path: '', component: GostComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: 'registrovani', component: RegistrovaniComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'radnik', component: RadnikComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'azuriraj', component: AzurirajComponent},
  {path: 'promeniL', component: PromeniLozinkuComponent},
  {path: 'korisnici', component: KorisniciComponent},
  {path: 'zahtevi', component: ZahteviComponent},
  {path: 'nekretnine', component: NekretnineComponent},
  {path: 'izmeni-nekretninu', component: IzmeniNekretninuComponent},
  {path: 'izabrana-nekretnina', component: IzabranaNekretninaComponent},
  {path: 'inbox', component: InboxComponent},
  {path: 'konverzacija', component: KonverzacijaComponent},
  {path: 'arhivirane', component: ArhiviraneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
