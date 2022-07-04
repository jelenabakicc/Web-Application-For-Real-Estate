"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PonudaController = void 0;
const ponuda_1 = __importDefault(require("../models/ponuda"));
class PonudaController {
    constructor() {
        this.dohvSvePonude = (req, res) => {
            ponuda_1.default.find({}, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dohvatiPonudeZaVlasnika = (req, res) => {
            let vlasnik = req.body.vlasnik;
            ponuda_1.default.find({ 'vlasnik': vlasnik }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dohvatiPonuduPoId = (req, res) => {
            let idPonude = req.body.idPonude;
            ponuda_1.default.findOne({ 'idPonude': idPonude }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dodajPonudu = (req, res) => {
            let ponuda = new ponuda_1.default(req.body);
            ponuda.save().then((ponuda) => {
                res.status(200).json({ 'message': 'ponuda je dodata' });
            }).catch((err) => {
                res.status(400).json({ 'message': err });
            });
        };
        this.dohvNeodobrene = (req, res) => {
            ponuda_1.default.find({ 'status': 'N' }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dohvPrihvacene = (req, res) => {
            ponuda_1.default.find({ 'status': 'P' }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dohvOdobrene = (req, res) => {
            ponuda_1.default.find({ 'status': 'O' }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dohvPonudeZaNekretninu = (req, res) => {
            let idNekretnine = req.body.idNekretnine;
            ponuda_1.default.find({ 'idNekretnine': idNekretnine }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dohvOdobrenePonudeZaNekretninu = (req, res) => {
            let idNekretnine = req.body.idNekretnine;
            ponuda_1.default.find({ 'idNekretnine': idNekretnine, 'status': 'O' }, (err, p) => {
                if (err)
                    console.log(err);
                else
                    res.json(p);
            });
        };
        this.dohvMaxId = (req, res) => {
            ponuda_1.default.findOne().sort({ "idPonude": "desc" }).exec((err, elem) => {
                if (err)
                    console.log(err);
                else
                    res.json(elem);
            });
        };
        this.odobriPonudu = (req, res) => {
            let idPonude = req.body.idPonude;
            ponuda_1.default.collection.updateOne({ "idPonude": idPonude }, { $set: { 'status': 'O' } }, (resp) => {
                res.json({ 'message': 'ok' });
            });
        };
        this.prihvatiPonudu = (req, res) => {
            let idPonude = req.body.idPonude;
            ponuda_1.default.collection.updateOne({ "idPonude": idPonude }, { $set: { 'status': 'P' } }, (resp) => {
                res.json({ 'message': 'ok' });
            });
        };
        this.obrisiPonudu = (req, res) => {
            let idPonude = req.body.idPonude;
            ponuda_1.default.collection.deleteOne({ "idPonude": idPonude }, (resp) => {
                res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.PonudaController = PonudaController;
//# sourceMappingURL=ponude.controller.js.map