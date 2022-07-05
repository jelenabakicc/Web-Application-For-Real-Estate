# Web Application For Real Estate

This project is mandatory project on Internet Applications Programming course.
[Here](https://github.com/jelenabakicc/Web-Application-For-Real-Estate/blob/main/IR3PIA_2020_2021_projekat_jun-jul.pdf) are all the requirements.

Installation:

1. NODE.JS
- install [node.js](https://nodejs.org/en/) 
2. FRONTEND
- install [Angular](https://angular.io/) 
3. BACKEND
	npm install -g typescript

4. DATABASE
- install [MongoDB](https://www.mongodb.com/docs/)
- install [MongoDBCompass
- install Robo3T

1) backend:

- npm install multer

1.1) tsconfig.json (change) => 

	"noImplicityAny": false

___________________________________
2) frontend:

- npm install bootstrap
- npm install jquery
- npm install popper.js
- npm install @popperjs/core
- npm install alertifyjs --save
- npm install chart.js@2.9.3 --save	
- npm install ng2-charts@2.4.2 --save

2.2) angular.json(change) => 

	"styles": [
        		"node_modules/bootstrap/dist/css/bootstrap.min.css",
        		"src/styles.css",
		"./node_modules/alertifyjs/build/css/alertify.min.css"
		
	],
	"scripts": [
     		"node_modules/jquery/dist/jquery.min.js", 
         		"node_modules/popper.js/dist/umd/popper.min.js", 
        		"node_modules/bootstrap/dist/js/bootstrap.min.js",
		"./node_modules/alertifyjs/build/alertify.min.js"
	]
2.3) index.html(change) =>

   *add to head:
         	 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity=
          	"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

   *add to body:

	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRV
 		zpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-
		UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
  	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-
		JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>


2.4) u environments => make new file:
	alertifytype.d.ts
                 ///////////////////////////////////////
		declare module 'alertifyjs';
	///////////////////////////////////////

2.5) in each .ts add:
		import * as alertify from 'alertifyjs';



 
