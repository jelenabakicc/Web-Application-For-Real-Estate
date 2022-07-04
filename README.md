# Web Application For Real Estate

u backend delu:

1) npm install multer
2) tsconfig.json (izmeniti) => 

	"noImplicityAny": false

___________________________________
u frontend delu:

1) npm install bootstrap
2) npm install jquery
3) npm install popper.js
4) npm install @popperjs/core

5)angular.json(izmeniti) => 

	"styles": [
        		 "node_modules/bootstrap/dist/css/bootstrap.min.css",
        		 "src/styles.css"
	],
	"scripts": [
     		"node_modules/jquery/dist/jquery.min.js", 
         		"node_modules/popper.js/dist/umd/popper.min.js", 
        		"node_modules/bootstrap/dist/js/bootstrap.min.js"
	]
6)index.html(izmeniti) =>

   *dodati u head
         	 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity=
          	"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

   *dodati u body

	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRV
 		zpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-
		UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-
		JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

7) npm install alertifyjs --save

       a) angular.json(izmeniti) =>
 	"styles": [
	        "./node_modules/alertifyjs/build/css/alertify.min.css"
		...
	]
	"scripts": [
	       "./node_modules/alertifyjs/build/alertify.min.js"
		...
	]

        b) u environments => napraviti novi fajl:
	alertifytype.d.ts
                ///////////////////////////////////////
		declare module 'alertifyjs';
	///////////////////////////////////////

         c) posle u svaki .ts u kome cemo koristiti uradimo:
		import * as alertify from 'alertifyjs';


8) npm install chart.js@2.9.3 --save	
9) npm install ng2-charts@2.4.2 --save

 
