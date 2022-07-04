import express from 'express';
import Korisnik from '../models/korisnik';
import Blokirani from '../models/blokirani';

export class KorisnikController{

    dohvSveKorisnike = (req: express.Request, res: express.Response)=>{
        Korisnik.find({}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        });
    }

    dohvRegistrovane = (req: express.Request, res: express.Response)=>{
        Korisnik.find({'tip': 'Registrovani'}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        });
    }

    dohvAgente = (req: express.Request, res: express.Response)=>{
        Korisnik.find({'tip': 'Radnik'}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        });
    }

    prijava = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
    
        Korisnik.findOne({'kor_ime':kor_ime}, 
        (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik);
        });
    }

    registracija = (req: express.Request, res: express.Response)=>{
            let korisnik = new Korisnik(req.body);

            korisnik.save().then((korisnik)=>{
                res.status(200).json({'message':'korisnik je dodat'});
            }).catch((err)=>{
                res.status(400).json({'message': err});
            });
        
       
    }

    dohvKorisnika = (req: express.Request, res:express.Response)=>{
        let kor_ime = req.body.kor_ime;

        Korisnik.findOne({'kor_ime':kor_ime},
        (err,k)=>{
            if(err) console.log(err);
            else res.json(k);
        });
    }

    dohvAdmina = (req: express.Request, res: express.Response)=>{

        Korisnik.findOne({'tip':'Admin'}, (err, k)=>{
            if(err) console.log(err);
            else res.json({'poruka':'vec postoji admin'});
        })
    }

    novaLozinka = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;

        Korisnik.collection.updateOne({'kor_ime': kor_ime}, {$set:{'lozinka':lozinka}}, (err, k)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        });
    }

    proveriMail = (req: express.Request, res: express.Response)=>{
    
        let mail = req.body.mail;

        Korisnik.find({'email': mail}, (err,k)=>{
            if(err) console.log(err);
            else if (k.length == 0){
                res.json({'poruka': 'ok'});
                console.log('pronasao sam mail');
            }
            else{
                res.json({'poruka': 'nije ok'});
            }
        })

    }

    azurirajIme = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let ime = req.body.ime;

        Korisnik.collection.updateOne({'kor_ime':kor_ime}, {$set:{'ime':ime}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        })
    }

    azurirajPrezime = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let prezime = req.body.prezime;

        Korisnik.collection.updateOne({'kor_ime':kor_ime}, {$set:{'prezime':prezime}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        })
    }

    azurirajKorIme = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let novo_kor_ime = req.body.novo_kor_ime;
        //TREBA PROVERITI DA LI VEC POSTOJI KOR IME
        Korisnik.collection.updateOne({'kor_ime':kor_ime}, {$set:{'kor_ime':novo_kor_ime}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        })
    }

    azurirajMail = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let mail = req.body.mail;

        Korisnik.collection.updateOne({'kor_ime':kor_ime}, {$set:{'email':mail}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        })
    }

    azurirajGrad = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let grad = req.body.grad;

        Korisnik.collection.updateOne({'kor_ime':kor_ime}, {$set:{'grad':grad}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        })
    }

    azurirajDrzavu = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let drzava = req.body.drzava;

        Korisnik.collection.updateOne({'kor_ime':kor_ime}, {$set:{'drzava':drzava}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        })
    }

    azurirajSliku = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let nazivSlike = req.body.nazivSlike;

        Korisnik.collection.updateOne({'kor_ime': kor_ime}, {$set: {'slika':nazivSlike}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka':'ok'});
        })
    }

    obrisiKorisnika = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;

        Korisnik.collection.deleteOne({'kor_ime': kor_ime}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'poruka' : 'ok'})
        });
    }

    blokiraj = (req: express.Request, res: express.Response) =>{
        let blokirani = new Blokirani(req.body);

        blokirani.save().then((blokirani)=>{
            res.status(200).json({'message':'korisnik je dodat'});
        }).catch((err)=>{
            res.status(400).json({'message': err});
        });
    }

    odblokiraj = (req: express.Request, res: express.Response) =>{
        let blokirani = req.body.blokirani;
        let blokirao = req.body.blokirao;

        Blokirani.collection.deleteOne({'blokirao': blokirao, 'blokirani': blokirani});
    }

    dohvMojeBlokirane = (req: express.Request, res: express.Response) =>{
        let blokirao = req.body.blokirao;

        Blokirani.find({'blokirao': blokirao}, (err, b)=>{
            if(err) console.log(err);
            else res.json(b);
        });
    }

    dohvMojeZabranjene = (req: express.Request, res: express.Response) =>{
        let blokirani = req.body.blokirani;

        Blokirani.find({'blokirani': blokirani}, (err, b)=>{
            if(err) console.log(err);
            else res.json(b);
        });
    }

    daLiSuBlokirani  = (req: express.Request, res: express.Response) =>{
        let blokirani = req.body.blokirani;
        let blokirao = req.body.blokirao;

        Blokirani.find({'blokirao': blokirao, 'blokirani': blokirani}, (err, b)=>{
            if (err) console.log(err);
        }        
        );
    }
    
}