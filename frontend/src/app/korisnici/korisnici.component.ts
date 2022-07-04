import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.css']
})
export class KorisniciComponent implements OnInit {

  constructor( private ruter: Router, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    localStorage.setItem('prijava', 'ne');
    localStorage.setItem('registracija', 'da');
    localStorage.setItem('azuriranje', 'da');
    this.ime = "";
    this.prezime = "";
    this.kor_ime = "";
    this.lozinka = "";
    this.lozinka2 = "";
    this.email = "";
    this.grad = "";
    this.drzava = "";
    this.tip = "";
    this.nazivSlike = "";
    
  }

  ime: string;
  prezime: string;
  kor_ime: string;
  lozinka: string;
  lozinka2: string;
  email: string;
  grad: string;
  drzava: string;
  slika: File;
  nazivSlike: string;

  tip: string;

  greska: string;

  


  onFileSelect(event) {    
    this.slika = event.target.files[0];
    this.nazivSlike = this.slika.name;
  }

  uploadPhoto(){
    this.korisnikServis.uploadPhoto(this.slika).subscribe(res=>{
      if(res["ret"]=="ok"){

      }
    });
  }


  potvrdi(){
    if(this.ime == "" || this.prezime == "" || this.kor_ime == "" || this.lozinka == "" || this.lozinka2 == ""
    || this.email == "" || this.grad == "" || this.drzava == "" ||  this.tip == "" ) {
      this.greska = "Morate popuniti sva polja!"
      alertify.warning(this.greska);
    } 
    else {
      this.korisnikServis.dohvKorisnika(this.kor_ime).subscribe((k: Korisnik)=>{
        if (k) {
        this.greska = "Korisnicko ime je zauzeto!";
        alertify.warning(this.greska);
        }
        else{
          this.korisnikServis.proveriMail(this.email).subscribe((resp)=>{
            if(resp['poruka']=='nije ok'){
              this.greska = "E-mail adresa se vec koristi!";
              alertify.warning(this.greska);
            }
            else if(this.lozinka2 != this.lozinka){
              this.greska = "Lozinke se ne poklapaju, pokusajte ponovo!"
              alertify.warning(this.greska);
            }
            else if(this.tip == 'Admin') { 
              this.korisnikServis.dohvAdmina().subscribe((resp)=>{
                if (resp['poruka']=='vec postoji admin'){
                  this.greska = 'Admin vec postoji!';
                  alertify.warning(this.greska);
                }
                else{            
                  if (this.slika!=undefined){
                    this.uploadPhoto()
                  }
                  else{
                    this.nazivSlike = 'genericka.jpg';
                  }
                    
                  this.korisnikServis.registracija(this.ime,this.prezime,this.kor_ime,this.lozinka,this.email,this.grad,
                    this.drzava,this.nazivSlike,this.tip).subscribe(res=>{
                      if(res['message']=='korisnik je dodat'){
                        localStorage.setItem('ulogovan', 'da');
                        localStorage.setItem('azuriranje', 'ne');
                        this.ruter.navigate(['admin']);                       
                      }                      
                  })
                }
              })
            }          
          });
        }
      });
    }
  }


}
