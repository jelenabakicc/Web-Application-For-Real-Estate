import express from 'express';
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router();

zahtevRouter.route('/registracija').post(
    (req, res) => new ZahtevController().registracija(req, res)
);

zahtevRouter.route('/dohvSveZahteve').get(
    (req, res) => new ZahtevController().dohvSveZahteve(req, res)  
);

zahtevRouter.route('/odbij').post(
    (req, res) => new ZahtevController().odbij(req, res)  
);

export default zahtevRouter;