import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-registrovani',
  templateUrl: './registrovani.component.html',
  styleUrls: ['./registrovani.component.css']
})
export class RegistrovaniComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router, private nekretnineServis: NekretnineService) { }

  ngOnInit(): void {
    localStorage.setItem('azuriranje', 'ne');
    localStorage.setItem('tip', 'Registrovani');
    localStorage.setItem('ulogovan', 'da');
    localStorage.setItem("inbox", "ne");
    this.ulogovaniKorIme = localStorage.getItem('ulogovani');

    this.nekretnineServis.dohvNekretnineZaKorisnika(this.ulogovaniKorIme).subscribe((n: Nekretnina[])=>{
      this.mojeNekretnine = n;
      //this.createImageFromBlobNekretnina(this.mojeNekretnine);
    })
    this.promovisaneNekretnine = [];
    this.pretrazeneNekretnine = [];
    this.prikaziNekretnine = [];
    this.nekretnineServis.dohvPromovisane().subscribe((n: Nekretnina[])=>{
      this.promovisaneNekretnine = n;
      for (let i=0; i<this.promovisaneNekretnine.length; i++){
        if(this.promovisaneNekretnine[i].vlasnik != this.ulogovaniKorIme) 
        this.prikaziNekretnine.push(this.promovisaneNekretnine[i]);
      }   
      this.trenutnaIndeks = 0;
      this.trenutnaPromovisana = this.prikaziNekretnine[this.trenutnaIndeks];  
    });
    
    this.grad = '';
    this.cenaOd = null;
    this.cenaDo = null;
    this.pretrazi = false;
    this.blokirani = [];
     this.meneBlokirali = [];

     this.korisnikServis.dohvMojeBlokirane(this.ulogovaniKorIme).subscribe((k:Korisnik[])=>{
       this.blokirani = k;
     })

     this.korisnikServis.dohvMojeZabranjene(this.ulogovaniKorIme).subscribe((k:Korisnik[])=>{
       this.meneBlokirali = [];
     })

  }

  ulogovaniKorIme: string;
  ime: string;
  prezime: string;
  mojeNekretnine: Nekretnina[];
  promovisaneNekretnine: Nekretnina[];
  prikaziNekretnine: Nekretnina[];
  pretrazeneNekretnine: Nekretnina[];
  grad: string;
  cenaOd: number;
  cenaDo: number;
  pretrazi: boolean;

  trenutnaPromovisana: Nekretnina;
  trenutnaIndeks: number;

  blokirani: Korisnik[];
  meneBlokirali: Korisnik[];

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }

  azurirajPodatke(){
    this.ruter.navigate(['azuriraj']);
  }

  slikaLevo(){
    if (this.trenutnaIndeks == 0){
      this.trenutnaIndeks = this. prikaziNekretnine.length - 1;
    }
    else{
      this.trenutnaIndeks = this.trenutnaIndeks - 1;
    }
    this.trenutnaPromovisana = this. prikaziNekretnine[this.trenutnaIndeks];
  }

  slikaDesno(){
    if (this.trenutnaIndeks == (this. prikaziNekretnine.length - 1)){
      this.trenutnaIndeks = 0;
    }
    else{
      this.trenutnaIndeks = this.trenutnaIndeks + 1;
    }
    this.trenutnaPromovisana = this. prikaziNekretnine[this.trenutnaIndeks];
  }

  pretragaNekretnina(){
    if (this.grad == '' && this.cenaOd == null && this.cenaDo == null) {
      alertify.warning("Morate uneti bar jedan kriterijum za  pretragu!");
      this.pretrazi = false;
    }
    else {
      if(this.grad != '' && this.cenaOd != null && this.cenaDo != null){
        this.nekretnineServis.pretraziGradCena(this.grad, this.cenaOd, this.cenaDo).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          //this.createImageFromBlobNekretnina(this.pretrazeneNekretnine);
        })
      }
      else if(this.grad != '' && this.cenaOd != null && this.cenaDo == null){
        this.nekretnineServis.pretraziGradCenaOd(this.grad, this.cenaOd).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
         // this.createImageFromBlobNekretnina(this.pretrazeneNekretnine);
        })
      }
      else if(this.grad != '' && this.cenaOd == null && this.cenaDo != null){
        this.nekretnineServis.pretraziGradCenaDo(this.grad, this.cenaDo).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          //this.createImageFromBlobNekretnina(this.pretrazeneNekretnine);
        })
      }
      else if(this.grad == '' && this.cenaOd != null && this.cenaDo != null){
        this.nekretnineServis.pretraziCenaOdDo(this.cenaOd, this.cenaDo).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          //this.createImageFromBlobNekretnina(this.pretrazeneNekretnine);
        })
      }
      else if(this.grad != '' && this.cenaOd == null && this.cenaDo == null){
        this.nekretnineServis.pretraziNekretnineZaGrad(this.grad).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
         // this.createImageFromBlobNekretnina(this.pretrazeneNekretnine);
        })
      }
      else if(this.grad == '' && this.cenaOd != null && this.cenaDo == null){
        this.nekretnineServis.pretraziCenaOd(this.cenaOd).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          //this.createImageFromBlobNekretnina(this.pretrazeneNekretnine);
        })
      }
      else if(this.grad == '' && this.cenaOd == null && this.cenaDo != null){
        this.nekretnineServis.pretraziCenaDo(this.cenaDo).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
         // this.createImageFromBlobNekretnina(this.pretrazeneNekretnine);
        })
      }
      this.pretrazi = true;
      //this.createImageFromBlobNekretnina(this.pretrazeneNekretnine);
      
    }

  }

  detaljnije(n: Nekretnina){
    localStorage.setItem("izabranaNekretnina", JSON.stringify(n.id));
    localStorage.setItem('ulogovani', this.ulogovaniKorIme);
    this.ruter.navigate(['/izabrana-nekretnina']);
  }

  izmeniNekretninu(n: Nekretnina){
    localStorage.setItem("nekretninaIzmena", JSON.stringify(n.id));
    this.ruter.navigate(['izmeni-nekretninu']);
  }
}
