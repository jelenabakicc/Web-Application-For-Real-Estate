import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';
import * as alertify from 'alertifyjs';
import { PonudeService } from '../ponude.service';
import { Ponuda } from '../models/ponuda';
import { Poruka } from '../models/poruka';
import { KonverzacijeService } from '../konverzacije.service';
import { Konverzacija } from '../models/konverzacija';

@Component({
  selector: 'app-izabrana-nekretnina',
  templateUrl: './izabrana-nekretnina.component.html',
  styleUrls: ['./izabrana-nekretnina.component.css']
})
export class IzabranaNekretninaComponent implements OnInit {

  constructor(private ruter:Router,private nekretninaServis: NekretnineService, private korisnikServis:KorisnikService,
    private ponudeServis: PonudeService, private konverzacijeServis:KonverzacijeService) { }

  ngOnInit(): void {

    this.ulogovani = localStorage.getItem('ulogovani');
    this.id = JSON.parse(localStorage.getItem("izabranaNekretnina"));
    localStorage.setItem("azuriranje", "da");
    this.trenutnaIndeks = 0;
    this.datumOd = '';
    this.datumDo = '';
    this.pocetak = '';
    this.kraj = '';
    this.zauzeta = false;
    this.cena = 0;
    this.placanje = '';
    this.textPoruke = '';
    this.ponude = [];
    this.kontaktiraj = false;
    this.maxIdKonv = 0;
    
    this.nekretninaServis.dohvPoId(this.id).subscribe((n:Nekretnina)=>{
      this.izabrana = n;
      this.trenutnaSlika = this.izabrana.galerija[0];
      this.ucesce = this.izabrana.cena / 5;
    })

    this.konverzacijeServis.dohvMaxId().subscribe((k:Konverzacija)=>{
      if(k){
        this.maxIdKonv = k.idKonverzacije + 1;
      }
      else this.maxIdKonv = 1;
      
    })
    

  }

  ulogovani: string;
  id: number;
  izabrana: Nekretnina;
  trenutnaIndeks: number;
  trenutnaSlika: string;

  datumOd: string;
  datumDo: string;
  datumOdDate: Date;
  datumDoDate: Date;
  pocetak: string;
  kraj: string;
  pocetakDate: Date;
  krajDate: Date;
  zauzeta: boolean;
  cena: number;
  //procenatAgencija: number; //DODAJ OVO U CENUUUUUUUUUU -> PREKO LOCALSTORAGE
  textPoruke: string;
  poruka: Poruka;

  ponude: Ponuda[];

  placanje: string;
  ucesce: number;

  kontaktiraj: boolean;
  maxIdKonv: number;

  slikaLevo(){
    if (this.trenutnaIndeks == 0){
      this.trenutnaIndeks = this.izabrana.galerija.length - 1;
    }
    else{
      this.trenutnaIndeks = this.trenutnaIndeks - 1;
    }
    this.trenutnaSlika = this.izabrana.galerija[this.trenutnaIndeks];
  }

  slikaDesno(){
    if (this.trenutnaIndeks == (this.izabrana.galerija.length - 1)){
      this.trenutnaIndeks = 0;
    }
    else{
      this.trenutnaIndeks = this.trenutnaIndeks + 1;
    }
    this.trenutnaSlika = this.izabrana.galerija[this.trenutnaIndeks];
  }
  
  

  dostupnost(){
    if (this.datumDo == '' || this.datumOd == ''){
      alertify.warning('Morate uneti oba datuma!');
    }
    else{
      this.datumOdDate = new Date(this.datumOd);
      this.datumDoDate = new Date(this.datumDo);

      this.ponudeServis.dohvOdobrenePonudeZaNekretninu(this.izabrana.id).subscribe((p: Ponuda[])=>{
        this.ponude = p;
        for(let i = 0; i< this.ponude.length; i++){
          this.pocetak = this.ponude[i].datumOd;
          this.kraj = this.ponude[i].datumDo;

          this.pocetakDate = new Date(this.pocetak);
          this.krajDate = new Date(this.kraj);

          if (!(this.pocetakDate.getTime() >= this.datumDoDate.getTime() || this.krajDate.getTime() <= this.datumOdDate.getTime())){
            
            this.zauzeta = true;
            break;
          }
        }
        if (this.zauzeta){
          alertify.warning('Nekretnina je zauzeta u trazenom periodu!');
          this.zauzeta = false;
        }
        else{
          alertify.success('Nekretnina je slobodna, kontaktirajte korisnika za ponudu!')
        }
      })
    }
  }

  kontaktirajVlasnika(){
    this.kontaktiraj = true;
  }

  posaljiPoruku(){
    if(this.textPoruke==''){
      alertify.warning('Morate uneti tekst poruke!');
    }
    else{
      let mojeKonv: Konverzacija[] = [];
      this.konverzacijeServis.dohvKonverzacijeZaPonudjaca(this.ulogovani).subscribe((k: Konverzacija[])=>{
          mojeKonv = k;
          let danas = new Date();
          if(mojeKonv.length == 0){
            this.konverzacijeServis.zapocniKonverzaciju(this.maxIdKonv, this.izabrana.id, this.izabrana.tip, this.izabrana.naziv, 
              this.ulogovani, this.izabrana.vlasnik, danas, false, false, false).subscribe((resp)=>{
                if(resp['message']!='konverzacija je dodata'){
                  alertify.warning('greska prilikom dodavanja konverzacije');
                }
                else{
                  this.konverzacijeServis.dodajPoruku(this.maxIdKonv, this.ulogovani, null, this.izabrana.vlasnik, danas, 
                    this.textPoruke, false).subscribe((resp)=>{
                      if(resp["message"]!="poruka je dodata") alertify.warning('greska kod dodavanja poruke');
                    });
                }
              })
          }
          else{
            let pronasao = false;
            let id = 0;
            for (let j = 0; j < mojeKonv.length; j++){
              if (mojeKonv[j].idNekretnine == this.izabrana.id){
                pronasao = true;
                id = mojeKonv[j].idKonverzacije;
              }
            }
            if (pronasao){
              this.konverzacijeServis.dodajPoruku(id, this.ulogovani, null, this.izabrana.vlasnik, danas, 
                this.textPoruke, false).subscribe((resp)=>{
                  if(resp["message"]!="poruka je dodata") alertify.warning('greska kod dodavanja poruke');

                })
            }
            else{
              this.konverzacijeServis.zapocniKonverzaciju(this.maxIdKonv, this.izabrana.id, this.izabrana.tip, this.izabrana.naziv, 
                this.ulogovani, this.izabrana.vlasnik, danas, false, false, false).subscribe((resp)=>{
                  if(resp['message']!='konverzacija je dodata'){
                    alertify.warning('greska prilikom dodavanja konverzacije');
                  }
                  else{
                    this.konverzacijeServis.dodajPoruku(this.maxIdKonv, this.ulogovani, null, this.izabrana.vlasnik, danas, 
                      this.textPoruke, false).subscribe((resp)=>{
                        if(resp["message"]!="poruka je dodata") alertify.warning('greska kod dodavanja poruke');
                      });
                  }
                })
            }
          }
      })
      //this.textPoruke = '';

      this.kontaktiraj = false;
    }
  }



//   iznajmi(){
//     if(this.datumOd == '' && this.datumDo == '' && this.textPoruke != '' && this.vecPoslaoPonudu){
//       //TODO samo push poruku na vec postojecu ponudu
//     }
//     else{
//       this.cena = this.izabrana.cena / 30 * (this.datumDoDate.getTime() - this.datumOdDate.getTime())/(1000 * 60 * 60 * 24);
//       this.ponudeServis.dodajPonudu(this.maxIdPonude, this.izabrana.id, this.izabrana.namena, this.ulogovani, 
//         this.izabrana.vlasnik, 'N', this.datumOd, this.datumDo, this.cena).subscribe((resp)=>{
//           if(resp['message'] != 'ponuda je dodata'){
//             alertify.warning('greska');
//           }
//           else{
//             alertify.success('Zahtev je poslat!');
//             this.datumDo = '';
//             this.datumDo = '';
//           }
//         })
//       }
    
// }

// plati(){
// if (this.placanje == ''){
//   alertify.warning('Morate odabrati nacin placanja!');
// }
// else{
//   if (this.vecPoslaoPonudu && this.textPoruke != ''){
//     //TODO samo push poruku na postojecu ponudu
//   }
//   else if(!this.vecPoslaoPonudu){
//     this.ponudeServis.dodajPonudu(this.maxIdPonude, this.izabrana.id, this.izabrana.namena, this.ulogovani,
//       this.izabrana.vlasnik, 'N', null, null, this.izabrana.cena).subscribe((resp)=>{
//         if(resp['message'] != 'ponuda je dodata'){
//           alertify.warning('greska');
//         }
//         else{
//           alertify.success('Zahtev je poslat!');
//           this.kredit = false;
//           this.placanje = '';
//           this.ucesce = 0;
//         }
//     });
//     if (this.textPoruke!=''){
//       //TODO push poruku na novu ponudu
//     }
//   } 
// }

//}

}
