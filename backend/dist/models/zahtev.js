"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zahtev = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    email: {
        type: String
    },
    grad: {
        type: String
    },
    drzava: {
        type: String
    },
    slika: {
        type: String
    },
    tip: {
        type: String
    },
    odobren: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Zahtev', Zahtev, 'zahteviRegistracija');
//# sourceMappingURL=zahtev.js.map