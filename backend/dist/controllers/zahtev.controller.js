"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZahtevController = void 0;
const zahtev_1 = __importDefault(require("../models/zahtev"));
class ZahtevController {
    constructor() {
        this.registracija = (req, res) => {
            let zahtev = new zahtev_1.default(req.body);
            zahtev.save().then((zahtev) => {
                res.status(200).json({ 'message': 'zahtev je dodat' });
            }).catch((err) => {
                res.status(400).json({ 'message': err });
            });
        };
        this.dohvSveZahteve = (req, res) => {
            zahtev_1.default.find({}, (err, z) => {
                if (err)
                    console.log(err);
                else
                    res.json(z);
            });
        };
        this.odbij = (req, res) => {
            let kor_ime = req.body.kor_ime;
            zahtev_1.default.collection.deleteOne({ 'kor_ime': kor_ime }, resp => {
                res.json({ 'poruka': 'ok' });
            });
        };
        this.dodaj = (req, res) => {
            let kor_ime = req.body.kor_ime;
            zahtev_1.default.collection.deleteOne({ 'kor_ime': kor_ime }, resp => {
                res.json({ 'poruka': 'ok' });
            });
        };
    }
}
exports.ZahtevController = ZahtevController;
//# sourceMappingURL=zahtev.controller.js.map