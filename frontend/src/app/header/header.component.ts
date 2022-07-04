import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ruter: Router) { }

  ngOnInit(): void {
    this.tip = localStorage.getItem("tip");
    this.ulogovan = localStorage.getItem("ulogovan");
    this.registracija = localStorage.getItem("registracija");
    this.korisnickoIme = localStorage.getItem("ulogovani");
    this.prijava = localStorage.getItem("prijava");
    this.azuriranje = localStorage.getItem("azuriranje");
    this.inbox = localStorage.getItem("inbox");
    this.konverzacija = localStorage.getItem("konverzacija");
    this.arhiva = localStorage.getItem("arhiva");
    //this.dodajNovog = localStorage.getItem("dodajNovog");
  }

  ulogovan: string;
  registracija: string;
  prijava: string;
  tip: string;
  korisnickoIme: string;
  azuriranje: string;
  inbox: string;
  konverzacija: string;
  arhiva: string;
  //dodajNovog: string;

  odjava(){
    localStorage.clear();
    localStorage.setItem('ulogovan', 'ne');
    localStorage.setItem('azuriranje', 'ne');
    this.ruter.navigate([""]);
  }

  povratak(){
    localStorage.setItem('azuriranje', 'ne');
    localStorage.setItem('tip', this.tip);
    localStorage.setItem('ulogovani', this.korisnickoIme);
    
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
}
