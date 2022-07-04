import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';

@Component({
  selector: 'app-nekretnine',
  templateUrl: './nekretnine.component.html',
  styleUrls: ['./nekretnine.component.css']
})
export class NekretnineComponent implements OnInit {

  constructor(private ruter: Router, private nekretnineServis: NekretnineService, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    localStorage.setItem('azuriranje', 'da');
    this.tipKorisnika = localStorage.getItem('tip');
    this.nekretnineServis.dohvMaxId().subscribe((resp: Nekretnina)=>{
      this.maxId = resp.id;
    })
    this.naziv = '';
    this.grad = '';
    this.opstina = '';
    this.ulica = '';
    this.broj = null;
    this.tip = '';
    this.sprat = null;
    this.zgrada = null;
    this.kvadratura = null;
    this.br_soba = '';
    this.namestena = '';
    this.galerija = [];
    this.namena = '';
    this.cena = null;
    this.vlasnik = '';
    this.slike = [];
    this.izabraneSlike = [];

    this.ulogovaniKorIme = localStorage.getItem('ulogovani');
  }

  naziv: string;
  grad: string;
  opstina: string;
  ulica: string;
  broj: number;
  tip: string;
  sprat: number;
  zgrada: number;
  kvadratura: number;
  br_soba: string;
  namestena: string;
  galerija: Array<string>;
  namena: string;
  cena: number;
  vlasnik: string;
  maxId: number;

  slika: File;
  nazivSlike: string;
  slike: File[];
  izabraneSlike: File[];
  
  tipKorisnika: string;
  ulogovaniKorIme: string;

  
  selectMultipleImage(event){
    if (event.target.files.length > 0) {
      this.slike = event.target.files;
      
      for(let i=0; i< this.slike.length; i++){
        this.galerija.push(this.slike[i].name);
        this.izabraneSlike.push(this.slike[i]);
      }
    }
  }

  uploadFiles(){
    this.nekretnineServis.uploadFiles(this.izabraneSlike).subscribe(res=>{
      if(res["ret"]=="ok"){

      }
    });
  }


  dodaj(){
    if (this.naziv=='' || this.grad=='' || this.opstina=='' || this.ulica=='' || this.broj==null || this.tip=='' ||
        this.sprat==null || this.kvadratura== null || this.br_soba=='' || this.namestena=='' || this.namena=='' || this.cena==null)
    {
      alertify.warning("Niste uneli sve podatke!");
    }
    else if (this.tip=='Stan' && this.zgrada==null){
      alertify.warning("Niste uneli sve podatke!");
    }
    else if (this.izabraneSlike.length < 3){
      alertify.warning("Morate dodati najmanje 3 fajla u galeriju!")
    } 
    else {
      if (this.slike != undefined){
        this.uploadFiles();
      }
      
      localStorage.setItem('ulogovani', this.ulogovaniKorIme);      
      localStorage.setItem('azuriranje', 'ne');

      if(this.tipKorisnika=='Registrovani'){
        this.nekretnineServis.dodajNekretninuK((this.maxId+1), this.naziv, this.grad, this.opstina,this.ulica, this.broj, this.tip,
          this.sprat, this.zgrada, this.kvadratura, this.br_soba, this.namestena, this.galerija, this.namena, this.cena, this.ulogovaniKorIme,
          0, 0).subscribe(res=>{
          if(res['poruka']=='nekretnina je dodata'){
            localStorage.setItem('tip', 'Registrovani');
            this.ruter.navigate(['registrovani']);
          }
        })

      }
      else{
        this.nekretnineServis.dodajNekretninuA((this.maxId + 1), this.naziv, this.grad, this.opstina, this.ulica, this.broj, this.tip,
          this.sprat, this.zgrada, this.kvadratura, this.br_soba, this.namestena, this.galerija, this.namena, this.cena, 'Agencija',
           1, 0).subscribe(res=>{
             if(res['poruka']=='nekretnina je dodata'){
               localStorage.setItem('tip', 'Admin');
               if(this.tipKorisnika=='Admin'){
                this.ruter.navigate(['admin']);
               }
               else{                 
                localStorage.setItem('tip', 'Radnik');
                this.ruter.navigate(['radnik']);
               } 
             }
           })
      }
    }
  }
  
}
