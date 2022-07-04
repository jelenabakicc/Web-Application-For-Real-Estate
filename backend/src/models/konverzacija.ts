import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Konverzacija = new Schema(
    {  
        idKonverzacije:{
            type: Number
        },
        idNekretnine:{
            type: Number
        },
        tip:{
            type: String
        },
        naslov:{
            type: String
        },
        nudi:{
            type: String
        },
        vlasnik:{
            type: String
        },
        poslednjaDatum:{
            type: Date
        },
        poslednjaProcitana: {
            type: Boolean
        },
        imaPonudu: {
            type: Boolean
        },
        poruke:{
            type: Array
        },
        arhivirana:{
            type: Boolean
        }
    }
)

export default mongoose.model("Konverzacija", Konverzacija, "konverzacije");