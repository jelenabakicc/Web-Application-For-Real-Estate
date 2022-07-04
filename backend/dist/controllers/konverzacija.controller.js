"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KonverzacijaController = void 0;
const konverzacija_1 = __importDefault(require("../models/konverzacija"));
class KonverzacijaController {
    constructor() {
        this.dohvKonverzacijeZaVlasnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            konverzacija_1.default.find({ 'vlasnik': kor_ime, 'arhivirana': false }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.dohvKonverzacijeZaPonudjaca = (req, res) => {
            let kor_ime = req.body.kor_ime;
            konverzacija_1.default.find({ 'nudi': kor_ime, 'arhivirana': false }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.dohvKonverzacijeZaAgenciju = (req, res) => {
            konverzacija_1.default.find({ 'arhivirana': false, 'vlasnik': 'Agencija' }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.dohvArhiviraneKonverzacijeZaVlasnika = (req, res) => {
            let kor_ime = req.body.kor_ime;
            konverzacija_1.default.find({ 'vlasnik': kor_ime, 'arhivirana': true }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.dohvArhiviraneKonverzacijeZaPonudjaca = (req, res) => {
            let kor_ime = req.body.kor_ime;
            konverzacija_1.default.find({ 'nudi': kor_ime, 'arhivirana': true }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.zapocniKonverzaciju = (req, res) => {
            let konverzacija = new konverzacija_1.default(req.body);
            konverzacija.save().then((konverzacija) => {
                res.status(200).json({ 'message': 'konverzacija je dodata' });
            }).catch((err) => {
                res.status(400).json({ 'message': err });
            });
        };
        this.dohvMaxId = (req, res) => {
            konverzacija_1.default.findOne().sort({ "idKonverzacije": "desc" }).exec((err, elem) => {
                if (err)
                    console.log(err);
                else
                    res.json(elem);
            });
        };
        this.dodajPoruku = (req, res) => {
            let idKonverzacije = req.body.idKonverzacije;
            let datum = req.body.datumSlanja;
            konverzacija_1.default.collection.updateOne({ 'idKonverzacije': idKonverzacije }, { $push: { 'poruke': req.body.poruka } });
            konverzacija_1.default.collection.updateOne({ 'idKonverzacije': idKonverzacije }, { $set: { 'poslednjaDatum': datum, 'poslednjaProcitana': false } });
            res.json({ 'message': 'poruka je dodata' });
        };
        this.dohvKonverzaciju = (req, res) => {
            let idKonverzacije = req.body.idKonverzacije;
            konverzacija_1.default.findOne({ 'idKonverzacije': idKonverzacije }, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.citaj = (req, res) => {
            let idKonverzacije = req.body.idKonverzacije;
            konverzacija_1.default.collection.updateOne({ 'idKonverzacije': idKonverzacije, 'poruke.procitana': false }, { $set: { 'poslednjaProcitana': true, 'poruke.$.procitana': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.arhiviraj = (req, res) => {
            let idKonverzacije = req.body.idKonverzacije;
            konverzacija_1.default.collection.updateOne({ 'idKonverzacije': idKonverzacije }, { $set: { 'arhivirana': true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.dearhiviraj = (req, res) => {
            let idKonverzacije = req.body.idKonverzacije;
            konverzacija_1.default.collection.updateOne({ 'idKonverzacije': idKonverzacije }, { $set: { 'arhivirana': false } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.dodajPonudu = (req, res) => {
            let idKonverzacije = req.body.idKonverzacije;
            konverzacija_1.default.collection.updateOne({ 'idKonverzacije': idKonverzacije }, { $set: { 'imaPonudu': true } }, resp => {
                res.json({ 'message': 'ponuda je dodata' });
            });
        };
        this.obrisiPonuduZaNekretninu = (req, res) => {
            let idNekretnine = req.body.idNekretnine;
            konverzacija_1.default.collection.updateOne({ 'idNekretnine': idNekretnine }, { $set: { 'imaPonudu': false } }, resp => {
                res.json({ 'message': 'ok' });
            });
        };
        this.obrisiPonuduZaKonverzaciju = (req, res) => {
            let idKonverzacije = req.body.idKonverzacije;
            konverzacija_1.default.collection.updateOne({ 'idKonverzacije': idKonverzacije }, { $set: { 'imaPonudu': false } }, resp => {
                res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.KonverzacijaController = KonverzacijaController;
//# sourceMappingURL=konverzacija.controller.js.map