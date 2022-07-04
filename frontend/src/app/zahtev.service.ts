import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  registracija(ime,prezime,kor_ime,lozinka,lozinka2,email,grad,drzava,slika,tip){
    const podaci = {
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      lozinka2: lozinka2,
      email: email,
      grad: grad,
      drzava: drzava,
      slika: slika,
      tip: tip,
      odobren: 0
    }

    return this.http.post(`${this.uri}/zahtevi/registracija`, podaci);
  }

  dohvSveZahteve(){
    return this.http.get(`${this.uri}/zahtevi/dohvSveZahteve`);
  }

  odbij(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/zahtevi/odbij`, podaci);
  }

  dodaj(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/zahtevi/dodaj`, podaci);
  }
}
