import express, { json } from 'express';
import Konverzacija from '../models/konverzacija';

export class KonverzacijaController{

    dohvKonverzacijeZaVlasnika = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        Konverzacija.find({'vlasnik': kor_ime, 'arhivirana': false}, (err, k)=>{
            if (err) console.log(err)
            else res.json(k);
        })
    }

    dohvKonverzacijeZaPonudjaca = (req: express.Request, res: express.Response) =>{
        let kor_ime = req.body.kor_ime;

        Konverzacija.find({'nudi': kor_ime, 'arhivirana': false}, (err, k)=>{
            if (err) console.log(err)
            else res.json(k);
        })
    }

    dohvKonverzacijeZaAgenciju = (req: express.Request, res: express.Response) =>{

        Konverzacija.find({'arhivirana': false, 'vlasnik': 'Agencija'}, (err, k)=>{
            if (err) console.log(err)
            else res.json(k);
        })
    }

    dohvArhiviraneKonverzacijeZaVlasnika = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        Konverzacija.find({'vlasnik': kor_ime, 'arhivirana': true}, (err, k)=>{
            if (err) console.log(err)
            else res.json(k);
        })
    }

    dohvArhiviraneKonverzacijeZaPonudjaca = (req: express.Request, res: express.Response) =>{
        let kor_ime = req.body.kor_ime;

        Konverzacija.find({'nudi': kor_ime, 'arhivirana': true}, (err, k)=>{
            if (err) console.log(err)
            else res.json(k);
        })
    }

    zapocniKonverzaciju = (req: express.Request, res: express.Response) =>{
        let konverzacija = new Konverzacija(req.body);

        konverzacija.save().then((konverzacija)=>{
            res.status(200).json({'message':'konverzacija je dodata'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        })
    }


    dohvMaxId = (req: express.Request, res: express.Response)=>{

        Konverzacija.findOne().sort({"idKonverzacije":"desc"}).exec((err, elem)=>{
            if(err) console.log(err)
            else res.json(elem);
        });
    }

    dodajPoruku = (req: express.Request, res: express.Response) =>{

        let idKonverzacije = req.body.idKonverzacije;
        let datum = req.body.datumSlanja;
        
            
        Konverzacija.collection.updateOne({'idKonverzacije': idKonverzacije}, {$push:{'poruke': req.body.poruka}});
        Konverzacija.collection.updateOne({'idKonverzacije': idKonverzacije}, {$set:{'poslednjaDatum': datum, 'poslednjaProcitana': false}})
        res.json({'message': 'poruka je dodata'});


    }

    dohvKonverzaciju = (req: express.Request, res: express.Response) =>{

        let idKonverzacije = req.body.idKonverzacije;

        Konverzacija.findOne({'idKonverzacije': idKonverzacije}, (err, k) =>{
            if(err) console.log(err)
            else res.json(k)
        })
    }

    citaj = (req: express.Request, res: express.Response) =>{

        let idKonverzacije = req.body.idKonverzacije;

        Konverzacija.collection.updateOne({'idKonverzacije': idKonverzacije, 'poruke.procitana': false}, 
            {$set:{'poslednjaProcitana': true, 'poruke.$.procitana': true}}, (err, resp)=>{
                if(err) console.log(err)
                else res.json({"message": "ok"});
            });
        
        
    }

    arhiviraj = (req: express.Request, res: express.Response) =>{

        let idKonverzacije = req.body.idKonverzacije;

        Konverzacija.collection.updateOne({'idKonverzacije': idKonverzacije}, 
            {$set:{'arhivirana': true}}, (err, resp) =>{
                if (err) console.log(err);
                else res.json({"message":"ok"});
            });
        
    }

    dearhiviraj = (req: express.Request, res: express.Response) =>{

        let idKonverzacije = req.body.idKonverzacije;

        Konverzacija.collection.updateOne({'idKonverzacije': idKonverzacije}, 
            {$set:{'arhivirana': false}}, (err, resp) =>{
                if (err) console.log(err);
                else res.json({"message":"ok"});
            });
        
        
    }


    dodajPonudu = (req: express.Request, res: express.Response) =>{

        let idKonverzacije = req.body.idKonverzacije;
            
        Konverzacija.collection.updateOne({'idKonverzacije': idKonverzacije}, {$set:{'imaPonudu': true}}, resp =>{
            res.json({'message': 'ponuda je dodata'});
        })     

    }

    obrisiPonuduZaNekretninu = (req: express.Request, res: express.Response) =>{

        let idNekretnine = req.body.idNekretnine;

        Konverzacija.collection.updateOne({'idNekretnine': idNekretnine}, {$set:{'imaPonudu': false}}, resp =>{
            res.json({'message': 'ok'});
        })     

    }

    obrisiPonuduZaKonverzaciju = (req: express.Request, res: express.Response) =>{

        let idKonverzacije = req.body.idKonverzacije;

        Konverzacija.collection.updateOne({'idKonverzacije': idKonverzacije}, {$set:{'imaPonudu': false}}, resp =>{
            res.json({'message': 'ok'});
        })     

    }

    

}