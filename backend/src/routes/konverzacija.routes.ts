import express from 'express';
import {KonverzacijaController} from '../controllers/konverzacija.controller';

const konverzacijaRouter = express.Router();

konverzacijaRouter.route('/dohvKonverzacijeZaPonudjaca').post(
    (req, res) => new KonverzacijaController().dohvKonverzacijeZaPonudjaca(req, res)
)

konverzacijaRouter.route('/dohvKonverzacijeZaVlasnika').post(
    (req, res) => new KonverzacijaController().dohvKonverzacijeZaVlasnika(req, res)
)

konverzacijaRouter.route('/zapocniKonverzaciju').post(
    (req, res) => new KonverzacijaController().zapocniKonverzaciju(req, res)
)

konverzacijaRouter.route('/dohvMaxId').get(
    (req, res) => new KonverzacijaController().dohvMaxId(req, res)
)

konverzacijaRouter.route('/dodajPoruku').post(
    (req, res) =>new KonverzacijaController().dodajPoruku(req, res)
)

konverzacijaRouter.route('/dohvKonverzaciju').post(
    (req, res) => new KonverzacijaController().dohvKonverzaciju(req, res)
)

konverzacijaRouter.route('/arhiviraj').post(
    (req, res) => new KonverzacijaController().arhiviraj(req, res)
)

konverzacijaRouter.route('/dearhiviraj').post(
    (req, res) => new KonverzacijaController().dearhiviraj(req, res)
)

konverzacijaRouter.route('/citaj').post(
    (req, res) => new KonverzacijaController().citaj(req, res)
)

konverzacijaRouter.route('/dohvArhiviraneKonverzacijeZaVlasnika').post(
    (req, res) => new KonverzacijaController().dohvArhiviraneKonverzacijeZaVlasnika(req, res)
)

konverzacijaRouter.route('/dohvArhiviraneKonverzacijeZaPonudjaca').post(
    (req, res) => new KonverzacijaController().dohvArhiviraneKonverzacijeZaPonudjaca(req, res)
)

konverzacijaRouter.route('/dohvKonverzacijeZaAgenciju').get(
    (req, res) => new KonverzacijaController().dohvKonverzacijeZaAgenciju(req, res)
)

konverzacijaRouter.route('/dodajPonudu').post(
    (req,res) => new KonverzacijaController().dodajPonudu(req, res)
)

konverzacijaRouter.route('/obrisiPonuduZaNekretninu').post(
    (req,res) => new KonverzacijaController().obrisiPonuduZaNekretninu(req, res)    
)

konverzacijaRouter.route('/obrisiPonuduZaKonverzaciju').post(
    (req, res) => new KonverzacijaController().obrisiPonuduZaKonverzaciju(req, res)
)

export default konverzacijaRouter;