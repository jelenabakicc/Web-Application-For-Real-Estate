import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NekretnineService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvSveNekretnine(){

    return this.http.get(`${this.uri}/nekretnina/dohvSveNekretnine`);
  }

  dohvPoId(id){
    const podaci={
      id: id
    }

    return this.http.post(`${this.uri}/nekretnina/dohvPoId`,podaci);
  }

  dohvPromovisane(){

    return this.http.get(`${this.uri}/nekretnina/dohvPromovisane`);
  }

  dohvNepromovisane(){

    return this.http.get(`${this.uri}/nekretnina/dohvNepromovisane`);
  }

  dohvNeodobrene(){

    return this.http.get(`${this.uri}/nekretnina/dohvNeodobrene`);
  }

  dohvOdobrene(){

    return this.http.get(`${this.uri}/nekretnina/dohvOdobrene`);
  }

  dohvMaxId(){

    return this.http.get(`${this.uri}/nekretnina/dohvMaxId`);
  }

  dodajNekretninuK(id, naziv, grad, opstina, ulica, broj, tip, sprat, zgrada, kvadratura,
    br_soba, namestena, galerija, namena, cena, vlasnik, odobrena, promovisana){

      const podaci = {
        id: id,
        naziv: naziv,
        grad: grad,
        opstina: opstina,
        ulica: ulica,
        broj: broj,
        tip: tip,
        sprat: sprat,
        zgrada: zgrada,
        kvadratura: kvadratura,
        br_soba: br_soba,
        namestena: namestena,
        galerija: galerija,
        namena: namena,
        cena: cena,
        vlasnik: vlasnik,
        odobrena: odobrena,
        promovisana: promovisana
      }

      return this.http.post(`${this.uri}/nekretnina/dodajNekretninuK`, podaci);
  }

  dodajNekretninuA(id, naziv, grad, opstina, ulica, broj, tip, sprat, zgrada, kvadratura,
    br_soba, namestena, galerija, namena, cena, vlasnik, odobrena, promovisana){

      const podaci = {
        id: id,
        naziv: naziv,
        grad: grad,
        opstina: opstina,
        ulica: ulica,
        broj: broj,
        tip: tip,
        sprat: sprat,
        zgrada: zgrada,
        kvadratura: kvadratura,
        br_soba: br_soba,
        namestena: namestena,
        galerija: galerija,
        namena: namena,
        cena: cena,
        vlasnik: vlasnik,
        odobrena: odobrena,
        promovisana: promovisana
      }

      return this.http.post(`${this.uri}/nekretnina/dodajNekretninuA`, podaci);

  }

  odobriNekretninu(id){
    const podaci = {
      id: id
    }

    return this.http.post(`${this.uri}/nekretnina/odobriNekretninu`, podaci);
  }

  obrisiNekretninu(id){
    const podaci = {
      id: id
    }

    return this.http.post(`${this.uri}/nekretnina/obrisiNekretninu`, podaci);
  }

  promovisiNekretninu(id){
    const podaci = {
      id: id
    }

    return this.http.post(`${this.uri}/nekretnina/promovisiNekretninu`, podaci);
  }

  ukloniIzPromovisanih(id){
    const podaci = {
      id: id
    }

    return this.http.post(`${this.uri}/nekretnina/ukloniIzPromovisanih`, podaci);
  }

  uploadFiles(files: File[]){
    const uploadData = new FormData();
    for (let file of files){
      uploadData.append('files', file, file.name);
    }
    return this.http.post(`${this.uri}/uploadFiles`, uploadData)
  }

  dohvNekretnineZaKorisnika(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }

    return this.http.post(`${this.uri}/nekretnina/dohvNekretnineZaKorisnika`, podaci);
  }

  azurirajNaziv(id, naziv){
    const podaci = {
      id: id,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajNaziv`, podaci);
  }

  azurirajGrad(id, grad){
    const podaci = {
      id: id,
      grad: grad
    }
  
    return this.http.post(`${this.uri}/nekretnina/azurirajGrad`, podaci);
  }

  azurirajOpstinu(id, opstina){
    const podaci = {
      id: id,
      opstina: opstina
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajOpstinu`, podaci);
  }
  
  azurirajUlicu(id, ulica){
    const podaci = {
      id: id,
      ulica: ulica
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajUlicu`, podaci);
  }

  azurirajBroj(id, broj){
    const podaci = {
      id: id,
      broj: broj
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajBroj`, podaci);
  }

  azurirajTip(id, tip){
    const podaci = {
      id: id,
      tip: tip
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajTip`, podaci);
  }

  azurirajSprat(id, sprat){
    const podaci = {
      id: id,
      sprat: sprat
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajSprat`, podaci);
  }

  azurirajZgradu(id, zgrada){
    const podaci = {
      id: id,
      zgrada: zgrada
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajZgradu`, podaci);
  }

  azurirajKvadraturu(id, kvadratura){
    const podaci ={
      id: id,
      kvadratura: kvadratura
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajKvadraturu`, podaci);
  }

  azurirajBrSoba(id, br_soba){
    const podaci = {
      id: id,
      br_soba: br_soba
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajBrSoba`, podaci);
  }

  azurirajNamestena(id, namestena){
    const podaci = {
      id: id,
      namestena: namestena
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajNamestena`, podaci);
  }

  azurirajGaleriju(id, galerija){
    const podaci = {
      id: id,
      galerija: galerija
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajGaleriju`, podaci);
  }

  azurirajNamenu(id, namena){
    const podaci = {
      id: id,
      namena: namena
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajNamenu`, podaci);
  }

  azurirajCenu(id, cena){ 
    const podaci = {
      id: id,
      cena: cena
    }

    return this.http.post(`${this.uri}/nekretnina/azurirajCenu`, podaci);

  }

  pretraziNekretnineZaGrad(grad){
    const podaci = {
      grad: grad
    }

    return this.http.post(`${this.uri}/nekretnina/pretraziNekretnineZaGrad`,podaci);
    
  }

  pretraziCenaOd(cenaOd){
    const podaci = {
      cenaOd:cenaOd
    }

    return this.http.post(`${this.uri}/nekretnina/pretraziCenaOd`, podaci);
  }

  pretraziCenaDo(cenaDo){
    const podaci = {
      cenaDo: cenaDo
    }

    return this.http.post(`${this.uri}/nekretnina/pretraziCenaDo`, podaci);
  }

  pretraziGradCenaOd(grad, cenaOd){
    const podaci = {
      grad: grad,
      cenaOd: cenaOd
    }

    return this.http.post(`${this.uri}/nekretnina/pretraziGradCenaOd`, podaci);
  }

  pretraziGradCenaDo(grad, cenaDo){
    const podaci = {
      grad: grad,
      cenaDo: cenaDo
    }

    return this.http.post(`${this.uri}/nekretnina/pretraziGradCenaDo`, podaci);
  }

  pretraziCenaOdDo(cenaOd, cenaDo){
    const podaci = {
      cenaOd:cenaOd,
      cenaDo: cenaDo
    }

    return this.http.post(`${this.uri}/nekretnina/pretraziCenaOdDo`, podaci);
  }

  pretraziGradCena(grad, cenaOd, cenaDo){
    const podaci = {
      grad: grad,
      cenaOd:cenaOd,
      cenaDo: cenaDo
    }

    return this.http.post(`${this.uri}/nekretnina/pretraziGradCena`, podaci);
  }
  
  dohvSpecNekretnine(tip, namena){
    const podaci = {
      tip: tip,
      namena: namena
    }

    return this.http.post(`${this.uri}/nekretnina/dohvSpecNekretnine`, podaci);
  }

  dohvNekretnineZaGrad(grad){
    const podaci ={
      grad: grad
    }

    return this.http.post(`${this.uri}/nekretnina/dohvNekretnineZaGrad`, podaci);
  }

  dohvNekretnineOdKorisnika(){
    return this.http.get(`${this.uri}/nekretnina/dohvNekretnineOdKorisnika`);
  }
}
