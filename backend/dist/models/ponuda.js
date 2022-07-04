"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ponuda = new Schema({
    idPonude: {
        type: Number
    },
    idNekretnine: {
        type: Number
    },
    tip: {
        type: String
    },
    nudi: {
        type: String
    },
    vlasnik: {
        type: String
    },
    status: {
        type: String
    },
    datumOd: {
        type: String
    },
    datumDo: {
        type: String
    },
    ukupnaCena: {
        type: Number
    },
    datumSlanja: {
        type: Date
    }
});
exports.default = mongoose_1.default.model("Ponuda", Ponuda, "ponude");
//# sourceMappingURL=ponuda.js.map