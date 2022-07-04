"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const konverzacija_controller_1 = require("../controllers/konverzacija.controller");
const konverzacijaRouter = express_1.default.Router();
konverzacijaRouter.route('/dohvKonverzacijeZaPonudjaca').post((req, res) => new konverzacija_controller_1.KonverzacijaController().dohvKonverzacijeZaPonudjaca(req, res));
konverzacijaRouter.route('/dohvKonverzacijeZaVlasnika').post((req, res) => new konverzacija_controller_1.KonverzacijaController().dohvKonverzacijeZaVlasnika(req, res));
konverzacijaRouter.route('/zapocniKonverzaciju').post((req, res) => new konverzacija_controller_1.KonverzacijaController().zapocniKonverzaciju(req, res));
konverzacijaRouter.route('/dohvMaxId').get((req, res) => new konverzacija_controller_1.KonverzacijaController().dohvMaxId(req, res));
konverzacijaRouter.route('/dodajPoruku').post((req, res) => new konverzacija_controller_1.KonverzacijaController().dodajPoruku(req, res));
konverzacijaRouter.route('/dohvKonverzaciju').post((req, res) => new konverzacija_controller_1.KonverzacijaController().dohvKonverzaciju(req, res));
konverzacijaRouter.route('/arhiviraj').post((req, res) => new konverzacija_controller_1.KonverzacijaController().arhiviraj(req, res));
konverzacijaRouter.route('/dearhiviraj').post((req, res) => new konverzacija_controller_1.KonverzacijaController().dearhiviraj(req, res));
konverzacijaRouter.route('/citaj').post((req, res) => new konverzacija_controller_1.KonverzacijaController().citaj(req, res));
konverzacijaRouter.route('/dohvArhiviraneKonverzacijeZaVlasnika').post((req, res) => new konverzacija_controller_1.KonverzacijaController().dohvArhiviraneKonverzacijeZaVlasnika(req, res));
konverzacijaRouter.route('/dohvArhiviraneKonverzacijeZaPonudjaca').post((req, res) => new konverzacija_controller_1.KonverzacijaController().dohvArhiviraneKonverzacijeZaPonudjaca(req, res));
konverzacijaRouter.route('/dohvKonverzacijeZaAgenciju').get((req, res) => new konverzacija_controller_1.KonverzacijaController().dohvKonverzacijeZaAgenciju(req, res));
konverzacijaRouter.route('/dodajPonudu').post((req, res) => new konverzacija_controller_1.KonverzacijaController().dodajPonudu(req, res));
konverzacijaRouter.route('/obrisiPonuduZaNekretninu').post((req, res) => new konverzacija_controller_1.KonverzacijaController().obrisiPonuduZaNekretninu(req, res));
konverzacijaRouter.route('/obrisiPonuduZaKonverzaciju').post((req, res) => new konverzacija_controller_1.KonverzacijaController().obrisiPonuduZaKonverzaciju(req, res));
exports.default = konverzacijaRouter;
//# sourceMappingURL=konverzacija.routes.js.map