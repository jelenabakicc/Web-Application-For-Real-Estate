import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zahtev = new Schema(
    {
        ime:{
            type: String
        },
        prezime:{
            type: String
        },
        kor_ime:{
            type: String
        },
        lozinka:{
            type: String
        },
        email:{
            type: String
        },
        grad:{
            type: String
        },
        drzava:{
            type: String
        },
        slika:{
            type: String
        },
        tip:{
            type: String
        },
        odobren:{
            type: Number
        }
    }
);

export default mongoose.model('Zahtev', Zahtev, 'zahteviRegistracija');