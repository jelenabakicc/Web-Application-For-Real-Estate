"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zahtev_controller_1 = require("../controllers/zahtev.controller");
const zahtevRouter = express_1.default.Router();
zahtevRouter.route('/registracija').post((req, res) => new zahtev_controller_1.ZahtevController().registracija(req, res));
zahtevRouter.route('/dohvSveZahteve').get((req, res) => new zahtev_controller_1.ZahtevController().dohvSveZahteve(req, res));
zahtevRouter.route('/odbij').post((req, res) => new zahtev_controller_1.ZahtevController().odbij(req, res));
exports.default = zahtevRouter;
//# sourceMappingURL=zahtev.routes.js.map