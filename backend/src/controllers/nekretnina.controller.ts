import express, { json } from 'express';
import Nekretnina from '../models/nekretnina';

export class NekretninaController{
    
    dohvSveNekretnine = (req: express.Request, res: express.Response)=>{

        Nekretnina.find({}, (err, n)=>{
            if(err)console.log(err)
            else res.json(n);
        });
    }

    dohvPoId = (req: express.Request, res:express.Response) =>{
        let id = req.body.id;

        Nekretnina.findOne({'id': id}, (err, n)=>{
            if (err) console.log(err)
            else res.json(n);
        })
    }

    dohvPromovisane = (req: express.Request, res: express.Response)=> {

        Nekretnina.find({'promovisana': 1, 'odobrena': 1}, (err, p)=>{
            if (err) console.log(err)
            else{
                res.json(p);
            } 
        });
    }

    dohvNepromovisane = (req: express.Request, res: express.Response)=> {

        Nekretnina.find({'promovisana': 0, 'odobrena': 1}, (err, p)=>{
            if (err) console.log(err)
            else res.json(p);
        });
    }

    dohvNeodobrene = (req: express.Request, res: express.Response)=>{

        Nekretnina.find({'odobrena': 0}, (err, n)=>{
            if (err) console.log(err)
            else res.json(n);
        });
    }

    dohvOdobrene = (req: express.Request, res: express.Response)=>{

        Nekretnina.find({'odobrena': 1}, (err, n)=>{
            if (err) console.log(err)
            else res.json(n);
        });
    }

    dohvMaxId = (req: express.Request, res: express.Response)=>{

        Nekretnina.findOne().sort({"id":"desc"}).exec((err, elem)=>{
            if(err) console.log(err)
            else res.json(elem);
        });
        //PROVERI DA LI MOZE OVAKO
    }

    dodajNekretninuK = (req: express.Request, res: express.Response)=>{

        let nekretnina = new Nekretnina(req.body);

        nekretnina.save().then((nekretnina)=>{
            res.status(200).json({'poruka':'nekretnina je dodata'});
        }).catch((err)=>{
            res.status(400).json({'poruka': err});
        });
    }

    dodajNekretninuA = (req: express.Request, res: express.Response)=>{

        let nekretnina = new Nekretnina(req.body);

        nekretnina.save().then((nekretnina)=>{
            res.status(200).json({'poruka':'nekretnina je dodata'});
        }).catch((err)=>{
            res.status(400).json({'poruka': err});
        });
    }

    odobriNekretninu = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        Nekretnina.collection.updateOne({'id': id}, {$set:{'odobrena': 1}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'});
        });
    }

    obrisiNekretninu = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        
        Nekretnina.collection.deleteOne({'id': id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka' : 'ok'})
        });
    
    }

    promovisiNekretninu = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        Nekretnina.collection.updateOne({'id': id}, {$set:{'promovisana': 1}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'});
        });
    }

    ukloniIzPromovisanih = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;

        Nekretnina.collection.updateOne({'id': id}, {$set:{'promovisana': 0}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'});
        });
    }

    dohvNekretnineZaKorisnika = (req: express.Request, res: express.Response)=>{

        let kor_ime = req.body.kor_ime;

        Nekretnina.find({'vlasnik': kor_ime}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n);
        });

    }

    azurirajNaziv = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let naziv = req.body.naziv;

        Nekretnina.collection.updateOne({'id': id}, {$set:{'naziv': naziv, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'poruka':'ok'});
        });
    }

    azurirajGrad = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let grad = req.body.grad;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'grad': grad, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajOpstinu = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let opstina = req.body.opstina;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'opstina': opstina, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });

    }

    azurirajUlicu = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let ulica = req.body.ulica;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'ulica': ulica, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajBroj = (req:express.Request, res: express.Response)=>{
        let id = req.body.id;
        let broj = req.body.broj;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'broj': broj, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajTip = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let tip = req.body.tip;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'tip': tip, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajSprat = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let sprat = req.body.sprat;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'sprat': sprat, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajZgradu = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let zgrada = req.body.zgrada;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'zgrada': zgrada, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajKvadraturu = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let kvadratura = req.body.kvadratura;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'kvadratura': kvadratura, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajBrSoba = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let br_soba = req.body.br_soba;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'br_soba': br_soba, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajNamestena = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let namestena = req.body.namestena;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'namestena': namestena, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajNamenu = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let namena = req.body.namena;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'namena': namena, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajCenu = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let cena = req.body.cena;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'cena': cena, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    azurirajGaleriju = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let galerija = req.body.galerija;

        Nekretnina.collection.updateOne({'id':id}, {$set:{'galerija': galerija, 'promovisana': 0, 'odobrena': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    pretraziNekretnineZaGrad = (req: express.Request, res: express.Response) =>{
        let grad = req.body.grad;

        Nekretnina.find({'grad': grad}, (err, n)=>{
            if (err) console.log(err)
            else res.json(n);
        })
    }

    pretraziCenaOd = (req: express.Request, res: express.Response) => {
        let min = req.body.cenaOd;

        Nekretnina.find({'cena':{$gt: min}}, (err, n)=>{
            if(err) console.log(err)
            else res.json(n);
        })
    }

    pretraziCenaDo = (req: express.Request, res: express.Response) =>{
        let max = req.body.cenaDo;

        Nekretnina.find({'cena':{$lt: max}}, (err, n)=>{
            if (err) console.log(err)
            else res.json(n);
        })
    }

    pretraziGradCenaOd = (req: express.Request, res:express.Response) => {
        let grad = req.body.grad;
        let min = req.body.cenaOd;

        Nekretnina.find({'grad': grad, 'cena': {$gt: min}}, (err, n)=>{
            if(err) console.log(err)
            else res.json(n);
        })
    }

    pretraziGradCenaDo = (req: express.Request, res: express.Response) =>{
        let grad = req.body.grad;
        let max = req.body.cenaDo;

        Nekretnina.find({'grad': grad, 'cena': {$lt: max}}, (err, n)=>{
            if(err) console.log(err)
            else res.json(n);
        })
    }

    pretraziCenaOdDo = (req: express.Request, res: express.Response) =>{
        let min = req.body.cenaOd;
        let max = req.body.cenaDo;

        Nekretnina.find({'cena': {$gt: min, $lt: max}}, (err, n) =>{
            if(err) console.log(err)
            else res.json(n);
        })
    }

    pretraziGradCena = (req: express.Request, res: express.Response) =>{
        let grad = req.body.grad;
        let min = req.body.cenaOd;
        let max = req.body.cenaDo;

        Nekretnina.find({'grad': grad,'cena': {$gt: min, $lt: max}}, (err, n) =>{
            if(err) console.log(err)
            else res.json(n);
        })
    }

    dohvSpecNekretnine = (req: express.Request, res: express.Response) =>{
        let tip = req.body.tip;
        let namena= req.body.namena;

        Nekretnina.find({'tip': tip, 'namena': namena}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n);
            
        })
    }

    dohvNekretnineZaGrad = (req: express.Request, res: express.Response) =>{
        let grad = req.body.grad;

        Nekretnina.find({'grad': grad}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n);
            
        })
    }

    dohvNekretnineOdKorisnika = (req: express.Request, res: express.Response) =>{
        
        Nekretnina.find({'vlasnik': {$ne: 'Agencija' }}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n);
            
        })
    }
}