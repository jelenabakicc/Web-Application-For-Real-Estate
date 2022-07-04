import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PonudeService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvSvePonude(){

    return this.http.get(`${this.uri}/ponude/dohvSvePonude`);
  }

  dohvatiPonudeZaVlasnika(vlasnik){
    const podaci = {
      vlasnik: vlasnik
    }

    return this.http.post(`${this.uri}/ponude/dohvatiPonudeZaVlasnika`, podaci);
  }

  dohvatiPonuduPoId(idPonude){
    const podaci = {
      idPonude: idPonude
    }
 
    return this.http.post(`${this.uri}/ponude/dohvatiPonuduPoId`, podaci);
  }

  dohvNeodobrene(){

    return this.http.get(`${this.uri}/ponude/dohvNeodobrene`);
  }

  dohvPrihvacene(){

    return this.http.get(`${this.uri}/ponude/dohvPrihvacene`);
  }

  dohvOdobrene(){

    return this.http.get(`${this.uri}/ponude/dohvOdobrene`);
  }


  dodajPonudu(idPonude, idNekretnine, tip, nudi, vlasnik, status, datumOd, datumDo, ukupnaCena){
    let datumSlanja = new Date();
    const podaci = {
      idPonude: idPonude,
      idNekretnine: idNekretnine,
      tip: tip,
      nudi: nudi,
      vlasnik: vlasnik,
      status: status,
      datumOd: datumOd,
      datumDo: datumDo,
      ukupnaCena: ukupnaCena,
      datumSlanja: datumSlanja
    }

    return this.http.post(`${this.uri}/ponude/dodajPonudu`, podaci);
  }

  dohvPonudeZaNekretninu(idNekretnine){
    const podaci = {
      idNekretnine: idNekretnine
    }

    return this.http.post(`${this.uri}/ponude/dohvPonudeZaNekretninu`, podaci)
  }

  dohvOdobrenePonudeZaNekretninu(idNekretnine){

    const podaci = {
      idNekretnine: idNekretnine
    }

    return this.http.post(`${this.uri}/ponude/dohvOdobrenePonudeZaNekretninu`, podaci);
  }

  dohvMaxId(){

    return this.http.get(`${this.uri}/ponude/dohvMaxId`);
  }

  odobriPonudu(idPonude){
    const podaci = {
      idPonude: idPonude
    }

    return this.http.post(`${this.uri}/ponude/odobriPonudu`, podaci);
  }

  prihvatiPonudu(idPonude){
    const podaci = {
      idPonude: idPonude
    }

    return this.http.post(`${this.uri}/ponude/prihvatiPonudu`, podaci);
  }

  obrisiPonudu(idPonude){
    const podaci = {
      idPonude: idPonude
    }

    return this.http.post(`${this.uri}/ponude/obrisiPonudu`, podaci);
  }

}
