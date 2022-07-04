import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { KorisnikService } from '../korisnik.service';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit {
  
  constructor(private ruter: Router, private nekretnineServis: NekretnineService, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    localStorage.setItem("ulogovan", "ne");
    localStorage.setItem("prijava", 'ne');
    localStorage.setItem("registracija", "ne");
    localStorage.setItem('azuriranje', 'ne');
    localStorage.removeItem("tip");
    this.promovisaneNekretnine = [];
    this.pretrazeneNekretnine = [];
    this.nekretnineServis.dohvPromovisane().subscribe((n: Nekretnina[])=>{
      this.promovisaneNekretnine = n;   
      this.trenutnaIndeks = 0;
      this.trenutnaPromovisana = this.promovisaneNekretnine[this.trenutnaIndeks];  
    });

    this.grad = '';
    this.cenaOd = null;
    this.cenaDo = null;
    this.pretrazi = false;

    
  }

  promovisaneNekretnine: Nekretnina[];
  pretrazeneNekretnine: Nekretnina[];
  slike: any[];
  grad: string;
  cenaOd: number;
  cenaDo: number;
  pretrazi: boolean;
  trenutnaPromovisana: Nekretnina;
  trenutnaIndeks: number;

  slikaLevo(){
    if (this.trenutnaIndeks == 0){
      this.trenutnaIndeks = this.promovisaneNekretnine.length - 1;
    }
    else{
      this.trenutnaIndeks = this.trenutnaIndeks - 1;
    }
    this.trenutnaPromovisana = this.promovisaneNekretnine[this.trenutnaIndeks];
  }

  slikaDesno(){
    if (this.trenutnaIndeks == (this.promovisaneNekretnine.length - 1)){
      this.trenutnaIndeks = 0;
    }
    else{
      this.trenutnaIndeks = this.trenutnaIndeks + 1;
    }
    this.trenutnaPromovisana = this.promovisaneNekretnine[this.trenutnaIndeks];
  }

  registracija(){
    this.ruter.navigate(['registracija']);
  }

  prijava(){
    this.ruter.navigate(['prijava']);
  }

  detaljnije(n: Nekretnina){
    localStorage.setItem("izabranaNekretnina", JSON.stringify(n.id));
    this.ruter.navigate(['/izabrana-nekretnina']);
  }

  pretragaNekretnina(){
    if (this.grad == '' && this.cenaOd == null && this.cenaDo == null) {
      alertify.warning("Morate uneti bar jedan kriterijum za  pretragu!");
      this.pretrazi = false;
      this.pretrazeneNekretnine = [];
    }
    else {
      if(this.grad != '' && this.cenaOd != null && this.cenaDo != null){
        if(this.cenaOd > this.cenaDo){  //OVO NE RADIIII => CITA IH KAO STRING IZGLEDA
          alertify.warning("Niste ispravno uneli raspon cena!");
        }
        else{
          this.nekretnineServis.pretraziGradCena(this.grad, this.cenaOd, this.cenaDo).subscribe((n: Nekretnina[])=>{
            this.pretrazeneNekretnine = n;
            if (this.pretrazeneNekretnine.length == 0){
              alertify.warning("Ne postoji nekretnina koja ispunjava zadate kriterijume!")
            }
          })
        }
      }
      else if(this.grad != '' && this.cenaOd != null && this.cenaDo == null){
        this.nekretnineServis.pretraziGradCenaOd(this.grad, this.cenaOd).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          if (this.pretrazeneNekretnine.length == 0){
            alertify.warning("Ne postoji nekretnina koja ispunjava zadate kriterijume!")
          }
        })
      }
      else if(this.grad != '' && this.cenaOd == null && this.cenaDo != null){
        this.nekretnineServis.pretraziGradCenaDo(this.grad, this.cenaDo).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          if (this.pretrazeneNekretnine.length == 0){
            alertify.warning("Ne postoji nekretnina koja ispunjava zadate kriterijume!")
          }
        })
      }
      else if(this.grad == '' && this.cenaOd != null && this.cenaDo != null){
        if(this.cenaOd > this.cenaDo){
          alertify.warning("Niste ispravno uneli raspon cena!");
        }
        else{
          this.nekretnineServis.pretraziCenaOdDo(this.cenaOd, this.cenaDo).subscribe((n: Nekretnina[])=>{
            this.pretrazeneNekretnine = n;
            if (this.pretrazeneNekretnine.length == 0){
              alertify.warning("Ne postoji nekretnina koja ispunjava zadate kriterijume!")
            }
          })
        }
      }
      else if(this.grad != '' && this.cenaOd == null && this.cenaDo == null){
        this.nekretnineServis.pretraziNekretnineZaGrad(this.grad).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          if (this.pretrazeneNekretnine.length == 0){
            alertify.warning("Ne postoji nekretnina koja ispunjava zadate kriterijume!")
          }
        })
      }
      else if(this.grad == '' && this.cenaOd != null && this.cenaDo == null){
        this.nekretnineServis.pretraziCenaOd(this.cenaOd).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          if (this.pretrazeneNekretnine.length == 0){
            alertify.warning("Ne postoji nekretnina koja ispunjava zadate kriterijume!")
          }
        })
      }
      else if(this.grad == '' && this.cenaOd == null && this.cenaDo != null){
        this.nekretnineServis.pretraziCenaDo(this.cenaDo).subscribe((n: Nekretnina[])=>{
          this.pretrazeneNekretnine = n;
          if (this.pretrazeneNekretnine.length == 0){
            alertify.warning("Ne postoji nekretnina koja ispunjava zadate kriterijume!")
          }
        })
      }
      
      this.pretrazi = true;
      
    }

  }


}
