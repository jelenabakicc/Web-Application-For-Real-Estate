"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_routes_1 = __importDefault(require("./routes/korisnik.routes"));
const zahtev_routes_1 = __importDefault(require("./routes/zahtev.routes"));
const nekretnina_routes_1 = __importDefault(require("./routes/nekretnina.routes"));
const ponude_routes_1 = __importDefault(require("./routes/ponude.routes"));
const konverzacija_routes_1 = __importDefault(require("./routes/konverzacija.routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/nekretnine');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('mongo ok');
});
const router = express_1.default.Router();
//rute
router.use('/korisnik', korisnik_routes_1.default);
router.use('/zahtevi', zahtev_routes_1.default);
router.use('/nekretnina', nekretnina_routes_1.default);
router.use('/ponude', ponude_routes_1.default);
router.use('/konverzacije', konverzacija_routes_1.default);
//slike i video
const multer = require('multer');
///   -----   single file   -----   ///
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/app/src/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage }).single('file');
app.post('/uploadPhoto', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Uspesan upload slike");
        res.status(200).json({ "ret": "ok" });
    });
});
app.post('/downloadPhoto', (req, res) => {
    let photo = req.body.photo;
    res.sendFile(req.body.photo, { root: "../frontend/app/src/assets" });
});
app.post('/uploadFile', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Uspesan upload fajla");
        res.status(200).json({ "ret": "ok" });
    });
});
///   -----   multiple files   -----   ///
var storageM = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/app/src/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadM = multer({ storage: storageM }).array('files');
app.post('/uploadFiles', (req, res) => {
    uploadM(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Uspesan upload fajlova");
        res.status(200).json({ "ret": "ok" });
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map