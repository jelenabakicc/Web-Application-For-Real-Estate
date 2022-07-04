import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Nekretnina = new Schema(
{
    id:{
        type: Number
    },
    naziv:{
        type: String
    },
    grad:{
        type: String
    },
    opstina:{
        type: String
    },
    ulica:{
        type: String
    },
    broj:{
        type: Number
    },
    tip:{
        type: String
    },
    sprat:{
        type: Number
    },
    zgrada:{
        type: Number
    },
    kvadratura:{
        type: Number
    },
    br_soba:{
        type: String
    },
    namestena:{
        type: Number
    },
    galerija:{
        type: Array
    },
    namena:{
        type: String
    },
    cena:{
        type: Number
    },
    vlasnik:{
        type: String
    },
    odobrena:{
        type: Number
    },
    promovisana:{
        type: Number
    }
}
);

export default mongoose.model('Nekretnina', Nekretnina, 'nekretnina');