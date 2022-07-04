import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Ponuda = new Schema(
    {  
        idPonude:{
            type: Number
        },
        idNekretnine:{
            type: Number
        },
        tip:{
            type: String
        },
        nudi:{
            type: String
        },
        vlasnik:{
            type: String
        },
        status:{
            type: String
        },
        datumOd:{
            type: String
        },
        datumDo:{
            type: String
        },
        ukupnaCena: {
            type: Number
        },
        datumSlanja: {
            type: Date
        }
    }
)

export default mongoose.model("Ponuda", Ponuda, "ponude");