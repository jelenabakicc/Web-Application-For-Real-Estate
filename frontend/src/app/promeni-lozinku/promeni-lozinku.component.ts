import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-promeni-lozinku',
  templateUrl: './promeni-lozinku.component.html',
  styleUrls: ['./promeni-lozinku.component.css']
})
export class PromeniLozinkuComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    this.staraLozinka = "";
    this.novaLozinka1 = "";
    this.novaLozinka2 = "";
    this.tip = localStorage.getItem('tip');
    this.korIme = localStorage.getItem('ulogovani');
    this.korisnikServis.dohvKorisnika(this.korIme).subscribe((k: Korisnik)=>{
      this.ulogovani = k;
    })
    localStorage.setItem("azuriranje", "da");
    localStorage.setItem("ulogovan", "da");
    localStorage.setItem('registracija', 'ne');
    localStorage.setItem('prijava', 'ne');
    //this.staraLozinka = this.ulogovani.lozinka;
  }

  korIme: string;
  ulogovani: Korisnik;
  staraLozinka: string;
  novaLozinka1: string;
  novaLozinka2: string;
  tip: string;
  //validna: number;

  greska: string;

  promeniLozinku(){
    if(this.staraLozinka=='' || this.novaLozinka1=='' || this.novaLozinka2==''){
      alertify.warning("Niste popunili sva polja");
    }
    else{
      if (this.staraLozinka!=this.ulogovani.lozinka){
        alertify.error("Niste ispravno uneli staru lozinku!");
      }
      else if (this.novaLozinka1 != this.novaLozinka2){
        alertify.error("Nova lozinka i potvrdjena lozinka se ne poklapaju!");
        
      }
      else if (this.staraLozinka ==this.novaLozinka1){
        alertify.error("Nova lozinka je ista kao stara, pokusajte ponovo!");
      }
      else {
        this.korisnikServis.novaLozinka(this.korIme, this.novaLozinka1).subscribe((poruka: any)=>{
          //vracanje na stranu za prijavu
          localStorage.removeItem('ulogovani');
          localStorage.removeItem('tip');
          localStorage.setItem('registracija', 'ne');
          localStorage.setItem('ulogovan', 'ne');
          localStorage.setItem('prijava', 'da');
          this.ruter.navigate(['prijava']);
        })
      }
    }
  }

  povratak(){
    if (this.tip == "Admin"){
      this.ruter.navigate(['admin']);
    }
    else if (this.tip == "Registrovani"){
      this.ruter.navigate(['registrovani']);
    }
    else {
      this.ruter.navigate(['radnik']);
    }
  }

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
  }


}
