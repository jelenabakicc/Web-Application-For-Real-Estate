import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NekretnineService } from '../nekretnine.service';
import * as alertify from 'alertifyjs';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-izmeni-nekretninu',
  templateUrl: './izmeni-nekretninu.component.html',
  styleUrls: ['./izmeni-nekretninu.component.css']
})
export class IzmeniNekretninuComponent implements OnInit {

  constructor(private ruter: Router, private nekretnineServis: NekretnineService) { }

  ngOnInit(): void {
    localStorage.setItem("azuriranje", "da");
    this.id = JSON.parse(localStorage.getItem('nekretninaIzmena'));
    this.ulogovaniKorIme = localStorage.getItem('ulogovani');
    this.tipKorisnika = localStorage.getItem('tip');
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
  }

  id: number;
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

  izmeni(){
    if (this.naziv!=''){
      this.nekretnineServis.azurirajNaziv(this.id,this.naziv).subscribe((resp)=>{
        if(resp['poruka'] != 'ok'){
          alertify.warning('Greska prilikom azuriranja naziva');
        }
      })
    }
    if (this.grad!=''){
      this.nekretnineServis.azurirajGrad(this.id, this.grad).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja grada');
        }
      })
    }
    if (this.opstina!=''){
      this.nekretnineServis.azurirajOpstinu(this.id, this.opstina).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja opstine');
        }
      })
    }
    if (this.ulica!=''){
      this.nekretnineServis.azurirajUlicu(this.id, this.ulica).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja ulice');
        }
      })
    }
    if(this.broj!= null){
      this.nekretnineServis.azurirajBroj(this.id, this.broj).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja broja');
        }
      })
    }
    if(this.tip!=''){
      this.nekretnineServis.azurirajTip(this.id,this.tip).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja tipa');
        }
      })
    }
    if(this.sprat!=null){
      this.nekretnineServis.azurirajSprat(this.id, this.sprat).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja sprata');
        }
      })
    }
    if(this.tip=='Stan' && this.zgrada==null){
      alertify.warning("Morate uneti spratnost zgrade!");
    }
    else {
      this.nekretnineServis.azurirajZgradu(this.id, this.zgrada).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja spratnosti zgrade');
        }
      })
    }
    if(this.kvadratura!= null){
      this.nekretnineServis.azurirajKvadraturu(this.id, this.kvadratura).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja kvadrature');
        }
      })
    }
    if(this.br_soba!=''){
      this.nekretnineServis.azurirajBrSoba(this.id, this.br_soba).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja broja soba');
        }
      })
    }
    if(this.namestena!=''){
      this.nekretnineServis.azurirajNamestena(this.id, this.namestena).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja polja da li je nekretnina namestena');
        }
      })
    }
    if (this.izabraneSlike.length > 0){
      if (this.slike != undefined){
        this.uploadFiles();
        this.nekretnineServis.azurirajGaleriju(this.id, this.galerija).subscribe((resp)=>{
          if(resp['poruka']!='ok'){
            alertify.warning('Greska prilikom azuriranja galerije slika');
          }
        })
      }  
    }
    if(this.namena!=''){
      this.nekretnineServis.azurirajNamenu(this.id, this.namena).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja namene');
        }
      })
    }
    if(this.cena!=null){
      this.nekretnineServis.azurirajCenu(this.id,this.cena).subscribe((resp)=>{
        if(resp['poruka']!='ok'){
          alertify.warning('Greska prilikom azuriranja cene');
        }
      })
    } 
    localStorage.setItem('azuriranje', 'ne');
    localStorage.setItem("tip", this.tipKorisnika);
    localStorage.setItem("ulogovani", this.ulogovaniKorIme);
    this.ruter.navigate(['registrovani']);   
  }

}
