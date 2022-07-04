import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poruka } from './models/poruka';

@Injectable({
  providedIn: 'root'
})
export class KonverzacijeService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvKonverzaciju(idKonverzacije){
    const podaci = {
      idKonverzacije: idKonverzacije
    }

    return this.http.post(`${this.uri}/konverzacije/dohvKonverzaciju`, podaci);
  }

  dohvKonverzacijeZaVlasnika(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/konverzacije/dohvKonverzacijeZaVlasnika`, podaci);
  }
  
  dohvKonverzacijeZaPonudjaca(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/konverzacije/dohvKonverzacijeZaPonudjaca`, podaci);
  }

  zapocniKonverzaciju(idKonverzacije, idNekretnine, tip, naslov, nudi, vlasnik, poslednjaDatum, poslednjaProcitana, imaPonudu, arhivirana){
    const podaci = {
      idKonverzacije: idKonverzacije,
      idNekretnine: idNekretnine,
      tip: tip,
      naslov: naslov,
      nudi: nudi,
      vlasnik: vlasnik,
      poslednjaDatum: poslednjaDatum,
      poslednjaProcitana: poslednjaProcitana,
      imaPonudu: imaPonudu,
      arhivirana: arhivirana
    }

    return this.http.post(`${this.uri}/konverzacije/zapocniKonverzaciju`, podaci);
  }

  dohvMaxId(){

    return this.http.get(`${this.uri}/konverzacije/dohvMaxId`);
  }

  dodajPoruku(idKonverzacije, posiljalac, agencijaPosiljalac, primalac, datumSlanja, tekst, procitana){
    
    let poruka = new Poruka();
    poruka.idKonverzacije = idKonverzacije;
    poruka.posiljalac = posiljalac;
    poruka.agencijaPosiljalac = agencijaPosiljalac;
    poruka.primalac = primalac;
    poruka.datumSlanja = datumSlanja;
    poruka.text = tekst;
    poruka.procitana = procitana;

    const podaci = {
      idKonverzacije: idKonverzacije,
      datumSlanja: datumSlanja,
      poruka: poruka
    }

    return this.http.post(`${this.uri}/konverzacije/dodajPoruku`, podaci);
  }

  arhiviraj(idKonverzacije){
    const podaci = {
      idKonverzacije: idKonverzacije
    }

    return this.http.post(`${this.uri}/konverzacije/arhiviraj`, podaci);
  }

  dearhiviraj(idKonverzacije){
    const podaci = {
      idKonverzacije: idKonverzacije
    }

    return this.http.post(`${this.uri}/konverzacije/dearhiviraj`, podaci);
  }

  citaj(idKonverzacije){
    const podaci = {
      idKonverzacije: idKonverzacije
    }

    return this.http.post(`${this.uri}/konverzacije/citaj`, podaci);
  }

  dohvArhiviraneKonverzacijeZaVlasnika(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/konverzacije/dohvArhiviraneKonverzacijeZaVlasnika`, podaci);
  }
  
  dohvArhiviraneKonverzacijeZaPonudjaca(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/konverzacije/dohvArhiviraneKonverzacijeZaPonudjaca`, podaci);
  }

  dohvKonverzacijeZaAgenciju(){

    return this.http.get(`${this.uri}/konverzacije/dohvKonverzacijeZaAgenciju`);
  }

  dodajPonudu(idKonverzacije){
    const podaci = {
      idKonverzacije: idKonverzacije
    }

    return this.http.post(`${this.uri}/konverzacije/dodajPonudu`, podaci);
  }

  obrisiPonuduZaNekretninu(idNekretnine){
    const podaci = {
      idNekretnine: idNekretnine
    }

    return this.http.post(`${this.uri}/konverzacije/obrisiPonuduZaNekretninu`, podaci);
  }

  obrisiPonuduZaKonverzaciju(idKonverzacije){
    const podaci = {
      idKonverzacije: idKonverzacije
    }

    return this.http.post(`${this.uri}/konverzacije/obrisiPonuduZaKonverzaciju`, podaci);
  }
}
