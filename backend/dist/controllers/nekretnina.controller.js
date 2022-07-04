"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekretninaController = void 0;
const nekretnina_1 = __importDefault(require("../models/nekretnina"));
class NekretninaController {
    constructor() {
        this.dohvSveNekretnine = (req, res) => {
            nekretnina_1.default.find({}, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dohvPoId = (req, res) => {
            let id = req.body.id;
            nekretnina_1.default.findOne({ 'id': id }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dohvPromovisane = (req, res) => {
            nekretnina_1.default.find({ 'promovisana': 1, 'odobrena': 1 }, (err, p) => {
                if (err)
                    console.log(err);
                else {
                    res.json(p);
                }
            });
        };
        this.dohvNepromovisane = (req, res) => {
            nekretnina_1.default.find({ 'promovisana': 0, 'odobrena': 1 }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dohvNeodobrene = (req, res) => {
            nekretnina_1.default.find({ 'odobrena': 0 }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dohvOdobrene = (req, res) => {
            nekretnina_1.default.find({ 'odobrena': 1 }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dohvMaxId = (req, res) => {
            nekretnina_1.default.findOne().sort({ "id": "desc" }).exec((err, elem) => {
                if (err)
                    console.log(err);
                else
                    res.json(elem);
            });
            //PROVERI DA LI MOZE OVAKO
        };
        this.dodajNekretninuK = (req, res) => {
            let nekretnina = new nekretnina_1.default(req.body);
            nekretnina.save().then((nekretnina) => {
                res.status(200).json({ 'poruka': 'nekretnina je dodata' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.dodajNekretninuA = (req, res) => {
            let nekretnina = new nekretnina_1.default(req.body);
            nekretnina.save().then((nekretnina) => {
                res.status(200).json({ 'poruka': 'nekretnina je dodata' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.odobriNekretninu = (req, res) => {
            let id = req.body.id;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'odobrena': 1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.obrisiNekretninu = (req, res) => {
            let id = req.body.id;
            nekretnina_1.default.collection.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.promovisiNekretninu = (req, res) => {
            let id = req.body.id;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'promovisana': 1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.ukloniIzPromovisanih = (req, res) => {
            let id = req.body.id;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'promovisana': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.dohvNekretnineZaKorisnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            nekretnina_1.default.find({ 'vlasnik': kor_ime }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.azurirajNaziv = (req, res) => {
            let id = req.body.id;
            let naziv = req.body.naziv;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'naziv': naziv, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajGrad = (req, res) => {
            let id = req.body.id;
            let grad = req.body.grad;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'grad': grad, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajOpstinu = (req, res) => {
            let id = req.body.id;
            let opstina = req.body.opstina;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'opstina': opstina, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajUlicu = (req, res) => {
            let id = req.body.id;
            let ulica = req.body.ulica;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'ulica': ulica, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajBroj = (req, res) => {
            let id = req.body.id;
            let broj = req.body.broj;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'broj': broj, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajTip = (req, res) => {
            let id = req.body.id;
            let tip = req.body.tip;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'tip': tip, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajSprat = (req, res) => {
            let id = req.body.id;
            let sprat = req.body.sprat;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'sprat': sprat, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajZgradu = (req, res) => {
            let id = req.body.id;
            let zgrada = req.body.zgrada;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'zgrada': zgrada, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajKvadraturu = (req, res) => {
            let id = req.body.id;
            let kvadratura = req.body.kvadratura;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'kvadratura': kvadratura, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajBrSoba = (req, res) => {
            let id = req.body.id;
            let br_soba = req.body.br_soba;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'br_soba': br_soba, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajNamestena = (req, res) => {
            let id = req.body.id;
            let namestena = req.body.namestena;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'namestena': namestena, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajNamenu = (req, res) => {
            let id = req.body.id;
            let namena = req.body.namena;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'namena': namena, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajCenu = (req, res) => {
            let id = req.body.id;
            let cena = req.body.cena;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'cena': cena, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.azurirajGaleriju = (req, res) => {
            let id = req.body.id;
            let galerija = req.body.galerija;
            nekretnina_1.default.collection.updateOne({ 'id': id }, { $set: { 'galerija': galerija, 'promovisana': 0, 'odobrena': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.pretraziNekretnineZaGrad = (req, res) => {
            let grad = req.body.grad;
            nekretnina_1.default.find({ 'grad': grad }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.pretraziCenaOd = (req, res) => {
            let min = req.body.cenaOd;
            nekretnina_1.default.find({ 'cena': { $gt: min } }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.pretraziCenaDo = (req, res) => {
            let max = req.body.cenaDo;
            nekretnina_1.default.find({ 'cena': { $lt: max } }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.pretraziGradCenaOd = (req, res) => {
            let grad = req.body.grad;
            let min = req.body.cenaOd;
            nekretnina_1.default.find({ 'grad': grad, 'cena': { $gt: min } }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.pretraziGradCenaDo = (req, res) => {
            let grad = req.body.grad;
            let max = req.body.cenaDo;
            nekretnina_1.default.find({ 'grad': grad, 'cena': { $lt: max } }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.pretraziCenaOdDo = (req, res) => {
            let min = req.body.cenaOd;
            let max = req.body.cenaDo;
            nekretnina_1.default.find({ 'cena': { $gt: min, $lt: max } }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.pretraziGradCena = (req, res) => {
            let grad = req.body.grad;
            let min = req.body.cenaOd;
            let max = req.body.cenaDo;
            nekretnina_1.default.find({ 'grad': grad, 'cena': { $gt: min, $lt: max } }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dohvSpecNekretnine = (req, res) => {
            let tip = req.body.tip;
            let namena = req.body.namena;
            nekretnina_1.default.find({ 'tip': tip, 'namena': namena }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dohvNekretnineZaGrad = (req, res) => {
            let grad = req.body.grad;
            nekretnina_1.default.find({ 'grad': grad }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dohvNekretnineOdKorisnika = (req, res) => {
            nekretnina_1.default.find({ 'vlasnik': { $ne: 'Agencija' } }, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
    }
}
exports.NekretninaController = NekretninaController;
//# sourceMappingURL=nekretnina.controller.js.map