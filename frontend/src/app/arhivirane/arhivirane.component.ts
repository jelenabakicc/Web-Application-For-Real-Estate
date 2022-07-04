import { Component, OnInit } from '@angular/core';
import { KonverzacijeService } from '../konverzacije.service';
import { Konverzacija } from '../models/konverzacija';
import { Poruka } from '../models/poruka';

@Component({
  selector: 'app-arhivirane',
  templateUrl: './arhivirane.component.html',
  styleUrls: ['./arhivirane.component.css']
})
export class ArhiviraneComponent implements OnInit {

  constructor(private konverzacijeServis: KonverzacijeService) { }

  ngOnInit(): void {
    localStorage.setItem("arhiva", "da");
    localStorage.setItem("inbox", "ne");
    localStorage.setItem("azuriranje", "ne");
    this.ulogovani = localStorage.getItem("ulogovani");

    this.arhivirane = [];
    this.konverzacijeServis.dohvArhiviraneKonverzacijeZaVlasnika(this.ulogovani).subscribe((k: Konverzacija[])=>{
      this.arhivirane = k;
      this.konverzacijeServis.dohvArhiviraneKonverzacijeZaPonudjaca(this.ulogovani).subscribe((k:Konverzacija[])=>{
        for (let i = 0; i < k.length; i++){   
          this.arhivirane.push(k[i]);
        }
        for(let i = 0; i < this.arhivirane.length; i++){
          this.arhivirane[i].datum = this.arhivirane[i].poslednjaDatum.split('T')[0];
          this.arhivirane[i].vreme = (this.arhivirane[i].poslednjaDatum.split('T')[1]).split('.')[0];
        }
        this.arhivirane.sort((a, b) => +new Date(b.poslednjaDatum) - +new Date(a.poslednjaDatum));
      })
    })
  }

  arhivirane: Konverzacija[];
  ulogovani: string;

  izbaci(a: Konverzacija){
    this.konverzacijeServis.dearhiviraj(a.idKonverzacije).subscribe((resp)=>{
      if(resp['message'] == 'ok'){
        this.konverzacijeServis.dohvArhiviraneKonverzacijeZaVlasnika(this.ulogovani).subscribe((k: Konverzacija[])=>{
          this.arhivirane = k;
          this.konverzacijeServis.dohvArhiviraneKonverzacijeZaPonudjaca(this.ulogovani).subscribe((k:Konverzacija[])=>{
            for (let i = 0; i < k.length; i++){   
              this.arhivirane.push(k[i]);
            }
            for(let i = 0; i < this.arhivirane.length; i++){
              this.arhivirane[i].datum = this.arhivirane[i].poslednjaDatum.split('T')[0];
              this.arhivirane[i].vreme = (this.arhivirane[i].poslednjaDatum.split('T')[1]).split('.')[0];
            }
            this.arhivirane.sort((a, b) => +new Date(b.poslednjaDatum) - +new Date(a.poslednjaDatum));
          })
        })
      }
    })
  }

}
