"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const blokirani_1 = __importDefault(require("../models/blokirani"));
class KorisnikController {
    constructor() {
        this.dohvSveKorisnike = (req, res) => {
            korisnik_1.default.find({}, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.dohvRegistrovane = (req, res) => {
            korisnik_1.default.find({ 'tip': 'Registrovani' }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.dohvAgente = (req, res) => {
            korisnik_1.default.find({ 'tip': 'Radnik' }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.prijava = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.findOne({ 'kor_ime': kor_ime }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.registracija = (req, res) => {
            let korisnik = new korisnik_1.default(req.body);
            korisnik.save().then((korisnik) => {
                res.status(200).json({ 'message': 'korisnik je dodat' });
            }).catch((err) => {
                res.status(400).json({ 'message': err });
            });
        };
        this.dohvKorisnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.findOne({ 'kor_ime': kor_ime }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.dohvAdmina = (req, res) => {
            korisnik_1.default.findOne({ 'tip': 'Admin' }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'vec postoji admin' });
            });
        };
        this.novaLozinka = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'lozinka': lozinka } }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.proveriMail = (req, res) => {
            let mail = req.body.mail;
            korisnik_1.default.find({ 'email': mail }, (err, k) => {
                if (err)
                    console.log(err);
                else if (k.length == 0) {
                    res.json({ 'poruka': 'ok' });
                    console.log('pronasao sam mail');
                }
                else {
                    res.json({ 'poruka': 'nije ok' });
                }
            });
        };
        this.azurirajIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let ime = req.body.ime;
            korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'ime': ime } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajPrezime = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let prezime = req.body.prezime;
            korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'prezime': prezime } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajKorIme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let novo_kor_ime = req.body.novo_kor_ime;
            //TREBA PROVERITI DA LI VEC POSTOJI KOR IME
            korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'kor_ime': novo_kor_ime } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajMail = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let mail = req.body.mail;
            korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'email': mail } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajGrad = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let grad = req.body.grad;
            korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'grad': grad } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajDrzavu = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let drzava = req.body.drzava;
            korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'drzava': drzava } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajSliku = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let nazivSlike = req.body.nazivSlike;
            korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $set: { 'slika': nazivSlike } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.obrisiKorisnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            korisnik_1.default.collection.deleteOne({ 'kor_ime': kor_ime }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.blokiraj = (req, res) => {
            let blokirani = new blokirani_1.default(req.body);
            blokirani.save().then((blokirani) => {
                res.status(200).json({ 'message': 'korisnik je dodat' });
            }).catch((err) => {
                res.status(400).json({ 'message': err });
            });
        };
        this.odblokiraj = (req, res) => {
            let blokirani = req.body.blokirani;
            let blokirao = req.body.blokirao;
            blokirani_1.default.collection.deleteOne({ 'blokirao': blokirao, 'blokirani': blokirani });
        };
        this.dohvMojeBlokirane = (req, res) => {
            let blokirao = req.body.blokirao;
            blokirani_1.default.find({ 'blokirao': blokirao }, (err, b) => {
                if (err)
                    console.log(err);
                else
                    res.json(b);
            });
        };
        this.dohvMojeZabranjene = (req, res) => {
            let blokirani = req.body.blokirani;
            blokirani_1.default.find({ 'blokirani': blokirani }, (err, b) => {
                if (err)
                    console.log(err);
                else
                    res.json(b);
            });
        };
        this.daLiSuBlokirani = (req, res) => {
            let blokirani = req.body.blokirani;
            let blokirao = req.body.blokirao;
            blokirani_1.default.find({ 'blokirao': blokirao, 'blokirani': blokirani }, (err, b) => {
                if (err)
                    console.log(err);
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map