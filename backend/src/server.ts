import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import zahtevRouter from './routes/zahtev.routes';
import nekretninaRouter from './routes/nekretnina.routes';
import ponudeRouter from './routes/ponude.routes';
import konverzacijaRouter from './routes/konverzacija.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/nekretnine');
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo ok')
});

const router = express.Router();

//rute
router.use('/korisnik', korisnikRouter);
router.use('/zahtevi', zahtevRouter);
router.use('/nekretnina', nekretninaRouter);
router.use('/ponude', ponudeRouter);
router.use('/konverzacije', konverzacijaRouter);


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
        res.status(200).json({"ret":"ok"});
    });
  });

app.post('/downloadPhoto', (req,res)=>{
   let photo = req.body.photo;
 
    res.sendFile(req.body.photo, { root: "../frontend/app/src/assets"});
});

app.post('/uploadFile', (req, res) => {
  upload(req, res, (err) => {
    
    if (err) {
        console.log(err);
    }
    console.log("Uspesan upload fajla");
    res.status(200).json({"ret":"ok"});
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
    if(err){
      console.log(err);
    }
    console.log("Uspesan upload fajlova");
    res.status(200).json({"ret":"ok"});
  });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));