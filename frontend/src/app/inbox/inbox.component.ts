import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KonverzacijeService } from '../konverzacije.service';
import { KorisnikService } from '../korisnik.service';
import { Konverzacija } from '../models/konverzacija';
import { Korisnik } from '../models/korisnik';
import { PonudeService } from '../ponude.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private ponudeServis: PonudeService, 
    private konverzacijeServis: KonverzacijeService) { }

  ngOnInit(): void {
    this.ulogovani = localStorage.getItem('ulogovani');
    localStorage.setItem("azuriranje", "da");
    localStorage.setItem("inbox", "da");
    localStorage.setItem("arhiva", "ne");
    this.mojeKonverzacije = [];

    this.korisnikServis.dohvKorisnika(this.ulogovani).subscribe((k:Korisnik)=>{
      this.korisnik = k;
      
      if(this.korisnik.tip == 'Radnik'){
        this.konverzacijeServis.dohvKonverzacijeZaAgenciju().subscribe((kon: Konverzacija[])=>{
          this.mojeKonverzacije = kon;
          for(let i = 0; i < this.mojeKonverzacije.length; i++){
            this.mojeKonverzacije[i].datum = this.mojeKonverzacije[i].poslednjaDatum.split('T')[0];
            this.mojeKonverzacije[i].vreme = (this.mojeKonverzacije[i].poslednjaDatum.split('T')[1]).split('.')[0];
          }
          this.mojeKonverzacije.sort((a, b) => +new Date(b.poslednjaDatum) - +new Date(a.poslednjaDatum));
        })
      }
      else if(this.korisnik.tip == 'Registrovani'){
        
        this.konverzacijeServis.dohvKonverzacijeZaVlasnika(this.ulogovani).subscribe((konv: Konverzacija[])=>{
          this.mojeKonverzacije = konv;
          this.konverzacijeServis.dohvKonverzacijeZaPonudjaca(this.ulogovani).subscribe((ko:Konverzacija[])=>{
            for (let i = 0; i < ko.length; i++){   
              this.mojeKonverzacije.push(ko[i]);
            }
            for(let i = 0; i < this.mojeKonverzacije.length; i++){
              this.mojeKonverzacije[i].datum = this.mojeKonverzacije[i].poslednjaDatum.split('T')[0];
              this.mojeKonverzacije[i].vreme = (this.mojeKonverzacije[i].poslednjaDatum.split('T')[1]).split('.')[0];
            }
            this.mojeKonverzacije.sort((a, b) => +new Date(b.poslednjaDatum) - +new Date(a.poslednjaDatum));
          })
        })
      }
    })

    
       

  }

  ulogovani: string;
  radnici: Korisnik[];
  korisnik: Korisnik;
  korisnici: Korisnik[];  //ovo je za blokirane!!
  mojeKonverzacije: Konverzacija[];
  pomKonv: Konverzacija[];

  otvori(n: Konverzacija){
    localStorage.setItem('idKonverzacije', JSON.stringify(n.idKonverzacije));
    
    this.ruter.navigate(['konverzacija']);
      
  
    
  }

  arhiviraj(n: Konverzacija){

    this.konverzacijeServis.arhiviraj(n.idKonverzacije).subscribe((resp)=>{
      if (resp['message'] == 'ok'){
        this.konverzacijeServis.dohvKonverzacijeZaVlasnika(this.ulogovani).subscribe((k: Konverzacija[])=>{
          this.mojeKonverzacije = k;
          this.konverzacijeServis.dohvKonverzacijeZaPonudjaca(this.ulogovani).subscribe((k:Konverzacija[])=>{
            for (let i = 0; i < k.length; i++){   
              this.mojeKonverzacije.push(k[i]);
            }
            for(let i = 0; i < this.mojeKonverzacije.length; i++){
              this.mojeKonverzacije[i].datum = this.mojeKonverzacije[i].poslednjaDatum.split('T')[0];
              this.mojeKonverzacije[i].vreme = (this.mojeKonverzacije[i].poslednjaDatum.split('T')[1]).split('.')[0];
            }
            this.mojeKonverzacije.sort((a, b) => +new Date(b.poslednjaDatum) - +new Date(a.poslednjaDatum));
          })
        })
      }
    });

  }

  blokiraj(n: Konverzacija){

  }

  odblokiraj(n: Konverzacija){

  }

}
