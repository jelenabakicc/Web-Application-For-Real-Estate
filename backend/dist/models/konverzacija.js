"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Konverzacija = new Schema({
    idKonverzacije: {
        type: Number
    },
    idNekretnine: {
        type: Number
    },
    tip: {
        type: String
    },
    naslov: {
        type: String
    },
    nudi: {
        type: String
    },
    vlasnik: {
        type: String
    },
    poslednjaDatum: {
        type: Date
    },
    poslednjaProcitana: {
        type: Boolean
    },
    imaPonudu: {
        type: Boolean
    },
    poruke: {
        type: Array
    },
    arhivirana: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model("Konverzacija", Konverzacija, "konverzacije");
//# sourceMappingURL=konverzacija.js.map