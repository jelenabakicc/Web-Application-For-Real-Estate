import express from 'express';
import Korisnik from '../models/korisnik';
import Zahtev from '../models/zahtev';

export class ZahtevController{

    registracija = (req:express.Request, res: express.Response) => {
        
        let zahtev = new Zahtev(req.body);
        zahtev.save().then((zahtev)=>{
            res.status(200).json({'message':'zahtev je dodat'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        });
    }

    dohvSveZahteve = (req:express.Request, res:express.Response) =>{
        Zahtev.find({}, (err, z)=>{
            if(err) console.log(err)
            else res.json(z)
        });
    }

    odbij = (req:express.Request, res:express.Response) =>{
        let kor_ime = req.body.kor_ime;
        Zahtev.collection.deleteOne({'kor_ime':kor_ime},resp=>{
            res.json({'poruka':'ok'})
        });
    }

    dodaj = (req:express.Request, res:express.Response) =>{
        let kor_ime = req.body.kor_ime;

        Zahtev.collection.deleteOne({'kor_ime':kor_ime},resp=>{
            res.json({'poruka':'ok'})
        });
        
    }

}