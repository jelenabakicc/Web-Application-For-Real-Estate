import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvSveKorisnike(){
    return this.http.get(`${this.uri}/korisnik/dohvSveKorisnike`);
  }

  dohvRegistrovane(){
    return this.http.get(`${this.uri}/korisnik/dohvRegistrovane`);
  }

  dohvAgente(){
    return this.http.get(`${this.uri}/korisnik/dohvAgente`);
  }

  prijava(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }
  
    return this.http.post(`${this.uri}/korisnik/prijava`, podaci);
  }

  dohvKorisnika(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/korisnik/dohvKorisnika`, podaci);
  }

  dohvAdmina(){
    return this.http.get(`${this.uri}/korisnik/dohvAdmina`);
  }

  proveriMail(mail){
    const podaci = {
      mail:mail
    }

    return this.http.post(`${this.uri}/korisnik/proveriMail`, podaci);
  }

  novaLozinka(kor_ime, lozinka){
    const podaci = {
      kor_ime: kor_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnik/novaLozinka`, podaci);
  }

  registracija(ime,prezime,kor_ime,lozinka,email,grad,drzava,slika,tip){
    const podaci = {
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      email: email,
      grad: grad,
      drzava: drzava,
      slika: slika,
      tip: tip
    }

    return this.http.post(`${this.uri}/korisnik/registracija`, podaci);
  }

  uploadPhoto(photo: File){
    const uploadData = new FormData();
    uploadData.append('file', photo,photo.name);
    return this.http.post(`${this.uri}/uploadPhoto`, uploadData);
     
  }

  downloadPhoto(photo){
    const podaci = {
      photo: photo
    }

    return this.http.post(`${this.uri}/downloadPhoto`, podaci, {responseType: "blob"});
  }

  azurirajIme(kor_ime, ime){
    const podaci = {
      kor_ime: kor_ime,
      ime: ime
    }

    return this.http.post(`${this.uri}/korisnik/azurirajIme`, podaci);
  }

  azurirajPrezime(kor_ime, prezime){
    const podaci = {
      kor_ime: kor_ime,
      prezime: prezime
    }

    return this.http.post(`${this.uri}/korisnik/azurirajPrezime`, podaci);
  }

  azurirajMail(kor_ime, mail){
    const podaci = {
      kor_ime: kor_ime,
      mail: mail
    }

    return this.http.post(`${this.uri}/korisnik/azurirajMail`, podaci);
  }

  azurirajGrad(kor_ime, grad){
    const podaci = {
      kor_ime: kor_ime,
      grad: grad
    }

    return this.http.post(`${this.uri}/korisnik/azurirajGrad`, podaci);    
  }

  azurirajDrzavu(kor_ime, drzava){
    const podaci = {
      kor_ime: kor_ime,
      drzava: drzava
    }

    return this.http.post(`${this.uri}/korisnik/azurirajDrzavu`, podaci);
  }

  azurirajSliku(kor_ime, nazivSlike){
    const podaci = {
      kor_ime: kor_ime,
      nazivSlike: nazivSlike
    }

    return this.http.post(`${this.uri}/korisnik/azurirajSliku`, podaci);
  }

  obrisiKorisnika(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/korisnik/obrisiKorisnika`, podaci);
  }

  blokiraj(blokirao, blokirani){
    const podaci = {
      blokirao: blokirao,
      blokirani: blokirani
    }

    return this.http.post(`${this.uri}/korisnik/blokiraj`, podaci);
  }

  odblokiraj(blokirao, blokirani){
    const podaci = {
      blokirao: blokirao,
      blokirani: blokirani
    }

    return this.http.post(`${this.uri}/korisnik/odblokiraj`, podaci);
  }

  dohvMojeBlokirane(blokirao){
    const podaci = {
      blokirao: blokirao
    }

    return this.http.post(`${this.uri}/korisnik/dohvMojeBlokirane`, podaci);
  }

  dohvMojeZabranjene(blokirani){
    const podaci = {
      blokirani: blokirani
    }

    return this.http.post(`${this.uri}/korisnik/dohvMojeZabranjene`, podaci);
  }

  daLiSuBlokirani(blokirao, blokirani){
    const podaci = {
      blokirao: blokirao,
      blokirani: blokirani
    }

    return this.http.post(`${this.uri}/korisnik/daLiSuBlokirani`, podaci);
  }
}

