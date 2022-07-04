import express from 'express';
import {PonudaController} from '../controllers/ponude.controller';

const ponudeRouter = express.Router();

ponudeRouter.route('/dohvSvePonude').get(
    (req, res) => new PonudaController().dohvSvePonude(req, res)
)

ponudeRouter.route('/dohvatiPonudeZaVlasnika').post(
    (req, res) => new PonudaController().dohvatiPonudeZaVlasnika(req, res)
)

ponudeRouter.route('/dohvatiPonuduPoId').post(
    (req, res) => new PonudaController().dohvatiPonuduPoId(req, res)
)

ponudeRouter.route('/dohvNeodobrene').get(
    (req, res) => new PonudaController().dohvNeodobrene(req, res)
)

ponudeRouter.route('/dohvOdobrene').get(
    (req, res) => new PonudaController().dohvOdobrene(req, res)
)

ponudeRouter.route('/dohvPrihvacene').get(
    (req, res) => new PonudaController().dohvPrihvacene(req, res)
)

ponudeRouter.route('/dodajPonudu').post(
    (req, res) => new PonudaController().dodajPonudu(req, res)
)

ponudeRouter.route('/dohvPonudeZaNekretninu').post(
    (req, res) => new PonudaController().dohvPonudeZaNekretninu(req, res)
)

ponudeRouter.route('/dohvOdobrenePonudeZaNekretninu').post(
    (req, res) => new PonudaController().dohvOdobrenePonudeZaNekretninu(req, res)
)

ponudeRouter.route('/dohvMaxId').get(
    (req, res) => new PonudaController().dohvMaxId(req, res)
)

ponudeRouter.route('/odobriPonudu').post(
    (req, res) => new PonudaController().odobriPonudu(req, res)
)

ponudeRouter.route('/prihvatiPonudu').post(
    (req, res) => new PonudaController().prihvatiPonudu(req, res)
)

ponudeRouter.route('/obrisiPonudu').post(
    (req, res) => new PonudaController().obrisiPonudu(req, res)
)

export default ponudeRouter;