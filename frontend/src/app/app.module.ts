import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistrovaniComponent } from './registrovani/registrovani.component';
import { AdminComponent } from './admin/admin.component';
import { RadnikComponent } from './radnik/radnik.component';
import { GostComponent } from './gost/gost.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AzurirajComponent } from './azuriraj/azuriraj.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PromeniLozinkuComponent } from './promeni-lozinku/promeni-lozinku.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { ZahteviComponent } from './zahtevi/zahtevi.component';
import { NekretnineComponent } from './nekretnine/nekretnine.component';
import { IzmeniNekretninuComponent } from './izmeni-nekretninu/izmeni-nekretninu.component';
import { IzabranaNekretninaComponent } from './izabrana-nekretnina/izabrana-nekretnina.component';
import { ChartsModule } from 'ng2-charts';
import { NekretnineService } from './nekretnine.service';
import { InboxComponent } from './inbox/inbox.component';
import { KonverzacijaComponent } from './konverzacija/konverzacija.component';
import { ArhiviraneComponent } from './arhivirane/arhivirane.component';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    RegistrovaniComponent,
    AdminComponent,
    RadnikComponent,
    GostComponent,
    RegistracijaComponent,
    AzurirajComponent,
    HeaderComponent,
    FooterComponent,
    PromeniLozinkuComponent,
    KorisniciComponent,
    ZahteviComponent,
    NekretnineComponent,
    IzmeniNekretninuComponent,
    IzabranaNekretninaComponent,
    InboxComponent,
    KonverzacijaComponent,
    ArhiviraneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
