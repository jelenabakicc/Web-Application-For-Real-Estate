import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-azuriraj',
  templateUrl: './azuriraj.component.html',
  styleUrls: ['./azuriraj.component.css']
})
export class AzurirajComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    
    this.ulogovaniTip = localStorage.getItem('tip');
    if (this.ulogovaniTip =='Admin'){
      this.ulogovaniKorIme = localStorage.getItem('izabraniKorisnik');
    }
    else {
      this.ulogovaniKorIme = localStorage.getItem('ulogovani');
    }
    this.korisnikServis.dohvKorisnika(this.ulogovaniKorIme).subscribe((k: Korisnik)=>{
      this.ulogovani = k;
    })
    localStorage.setItem("azuriranje", "da");
    this.ime = "";
    this.prezime = "";
    this.kor_ime = "";
    this.email = "";
    this.grad = "";
    this.drzava = "";
    this.nazivSlike = "";
    this.greska = "";
    
  }

  ulogovaniKorIme: string;
  ulogovaniTip: string;
  ulogovani: Korisnik;
  ime: string;
  prezime: string;
  kor_ime: string;
  email: string;
  grad: string;
  drzava: string;
  slika: File;
  nazivSlike: string;
  korisnik: Korisnik;
  postojiIme: boolean;
  postojiMail: boolean;

  greska: string;

  onFileSelect(event) {
    
    this.slika = event.target.files[0];
    this.nazivSlike = this.slika.name;
  }

  uploadPhoto(){
    this.korisnikServis.uploadPhoto(this.slika).subscribe(res=>{
      if(res["ret"]=="ok")
        {}
        
    });
  }

  azuriraj(){
    
    if (this.ime != ""){
      this.korisnikServis.azurirajIme(this.ulogovani.kor_ime, this.ime).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning("Greska prilikom azuriranja imena");
        }
        else{
          this.ulogovani.ime = this.ime;
        }
      })
    }
    if(this.prezime != ""){
      this.korisnikServis.azurirajPrezime(this.ulogovani.kor_ime, this.prezime).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning("Greska prilikom azuriranja prezimena");
        }
        else{
          this.ulogovani.prezime = this.prezime;
        }
      })
    }
    if(this.email != ""){
      this.korisnikServis.azurirajMail(this.ulogovani.kor_ime, this.email).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning("Greska prilikom azuriranja mail-a");
        }
        else{
          this.ulogovani.email = this.email;
        }
      })
    }
    if(this.grad != ""){
      this.korisnikServis.azurirajGrad(this.ulogovani.kor_ime, this.grad).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning("Greska prilikom azuriranja grada");
        }
        else{
          this.ulogovani.grad = this.grad;
        }
      })
    }
    if(this.drzava != ""){
      this.korisnikServis.azurirajDrzavu(this.ulogovani.kor_ime, this.drzava).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning("Greska prilikom azuriranja drzave");
        }
        else{
          this.ulogovani.drzava = this.drzava;
        }
      })
    }
    if (this.slika!=undefined){
      this.korisnikServis.azurirajSliku(this.ulogovani.kor_ime, this.nazivSlike).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning("Greska prilikom azuriranja profilne slike");
        }
        else{
          this.ulogovani.slika = this.nazivSlike;
          this.uploadPhoto();
        }
      })
     
    }
    
    localStorage.setItem('azuriranje', 'ne');
    localStorage.setItem("tip", this.ulogovaniTip);

    if (this.ulogovaniTip =='Admin'){
      this.ruter.navigate(['admin']);  
    }
    else {
      if (this.ulogovaniTip == "Registrovani"){
        this.ruter.navigate(['registrovani']);
      }
      else {
        this.ruter.navigate(['radnik']);
    
      }
    }
    
  }
}
