"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nekretnina = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    grad: {
        type: String
    },
    opstina: {
        type: String
    },
    ulica: {
        type: String
    },
    broj: {
        type: Number
    },
    tip: {
        type: String
    },
    sprat: {
        type: Number
    },
    zgrada: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    br_soba: {
        type: String
    },
    namestena: {
        type: Number
    },
    galerija: {
        type: Array
    },
    namena: {
        type: String
    },
    cena: {
        type: Number
    },
    vlasnik: {
        type: String
    },
    odobrena: {
        type: Number
    },
    promovisana: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Nekretnina', Nekretnina, 'nekretnina');
//# sourceMappingURL=nekretnina.js.map