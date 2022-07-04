import Ponuda from '../models/ponuda';
import express, { json } from 'express';

export class PonudaController{

    dohvSvePonude = (req: express.Request, res: express.Response) =>{
        Ponuda.find({}, (err, p)=>{
            if(err) console.log(err);
            else res.json(p);
        })
    }

    dohvatiPonudeZaVlasnika = (req: express.Request, res: express.Response) =>{
        let vlasnik = req.body.vlasnik;

        Ponuda.find({'vlasnik': vlasnik}, (err, p)=>{
            if(err) console.log(err);
            else res.json(p);
        })
    }

    dohvatiPonuduPoId = (req: express.Request, res: express.Response) =>{
        let idPonude = req.body.idPonude;

        Ponuda.findOne({'idPonude': idPonude}, (err, p)=>{
            if(err) console.log(err);
            else res.json(p);
        })
    }

    dodajPonudu = (req: express.Request, res: express.Response) =>{
        let ponuda = new Ponuda(req.body);
        ponuda.save().then((ponuda)=>{
            res.status(200).json({'message':'ponuda je dodata'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        });
    }

    dohvNeodobrene = (req:express.Request, res:express.Response) =>{
        Ponuda.find({'status': 'N'}, (err, p)=>{
            if(err) console.log(err);
            else res.json(p);
        })
    }

    dohvPrihvacene = (req:express.Request, res:express.Response) =>{
        Ponuda.find({'status': 'P'}, (err, p)=>{
            if(err) console.log(err);
            else res.json(p);
        })
    }

    dohvOdobrene = (req:express.Request, res:express.Response) =>{
        Ponuda.find({'status': 'O'}, (err, p)=>{
            if(err) console.log(err);
            else res.json(p);
        })
    }

    dohvPonudeZaNekretninu = (req: express.Request, res: express.Response) =>{
        let idNekretnine = req.body.idNekretnine;
        Ponuda.find({'idNekretnine': idNekretnine}, (err, p)=>{
            if(err) console.log(err);
            else res.json(p);
        })
    }

    dohvOdobrenePonudeZaNekretninu = (req: express.Request, res: express.Response) =>{
        let idNekretnine = req.body.idNekretnine;
        Ponuda.find({'idNekretnine': idNekretnine, 'status': 'O'}, (err, p)=>{
            if(err) console.log(err);
            else res.json(p);
        })
    }

    dohvMaxId = (req: express.Request, res: express.Response)=>{

        Ponuda.findOne().sort({"idPonude":"desc"}).exec((err, elem)=>{
            if(err) console.log(err)
            else res.json(elem);
        });
    }

    odobriPonudu = (req: express.Request, res: express.Response)=>{

        let idPonude = req.body.idPonude;

        Ponuda.collection.updateOne({"idPonude": idPonude}, {$set:{'status' : 'O'}},(resp)=>{
            res.json({'message': 'ok'})
        });
    }

    prihvatiPonudu = (req: express.Request, res: express.Response)=>{

        let idPonude = req.body.idPonude;

        Ponuda.collection.updateOne({"idPonude": idPonude}, {$set:{'status' : 'P'}},(resp)=>{
            res.json({'message': 'ok'})
        });
    }

    obrisiPonudu = (req: express.Request, res: express.Response)=>{

        let idPonude = req.body.idPonude;

        Ponuda.collection.deleteOne({"idPonude": idPonude},(resp)=>{
            res.json({'message': 'ok'})
        });
    }



}