"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ponude_controller_1 = require("../controllers/ponude.controller");
const ponudeRouter = express_1.default.Router();
ponudeRouter.route('/dohvSvePonude').get((req, res) => new ponude_controller_1.PonudaController().dohvSvePonude(req, res));
ponudeRouter.route('/dohvatiPonudeZaVlasnika').post((req, res) => new ponude_controller_1.PonudaController().dohvatiPonudeZaVlasnika(req, res));
ponudeRouter.route('/dohvatiPonuduPoId').post((req, res) => new ponude_controller_1.PonudaController().dohvatiPonuduPoId(req, res));
ponudeRouter.route('/dohvNeodobrene').get((req, res) => new ponude_controller_1.PonudaController().dohvNeodobrene(req, res));
ponudeRouter.route('/dohvOdobrene').get((req, res) => new ponude_controller_1.PonudaController().dohvOdobrene(req, res));
ponudeRouter.route('/dohvPrihvacene').get((req, res) => new ponude_controller_1.PonudaController().dohvPrihvacene(req, res));
ponudeRouter.route('/dodajPonudu').post((req, res) => new ponude_controller_1.PonudaController().dodajPonudu(req, res));
ponudeRouter.route('/dohvPonudeZaNekretninu').post((req, res) => new ponude_controller_1.PonudaController().dohvPonudeZaNekretninu(req, res));
ponudeRouter.route('/dohvOdobrenePonudeZaNekretninu').post((req, res) => new ponude_controller_1.PonudaController().dohvOdobrenePonudeZaNekretninu(req, res));
ponudeRouter.route('/dohvMaxId').get((req, res) => new ponude_controller_1.PonudaController().dohvMaxId(req, res));
ponudeRouter.route('/odobriPonudu').post((req, res) => new ponude_controller_1.PonudaController().odobriPonudu(req, res));
ponudeRouter.route('/prihvatiPonudu').post((req, res) => new ponude_controller_1.PonudaController().prihvatiPonudu(req, res));
ponudeRouter.route('/obrisiPonudu').post((req, res) => new ponude_controller_1.PonudaController().obrisiPonudu(req, res));
exports.default = ponudeRouter;
//# sourceMappingURL=ponude.routes.js.map