import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    localStorage.setItem('prijava', 'da');
    localStorage.setItem('registracija', 'ne');
    localStorage.setItem('azuriranje', 'ne');
    localStorage.setItem('inbox', 'ne');
    localStorage.setItem('konverzacija', 'ne');
    localStorage.setItem('arhiva', 'ne');
    this.kor_ime="";
    this.lozinka="";
    this.tip="";
    
  }

  ulogovani: Korisnik;
  kor_ime: string;
  lozinka: string;
  tip: string;
  greske: string[];
  


  prijava(){
    //obrada gresaka
    this.greske=[];

    if (this.kor_ime == "") 
      alertify.warning("Morate uneti korisnicko ime");
    if (this.lozinka == "") 
      alertify.warning("Morate uneti lozinku");
    if (this.kor_ime == "" || this.lozinka == "") return;

    this.korisnikServis.prijava(this.kor_ime).subscribe((korisnik: Korisnik)=>{
      if(korisnik){
        if(korisnik.lozinka == this.lozinka && korisnik.tip == this.tip){

          localStorage.setItem('ulogovani', korisnik.kor_ime);
          this.ulogovani = korisnik;

          if(korisnik.tip=='Admin'){
            localStorage.setItem("ulogovan", "da");
            localStorage.setItem("tip", "Admin");
            localStorage.setItem("admin", JSON.stringify(korisnik));
            this.ruter.navigate(['admin']);
          }

          else if(korisnik.tip=='Registrovani'){
            localStorage.setItem("ulogovan", "da");
            localStorage.setItem("tip", "Registrovani");
            this.ruter.navigate(['registrovani']);
          }

          else if(korisnik.tip=='Radnik'){
            localStorage.setItem("ulogovan", "da");
            localStorage.setItem("tip", "Radnik");
            this.ruter.navigate(['radnik']);
          }

        }
        else if(korisnik.lozinka == this.lozinka){
          alertify.error("Pogresan tip");
          
        }
        else{
          alertify.error("Pogresno uneta lozinka");
        }
      }
      else{
        alertify.error("Ne postoji korisnik sa unetim korisnickim imenom");
        
      }      
        
    });

  }

  

}
