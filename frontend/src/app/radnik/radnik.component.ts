import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Nekretnina } from '../models/nekretnina';
import { NekretnineService } from '../nekretnine.service';
import { ChartDataSets, ChartOptions, ChartType  } from 'chart.js';
import { Label } from 'ng2-charts';
import { Ponuda } from '../models/ponuda';
import { PonudeService } from '../ponude.service';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  //graficki prikaz nekretnina

  //grafik 1
  public barChartOptions1: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }

    }
  };
  public barChartLabels1: Label[] = ['Prodaja', 'Izdavanje'];
  public barChartType1: ChartType = 'bar';
  public barChartLegend1 = true;
  public barChartData1: ChartDataSets[] = [ ];

  //grafik 2
  public barChartOptions2: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }

    },
  };
  public barChartLabels2: Label[] = [ ];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = true;
  public barChartData2: ChartDataSets[] = [ ];

  //grafik 3
  public barChartOptions3: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }

    }
  };
  public barChartLabels3: Label[] = [];
  public barChartType3: ChartType = 'bar';
  public barChartLegend3 = true;
  public barChartData3: ChartDataSets[] = [ ];

  constructor(private ruter: Router, private korisnikServis: KorisnikService, private nekretninaServis: NekretnineService,
    private ponudeServis: PonudeService) { }

  ngOnInit(): void {

    this.nepotvrdjenePonude = [];
    this.gradovi = [];
    this.brNekretninaZaGrad = [];
    this.procenat = JSON.parse(localStorage.getItem('procenat'));
    this.prihod = 0;
    this.rang1 = [0, 20000];
    this.rang2 = [20000, 200000];
    this.rang3 = [200000, 1000000];
    this.rang4 = [1000000, 5000000];
    this.barChartLabels3 = [this.rang1.toString(), this.rang2.toString(), this.rang3.toString(), this.rang4.toString()];

    this.ulogovaniKorIme = localStorage.getItem('ulogovani');
    localStorage.setItem("inbox", "ne");
    this.nekretninaServis.dohvNeodobrene().subscribe((n: Nekretnina[])=>{
      this.neodobreneNekretnine = n;
    })
    this.nekretninaServis.dohvPromovisane().subscribe((n: Nekretnina[])=>{
      this.promovisaneNekretnine = n;
    });
    this.nekretninaServis.dohvNepromovisane().subscribe((n: Nekretnina[])=>{
      this.nepromovisaneNekretnine = n;
    })

    this.nekretninaServis.dohvSpecNekretnine('Kuca', 'Izdavanje').subscribe((n: Nekretnina[])=>{
      this.brKucaIzdavanje = n.length;
      this.nekretninaServis.dohvSpecNekretnine('Kuca', 'Prodaja').subscribe((n: Nekretnina[])=>{
        this.brKucaProdaja = n.length;
        this.nekretninaServis.dohvSpecNekretnine('Stan', 'Izdavanje').subscribe((n: Nekretnina[])=>{
          this.brStanovaIzdavanje = n.length;
          this.nekretninaServis.dohvSpecNekretnine('Stan', 'Prodaja').subscribe((n: Nekretnina[])=>{
            this.brStanovaProdaja = n.length;

            this.barChartData1 = [
              {data:[this.brKucaProdaja, this.brKucaIzdavanje], label: 'Kuca'},
              {data:[this.brStanovaProdaja, this.brStanovaIzdavanje], label: 'Stan'}
            ];
          })
        });
      });
    });

    this.nekretninaServis.dohvSveNekretnine().subscribe((n: Nekretnina[])=>{
      for(let i = 0; i< n.length; i++){
        if(this.gradovi.find(element => element == n[i].grad) == undefined)
          this.gradovi.push(n[i].grad);
      }
      this.barChartLabels2 = this.gradovi;
      for(let j = 0; j< this.gradovi.length; j++){
        this.nekretninaServis.dohvNekretnineZaGrad(this.gradovi[j]).subscribe((n: Nekretnina[])=>{
          this.brNekretninaZaGrad.push(n.length); 
          
        });
      }
      this.barChartData2 = [{data: this.brNekretninaZaGrad, label:'Nekretnina'}]; //KAKO OVOO??

      this.nekretninaServis.pretraziCenaOdDo(this.rang1[0], this.rang1[1]).subscribe((n: Nekretnina[])=>{
        this.brRang1 = n.length;
        this.nekretninaServis.pretraziCenaOdDo(this.rang2[0], this.rang2[1]).subscribe((n: Nekretnina[])=>{
          this.brRang2 = n.length;
          this.nekretninaServis.pretraziCenaOdDo(this.rang3[0], this.rang3[1]).subscribe((n: Nekretnina[])=>{
            this.brRang3 = n.length;
            this.nekretninaServis.pretraziCenaOdDo(this.rang4[0], this.rang4[1]).subscribe((n: Nekretnina[])=>{
              this.brRang4 = n.length;
              this.barChartData3 = [{data: [this.brRang1, this.brRang2, this.brRang3, this.brRang4], label:'Nekretnina'}]
            })
          })
        })
      })
     
      this.ponudeServis.dohvPrihvacene().subscribe((p:Ponuda[])=>{
        this.nepotvrdjenePonude = p;
        let pomNekretnina: Nekretnina;
        for(let i = 0; i< this.nepotvrdjenePonude.length;i++){
          this.nekretninaServis.dohvPoId(this.nepotvrdjenePonude[i].idNekretnine).subscribe((n: Nekretnina)=>{
            pomNekretnina = n;
            this.nepotvrdjenePonude[i].nazivNekretnine = pomNekretnina.naziv;
          })
        }
      })
      
    });

    this.nekretninaServis.dohvNekretnineOdKorisnika().subscribe((n: Nekretnina[])=>{
      this.nekretnineOdKorisnika = n;
      for (let j = 0;j < this.nekretnineOdKorisnika.length; j++){
        this.ponudeServis.dohvOdobrenePonudeZaNekretninu(this.nekretnineOdKorisnika[j].id).subscribe((p: Ponuda[])=>{
          this.odobrenePonude= p;
          for (let i = 0; i< this.odobrenePonude.length; i++){
            this.prihod += this.odobrenePonude[i].ukupnaCena;
          }
        })
      }
    })

    this.ponudeServis.dohvOdobrene().subscribe((p:Ponuda[])=>{
      this.prodaje = p;
      let pomNekretnina: Nekretnina;
      for(let i = 0; i< this.prodaje.length;i++){
        this.nekretninaServis.dohvPoId(this.prodaje[i].idNekretnine).subscribe((n: Nekretnina)=>{
          pomNekretnina = n;
          this.prodaje[i].nazivNekretnine = pomNekretnina.naziv;
        })
      }
     })

     this.blokirani = [];
     this.meneBlokirali = [];

     this.korisnikServis.dohvMojeBlokirane(this.ulogovaniKorIme).subscribe((k:Korisnik[])=>{
      this.blokirani = k;
    })

    this.korisnikServis.dohvMojeZabranjene(this.ulogovaniKorIme).subscribe((k:Korisnik[])=>{
      this.meneBlokirali = [];
    })

  }

  brKucaIzdavanje: number;
  brKucaProdaja:number;
  brStanovaIzdavanje: number;
  brStanovaProdaja: number;
  brNekretninaZaGrad: number[];
  gradovi: string[];
  rang1: number[];
  rang2: number[];
  rang3: number[];
  rang4: number[];
  brRang1: number;
  brRang2: number;
  brRang3: number;
  brRang4: number;

  ulogovani: Korisnik;
  ulogovaniKorIme: string;
  neodobreneNekretnine: Nekretnina[];
  promovisaneNekretnine: Nekretnina[];
  nepromovisaneNekretnine: Nekretnina[];

  procenat: number;
  prihod: number;
  nekretnineOdKorisnika: Nekretnina[];
  odobrenePonude: Ponuda[];
  prodaje: Ponuda[];

  blokirani: Korisnik[];
  meneBlokirali: Korisnik[];


  nepotvrdjenePonude: Ponuda[];

  odobriNekretninu(nek: Nekretnina){
    this.nekretninaServis.odobriNekretninu(nek.id).subscribe((resp)=>{
      if(resp['poruka']=='ok'){
        this.nekretninaServis.dohvNeodobrene().subscribe((n: Nekretnina[])=>{
          this.neodobreneNekretnine = n;
        })
        this.nekretninaServis.dohvPromovisane().subscribe((n: Nekretnina[])=>{
          this.promovisaneNekretnine = n;
          
        });
        this.nekretninaServis.dohvNepromovisane().subscribe((n: Nekretnina[])=>{
          this.nepromovisaneNekretnine = n;
        })
      }
    })

  }

  promovisiNekretninu(nek: Nekretnina){
    this.nekretninaServis.promovisiNekretninu(nek.id).subscribe((resp)=>{
      if(resp['poruka']=='ok'){
        this.nekretninaServis.dohvNeodobrene().subscribe((n: Nekretnina[])=>{
          this.neodobreneNekretnine = n;
        })
        this.nekretninaServis.dohvPromovisane().subscribe((n: Nekretnina[])=>{
          this.promovisaneNekretnine = n;
        });
        this.nekretninaServis.dohvNepromovisane().subscribe((n: Nekretnina[])=>{
          this.nepromovisaneNekretnine = n;
        })
      }
    })
  }

  ukloniIzPromovisanih(nek: Nekretnina){
    this.nekretninaServis.ukloniIzPromovisanih(nek.id).subscribe((resp)=>{
      if(resp['poruka']=='ok'){
        this.nekretninaServis.dohvNeodobrene().subscribe((n: Nekretnina[])=>{
          this.neodobreneNekretnine = n;
        })
        this.nekretninaServis.dohvPromovisane().subscribe((n: Nekretnina[])=>{
          this.promovisaneNekretnine = n;
        });
        this.nekretninaServis.dohvNepromovisane().subscribe((n: Nekretnina[])=>{
          this.nepromovisaneNekretnine = n;
        })
      }
    })
  }

  
  potvrdi(p: Ponuda){
    this.ponudeServis.odobriPonudu(p.idPonude).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ponudeServis.dohvPrihvacene().subscribe((p:Ponuda[])=>{
          this.nepotvrdjenePonude = p;
          let pomNekretnina: Nekretnina;
          for(let i = 0; i< this.nepotvrdjenePonude.length;i++){
            this.nekretninaServis.dohvPoId(this.nepotvrdjenePonude[i].idNekretnine).subscribe((n: Nekretnina)=>{
              pomNekretnina = n;
              this.nepotvrdjenePonude[i].nazivNekretnine = pomNekretnina.naziv;
            })
          }
        })
      }
    })
  }

  odbij(p: Ponuda){
    this.ponudeServis.obrisiPonudu(p.idPonude).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.ponudeServis.dohvPrihvacene().subscribe((p:Ponuda[])=>{
          this.nepotvrdjenePonude = p;
          let pomNekretnina: Nekretnina;
          for(let i = 0; i< this.nepotvrdjenePonude.length;i++){
            this.nekretninaServis.dohvPoId(this.nepotvrdjenePonude[i].idNekretnine).subscribe((n: Nekretnina)=>{
              pomNekretnina = n;
              this.nepotvrdjenePonude[i].nazivNekretnine = pomNekretnina.naziv;
            })
          }
        })
      }
    })
  }
}
