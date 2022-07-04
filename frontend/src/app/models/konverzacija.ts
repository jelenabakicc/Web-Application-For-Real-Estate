import { Poruka } from "./poruka";

export class Konverzacija{
    idKonverzacije:number;
    idNekretnine: number;
    naslov: string;
    nudi: string;
    vlasnik: string;
    poslednjaDatum: string;
    //poslednjaDate: Date;
    poslednjaProcitana: boolean;
    imaPonudu: boolean;
    poruke: Array<Poruka>;
    arhivirana: boolean;
    datum: string;
    vreme: string;
}