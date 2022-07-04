import express from 'express';
import {KorisnikController} from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/dohvSveKorisnike').get(
    (req, res)=> new KorisnikController().dohvSveKorisnike(req, res)
);

korisnikRouter.route('/dohvRegistrovane').get(
    (req, res)=>new KorisnikController().dohvRegistrovane(req, res)
);

korisnikRouter.route('/dohvAgente').get(
    (req, res)=> new KorisnikController().dohvAgente(req, res)
);

korisnikRouter.route('/prijava').post(
    (req, res)=> new KorisnikController().prijava(req,res)
);

korisnikRouter.route('/registracija').post(
    (req, res)=> new KorisnikController().registracija(req,res)
);

korisnikRouter.route('/dohvKorisnika').post(
    (req,res)=> new KorisnikController().dohvKorisnika(req,res)
);

korisnikRouter.route('/dohvAdmina').get(
    (req,res)=> new KorisnikController().dohvAdmina(req, res)
);

korisnikRouter.route('/novaLozinka').post(
    (req, res)=>new KorisnikController().novaLozinka(req, res)
);

korisnikRouter.route('/proveriMail').post(
    (req,res)=> new KorisnikController().proveriMail(req, res)
);

korisnikRouter.route('/azurirajIme').post(
    (req, res)=> new KorisnikController().azurirajIme(req, res)
);

korisnikRouter.route('/azurirajPrezime').post(
    (req, res)=> new KorisnikController().azurirajPrezime(req, res)
);

korisnikRouter.route('/azurirajKorIme').post(
    (req, res)=> new KorisnikController().azurirajKorIme(req, res)
);

korisnikRouter.route('/azurirajMail').post(
  (req, res)=>new KorisnikController().azurirajMail(req, res)  
);

korisnikRouter.route('/azurirajGrad').post(
    (req, res)=> new KorisnikController().azurirajGrad(req, res)
);

korisnikRouter.route('/azurirajDrzavu').post(
    (req, res)=> new KorisnikController().azurirajDrzavu(req, res)
);

korisnikRouter.route('/azurirajSliku').post(
    (req, res)=> new KorisnikController().azurirajSliku(req, res)
);

korisnikRouter.route('/obrisiKorisnika').post(
    (req, res)=> new KorisnikController().obrisiKorisnika(req, res)
);

korisnikRouter.route('/blokiraj').post(
    (req, res) => new KorisnikController().blokiraj(req, res)
)

korisnikRouter.route('/odblokiraj').post(
    (req, res) => new KorisnikController().odblokiraj(req, res)
)

korisnikRouter.route('/dohvMojeBlokirane').post(
    (req, res) => new KorisnikController().dohvMojeBlokirane(req, res)
)

korisnikRouter.route('/dohvMojeZabranjene').post(
    (req, res) => new KorisnikController().dohvMojeZabranjene(req, res)
)

korisnikRouter.route('/daLiSuBlokirani').post(
    (req, res) => new KorisnikController().daLiSuBlokirani(req, res)
)

export default korisnikRouter;