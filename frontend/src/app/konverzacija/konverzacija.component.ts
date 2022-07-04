import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KonverzacijeService } from '../konverzacije.service';
import { Konverzacija } from '../models/konverzacija';
import { Poruka } from '../models/poruka';
import * as alertify from 'alertifyjs';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { PonudeService } from '../ponude.service';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';
import { Ponuda } from '../models/ponuda';

@Component({
  selector: 'app-konverzacija',
  templateUrl: './konverzacija.component.html',
  styleUrls: ['./konverzacija.component.css']
})
export class KonverzacijaComponent implements OnInit {

  constructor(private ruter: Router, private konverzacijeServis: KonverzacijeService, private korisnikServis: KorisnikService,
    private ponudeServis: PonudeService, private nekretnineServis: NekretnineService) { }

  ngOnInit(): void {
    this.idKonverzacije = JSON.parse(localStorage.getItem('idKonverzacije'));
    this.ulogovani = localStorage.getItem('ulogovani');
    this.poruke = [];
    this.primalac = "";
    this.ponude = [];
    this.datumDo = '';
    this.datumOd = '';
    this.textPoruke = '';
    this.cena = 0;
    this.zauzeta = false;
    this.maxIdPonude = 0;
    this.idPoslatePonude = 0;
    this.zabrana = false;
    localStorage.setItem("konverzacija", "da");
    localStorage.setItem("inbox", "ne");
    localStorage.setItem("azuriranje",'ne');
    localStorage.setItem("arhiva", "da");

    this.korisnikServis.dohvKorisnika(this.ulogovani).subscribe((k: Korisnik)=>{
      this.korisnik = k;
    })
    let pomPonude:Ponuda[]=[];
    this.konverzacijeServis.dohvKonverzaciju(this.idKonverzacije).subscribe((k: Konverzacija)=>{
      this.izabrana = k;
      if (this.izabrana.vlasnik == this.ulogovani || this.izabrana.vlasnik == 'Agencija') {
        this.prima = this.izabrana.nudi;
      } 
      else if (this.izabrana.nudi == this.ulogovani && this.izabrana.vlasnik == 'Agencija'){
        //this.prima = 
      }
      this.nekretnineServis.dohvPoId(this.izabrana.idNekretnine).subscribe((n: Nekretnina)=>{
        this.izabranaNekretnina = n;
        
        this.ponudeServis.dohvatiPonudeZaVlasnika(this.izabrana.vlasnik).subscribe((p:Ponuda[])=>{
          pomPonude = p;
          for(let i = 0; i < pomPonude.length; i++){
            if (pomPonude[i].idNekretnine == this.izabranaNekretnina.id && pomPonude[i].nudi == this.izabrana.nudi){
              this.ponuda = pomPonude[i];
            }
          }
          })
      })

      this.poruke = k.poruke;
      for(let i = 0; i< this.poruke.length; i++){
        this.poruke[i].datum = this.poruke[i].datumSlanja.split('T')[0];
        this.poruke[i].vreme = (this.poruke[i].datumSlanja.split('T')[1]).split('.')[0];
        if(this.poruke[i].posiljalac != "Agencija") this.primalac = this.poruke[i].primalac;
        this.konverzacijeServis.citaj(this.idKonverzacije).subscribe();
      }
    })

    this.ponudeServis.dohvMaxId().subscribe((p: Ponuda)=>{
      this.maxIdPonude = p.idPonude + 1;
    })

    

  }

  idKonverzacije: number;
  izabrana: Konverzacija;
  poruke: Poruka[];
  ulogovani: string;
  korisnik: Korisnik;
  primalac: string;
  prima: string;

  izabranaNekretnina: Nekretnina;
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
  procenatAgencija: number; //DODAJ OVO U CENUUUUUUUUUU -> PREKO LOCALSTORAGE
  textPoruke: string;
  poruka: Poruka;
  ponude: Ponuda[];
  ponuda: Ponuda;
  maxIdPonude: number;
  idPoslatePonude: number;

  zabrana: boolean;

  posaljiPoruku(){
    if (this.textPoruke == ''){
      alertify.warning("Morate uneti tekst poruke!");
    }
    else {
      let danas = new Date();
      if (this.korisnik.tip == 'Radnik'){
      this.konverzacijeServis.dodajPoruku(this.idKonverzacije, "Agencija", this.ulogovani, this.primalac, danas, 
        this.textPoruke, false).subscribe((resp)=>{
          this.konverzacijeServis.dohvKonverzaciju(this.idKonverzacije).subscribe((k: Konverzacija)=>{
            this.izabrana = k;
            this.poruke = k.poruke;
            for(let i = 0; i< this.poruke.length; i++){
              this.poruke[i].datum = this.poruke[i].datumSlanja.split('T')[0];
              this.poruke[i].vreme = (this.poruke[i].datumSlanja.split('T')[1]).split('.')[0];
              this.konverzacijeServis.citaj(this.idKonverzacije).subscribe();
              this.textPoruke = '';
            }
          })
        });
      }
      else {
        
        this.konverzacijeServis.dodajPoruku(this.idKonverzacije, this.ulogovani, null, this.prima, danas, 
        this.textPoruke, false).subscribe((resp)=>{
          this.konverzacijeServis.dohvKonverzaciju(this.idKonverzacije).subscribe((k: Konverzacija)=>{
            this.izabrana = k;
            this.poruke = k.poruke;
            for(let i = 0; i< this.poruke.length; i++){
              this.poruke[i].datum = this.poruke[i].datumSlanja.split('T')[0];
              this.poruke[i].vreme = (this.poruke[i].datumSlanja.split('T')[1]).split('.')[0];
              this.konverzacijeServis.citaj(this.idKonverzacije).subscribe();
              this.textPoruke = '';
            }
          })
        });
      }
    }
  }

  iznajmi(){
    if(this.datumOd == '' && this.datumDo == ''){
      alertify.warning('Morate uneti oba datuma');
    }
    else{
        this.datumOdDate = new Date(this.datumOd);
        this.datumDoDate = new Date(this.datumDo);
  
        this.ponudeServis.dohvOdobrenePonudeZaNekretninu(this.izabranaNekretnina.id).subscribe((p: Ponuda[])=>{
          this.ponude = p;
          for(let i = 0; i< this.ponude.length; i++){
            this.pocetak = this.ponude[i].datumOd;
            this.kraj = this.ponude[i].datumDo;
  
            this.pocetakDate = new Date(this.pocetak);
            this.krajDate = new Date(this.kraj);
  
            if (!(this.pocetakDate.getTime() >= this.datumDoDate.getTime() || 
              this.krajDate.getTime() <= this.datumOdDate.getTime())){
              
              this.zauzeta = true;
              break;
            }
          }
          if (this.zauzeta){
            alertify.warning('Nekretnina je zauzeta u trazenom periodu!');
            this.zauzeta = false;
          }
          else{
            this.cena = this.izabranaNekretnina.cena / 30 * (this.datumDoDate.getTime() 
              - this.datumOdDate.getTime())/(1000 * 60 * 60 * 24);
            this.ponudeServis.dodajPonudu(this.maxIdPonude, this.izabranaNekretnina.id, this.izabranaNekretnina.namena,
               this.ulogovani, this.izabrana.vlasnik, 'N', this.datumOd, this.datumDo, this.cena).subscribe((resp)=>{
              if(resp['message'] != 'ponuda je dodata'){
                alertify.warning('greska');
              }
              else{

                this.konverzacijeServis.dodajPonudu(this.izabrana.idKonverzacije).subscribe((resp)=>{
                  if (resp["message"] = "ponuda je dodata"){
                    alertify.success('Zahtev je poslat!');
                    this.datumDo = '';
                    this.datumDo = '';
                    this.konverzacijeServis.dohvKonverzaciju(this.idKonverzacije).subscribe((k: Konverzacija)=>{
                      this.izabrana = k;
                
                      this.nekretnineServis.dohvPoId(this.izabrana.idNekretnine).subscribe((n: Nekretnina)=>{
                        this.izabranaNekretnina = n;
                      })
                
                      this.poruke = k.poruke;
                      for(let i = 0; i< this.poruke.length; i++){
                        this.poruke[i].datum = this.poruke[i].datumSlanja.split('T')[0];
                        this.poruke[i].vreme = (this.poruke[i].datumSlanja.split('T')[1]).split('.')[0];
                        this.konverzacijeServis.citaj(this.idKonverzacije).subscribe();
                        if(this.poruke[i].posiljalac != "Agencija") this.primalac = this.poruke[i].posiljalac;
                      }
                    })
                
                    this.ponudeServis.dohvMaxId().subscribe((p: Ponuda)=>{
                      this.maxIdPonude = p.idPonude + 1;
                    })
                  }
                })
              }
            })
          } 
          
        })
  
  
    }   
  }

  plati(){
    this.ponudeServis.dodajPonudu(this.maxIdPonude, this.izabranaNekretnina.id, this.izabranaNekretnina.namena, this.ulogovani,
      this.izabrana.vlasnik, 'N', null, null, this.izabranaNekretnina.cena).subscribe((resp)=>{
        if(resp['message'] != 'ponuda je dodata'){
          alertify.warning('greska');
        }
        else{
          alertify.success('Zahtev je poslat!');
          this.konverzacijeServis.dodajPonudu(this.izabrana.idKonverzacije).subscribe((resp)=>{
            if (resp["message"] = "ponuda je dodata"){
              alertify.success('Zahtev je poslat!');
              this.datumDo = '';
              this.datumDo = '';
              this.konverzacijeServis.dohvKonverzaciju(this.idKonverzacije).subscribe((k: Konverzacija)=>{
                this.izabrana = k;
          
                this.nekretnineServis.dohvPoId(this.izabrana.idNekretnine).subscribe((n: Nekretnina)=>{
                  this.izabranaNekretnina = n;
                })
          
                this.poruke = k.poruke;
                for(let i = 0; i< this.poruke.length; i++){
                  this.poruke[i].datum = this.poruke[i].datumSlanja.split('T')[0];
                  this.poruke[i].vreme = (this.poruke[i].datumSlanja.split('T')[1]).split('.')[0];
                  this.konverzacijeServis.citaj(this.idKonverzacije).subscribe();
                  if(this.poruke[i].posiljalac != "Agencija") this.primalac = this.poruke[i].posiljalac;
                }
              })
          
              this.ponudeServis.dohvMaxId().subscribe((p: Ponuda)=>{
                this.maxIdPonude = p.idPonude + 1;
              })
            }
          })
        }
    });
  } 

  posaljiPonudu(){
    if (this.izabranaNekretnina.namena == 'Izdavanje'){
      this.iznajmi();
    }
    else{
      this.plati();
    }
  }

  prihvatiPonudu(){
    let pomPonude : Ponuda[];
    if(this.korisnik.tip == 'Radnik'){
      this.ponudeServis.odobriPonudu(this.ponuda.idPonude).subscribe((resp)=>{
        if(resp['message']=='ok'){
          this.konverzacijeServis.obrisiPonuduZaKonverzaciju(this.izabrana.idKonverzacije).subscribe((resp)=>{
            if(resp['message']=='ok'){
              this.ponudeServis.dohvatiPonudeZaVlasnika(this.izabrana.vlasnik).subscribe((p:Ponuda[])=>{
                pomPonude = p;
                for(let i = 0; i < pomPonude.length; i++){
                  if (pomPonude[i].idNekretnine == this.izabranaNekretnina.id && 
                    pomPonude[i].status == 'N'){
                      this.ponudeServis.obrisiPonudu(pomPonude[i].idPonude).subscribe((resp)=>{
                        if(resp['message']=='ok'){
                          this.konverzacijeServis.obrisiPonuduZaNekretninu(this.izabranaNekretnina.id).subscribe((resp)=>{

                            this.konverzacijeServis.dohvKonverzaciju(this.idKonverzacije).subscribe((k: Konverzacija)=>{
                              this.izabrana = k;
                        
                              this.nekretnineServis.dohvPoId(this.izabrana.idNekretnine).subscribe((n: Nekretnina)=>{
                                this.izabranaNekretnina = n;
                              })
                        
                              this.poruke = k.poruke;
                              for(let i = 0; i< this.poruke.length; i++){
                                this.poruke[i].datum = this.poruke[i].datumSlanja.split('T')[0];
                                this.poruke[i].vreme = (this.poruke[i].datumSlanja.split('T')[1]).split('.')[0];
                                this.konverzacijeServis.citaj(this.idKonverzacije).subscribe();
                                if(this.poruke[i].posiljalac != "Agencija") this.primalac = this.poruke[i].posiljalac;
                              }
                            })
                          })
                        }
                      })      
                  }
                }
              })
            }
          })        
        }
      })
          
    }
    else{
      this.ponudeServis.dohvatiPonudeZaVlasnika(this.izabrana.vlasnik).subscribe((p:Ponuda[])=>{
        pomPonude = p;
        for(let i = 0; i < pomPonude.length; i++){
          if (pomPonude[i].idNekretnine == this.izabranaNekretnina.id){
            this.ponudeServis.prihvatiPonudu(pomPonude[i].idPonude).subscribe((resp)=>{
              if(resp['message']=='ok'){
                this.konverzacijeServis.dohvKonverzaciju(this.idKonverzacije).subscribe((k: Konverzacija)=>{
                  this.izabrana = k;
            
                  this.nekretnineServis.dohvPoId(this.izabrana.idNekretnine).subscribe((n: Nekretnina)=>{
                    this.izabranaNekretnina = n;
                  })
            
                  this.poruke = k.poruke;
                  for(let i = 0; i< this.poruke.length; i++){
                    this.poruke[i].datum = this.poruke[i].datumSlanja.split('T')[0];
                    this.poruke[i].vreme = (this.poruke[i].datumSlanja.split('T')[1]).split('.')[0];
                    this.konverzacijeServis.citaj(this.idKonverzacije).subscribe();
                    if(this.poruke[i].posiljalac != "Agencija") this.primalac = this.poruke[i].posiljalac;
                  }
                })
              }
            })
          }
        }
      })
    }
  }
  
  odbijPonudu(){
    this.konverzacijeServis.obrisiPonuduZaKonverzaciju(this.izabrana.idKonverzacije).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ponudeServis.obrisiPonudu(this.ponuda.idPonude).subscribe((resp)=>{
          if(resp['message']=='ok'){
            this.konverzacijeServis.dohvKonverzaciju(this.idKonverzacije).subscribe((k: Konverzacija)=>{
              this.izabrana = k;
        
              this.nekretnineServis.dohvPoId(this.izabrana.idNekretnine).subscribe((n: Nekretnina)=>{
                this.izabranaNekretnina = n;
              })
        
              this.poruke = k.poruke;
              for(let i = 0; i< this.poruke.length; i++){
                this.poruke[i].datum = this.poruke[i].datumSlanja.split('T')[0];
                this.poruke[i].vreme = (this.poruke[i].datumSlanja.split('T')[1]).split('.')[0];
                this.konverzacijeServis.citaj(this.idKonverzacije).subscribe();
                if(this.poruke[i].posiljalac != "Agencija") this.primalac = this.poruke[i].posiljalac;
              }
            })
          }
        })
      }
    })
  }

  blokiraj(){
    if (this.ulogovani == this.izabrana.nudi){
      this.korisnikServis.blokiraj(this.ulogovani, this.izabrana.vlasnik).subscribe((resp)=>{
        if (resp["message"] == "korisnik je dodat"){
          this.konverzacijeServis.arhiviraj(this.izabrana.idKonverzacije).subscribe((resp)=>{
            if (resp["message"] == "ok"){
              this.zabrana = true;
            }
          })
        }
      })
    }
    
  }

  odblokiraj(){

  }

}
