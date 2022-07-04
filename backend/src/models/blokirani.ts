import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Blokirani = new Schema(
    {
        blokirao:{
            type: String
        },
        blokiraniKorisnik:{
            type: String
        }
    }
);

export default mongoose.model('Blokirani', Blokirani, 'blokirani');