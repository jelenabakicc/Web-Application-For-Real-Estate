import express from 'express';
import { NekretninaController } from '../controllers/nekretnina.controller';

const nekretninaRouter = express.Router();

    nekretninaRouter.route('/dohvSveNekretnine').get(
        (req, res) => new NekretninaController().dohvSveNekretnine(req, res)
    );

    nekretninaRouter.route('/dohvPromovisane').get(
        (req, res) => new NekretninaController().dohvPromovisane(req, res)
    );

    nekretninaRouter.route('/dohvNepromovisane').get(
        (req, res) => new NekretninaController().dohvNepromovisane(req, res)
    );

    nekretninaRouter.route('/dohvOdobrene').get(
        (req, res) => new NekretninaController().dohvOdobrene(req, res)
    );

    nekretninaRouter.route('/dohvNeodobrene').get(
        (req, res) => new NekretninaController().dohvNeodobrene(req, res)
    );

    nekretninaRouter.route('/dohvMaxId').get(
        (req, res) => new NekretninaController().dohvMaxId(req, res)
    );

    nekretninaRouter.route('/dodajNekretninuK').post(
        (req, res)=> new NekretninaController().dodajNekretninuK(req, res)
    );

    nekretninaRouter.route('/dodajNekretninuA').post(
        (req, res)=> new NekretninaController().dodajNekretninuA(req, res)
    );

    nekretninaRouter.route('/odobriNekretninu').post(
        (req, res)=> new NekretninaController().odobriNekretninu(req, res)
    );

    nekretninaRouter.route('/obrisiNekretninu').post(
        (req, res)=> new NekretninaController().obrisiNekretninu(req, res)
    );

    nekretninaRouter.route('/promovisiNekretninu').post(
        (req, res)=> new NekretninaController().promovisiNekretninu(req, res)
    );

    nekretninaRouter.route('/ukloniIzPromovisanih').post(
        (req, res)=> new NekretninaController().ukloniIzPromovisanih(req, res)
    );

    nekretninaRouter.route('/dohvNekretnineZaKorisnika').post(
        (req, res)=> new NekretninaController().dohvNekretnineZaKorisnika(req, res)
    );

    nekretninaRouter.route('/azurirajNaziv').post(
        (req, res) => new NekretninaController().azurirajNaziv(req, res)  
    );

    nekretninaRouter.route('/azurirajGrad').post(
        (req, res) => new NekretninaController().azurirajGrad(req, res)
    );

    nekretninaRouter.route('/azurirajOpstinu').post(
        (req, res) => new NekretninaController().azurirajOpstinu(req, res)
    );

    nekretninaRouter.route('/azurirajUlicu').post(
        (req, res) => new NekretninaController().azurirajUlicu(req, res)
    );

    nekretninaRouter.route('/azurirajBroj').post(
        (req, res) => new NekretninaController().azurirajBroj(req, res)
    );

    nekretninaRouter.route('/azurirajTip').post(
        (req, res) => new NekretninaController().azurirajTip(req, res)
    );

    nekretninaRouter.route('/azurirajSprat').post(
        (req, res) => new NekretninaController().azurirajSprat(req, res)
    );

    nekretninaRouter.route('/azurirajZgradu').post(
        (req, res) => new NekretninaController().azurirajZgradu(req, res)
    );

    nekretninaRouter.route('/azurirajKvadraturu').post(
        (req, res) => new NekretninaController().azurirajKvadraturu(req, res)
    );

    nekretninaRouter.route('/azurirajBrSoba').post(
        (req, res) => new NekretninaController().azurirajBrSoba(req, res)
    );

    nekretninaRouter.route('/azurirajNamestena').post(
        (req, res) => new NekretninaController().azurirajNamestena(req, res)
    );

    nekretninaRouter.route('/azurirajNamenu').post(
        (req, res) => new NekretninaController().azurirajNamenu(req, res)
    );

    nekretninaRouter.route('/azurirajCenu').post(
        (req, res) => new NekretninaController().azurirajCenu(req, res)
    );
    
    nekretninaRouter.route('/azurirajGaleriju').post(
        (req, res) => new NekretninaController().azurirajGaleriju(req, res)
    );

    nekretninaRouter.route('/pretraziNekretnineZaGrad').post(
        (req, res) => new NekretninaController().pretraziNekretnineZaGrad(req, res)
    );

    nekretninaRouter.route('/pretraziCenaOd').post(
        (req, res) => new NekretninaController().pretraziCenaOd(req, res)
    );

    nekretninaRouter.route('/pretraziCenaDo').post(
        (req, res) => new NekretninaController().pretraziCenaDo(req, res)
    );

    nekretninaRouter.route('/pretraziGradCenaOd').post(
        (req, res) => new NekretninaController().pretraziGradCenaOd(req, res)
    );

    nekretninaRouter.route('/pretraziGradCenaDo').post(
        (req, res) => new NekretninaController().pretraziGradCenaDo(req, res)
    );

    nekretninaRouter.route('/pretraziCenaOdDo').post(
        (req, res) => new NekretninaController().pretraziCenaOdDo(req, res)
    );

    nekretninaRouter.route('/pretraziGradCena').post(
        (req, res) => new NekretninaController().pretraziGradCena(req, res)
    );

    nekretninaRouter.route('/dohvPoId').post(
        (req, res) => new NekretninaController().dohvPoId(req, res)
    );

    nekretninaRouter.route('/dohvSpecNekretnine').post(
        (req, res) => new NekretninaController().dohvSpecNekretnine(req, res)
    );

    nekretninaRouter.route('/dohvNekretnineZaGrad').post(
        (req, res) => new NekretninaController().dohvNekretnineZaGrad(req, res)
    );

    nekretninaRouter.route('/dohvNekretnineOdKorisnika').get(
        (req, res) => new NekretninaController().dohvNekretnineOdKorisnika(req, res)
    )
    
export default nekretninaRouter;