const Komponenta_v1 = require("../src/models/Komponenta_v1");
const Komp_lok_kol_v1 = require("../src/models/Komp_lok_kol_v1");
const Komp_lok_kol_v2 = require("../src/models/Komp_lok_kol_v2");
const Kategorija= require("../src/models/Kategorija");
const Komponenta = require("../src/models/Komponenta");
const Lokacija = require("../src/models/Lokacija");
const Komp_lok_kol = require("../src/models/Komp_lok_kol");

const fs = require('fs');


module.exports = {

komponentePage: (req, res) => {

	let kateg_id=req.params.id;
        Komponenta_v1.findAll({
		where:{
				kateg_id: kateg_id
				}
	}).then(komponente=>{
		res.render('komponente.ejs', {
                title: "Komponenta"
                ,komponente: komponente
            });
	});

},
komplokPage: (req, res) => {
        let kompId = req.params.id;

	Komp_lok_kol_v1.findAll({
		where:{
				komp_id: kompId
				}
	}).then(komp_lok_kol=>{
		res.render('komplok.ejs', {
                title: "Komponenta lokacija"
                ,komplok: komp_lok_kol,
		 kid:kompId
            });
	});
    },
sveKompPage: (req, res) => {
      
	let kategorije = Kategorija.findAll({});
	let komponente= Komponenta.findAll({});

	Promise
			.all([kategorije,komponente])
			.then(results=>{
				res.render('sve-komp.ejs',{
					title:'Sve Komponente',
					svekomp:results[1],
					kat: results[0]
				});
				console.log(results[0]);
			});

    },
addKategPage: (req, res) => {
        res.render('add-kateg.ejs', {
            title:"Dodavanje kategorije"
            ,message: ''
        });
    },

addKateg: (req, res) => {
        let message = '';	
	let kategorija = new Kategorija;
	
	kategorija.ime_kategorije=req.body.ime_kateg;
	kategorija.kratak_opis = req.body.kr_opis;
	kategorija.save().then(()=>{
		res.redirect('/');
	});

},
deleteKateg: (req, res) => {
        let kategId = req.params.id;
        
	Kategorija.destroy({
   	where: {
      	id: kategId
   	}
	}).then(()=> {
		res.redirect('/');
		});
		
    },
editKategPage: (req, res) => {
        let kategId = req.params.id;
        
	Kategorija.findAll({
	where:{
			id:kategId
			}

	}).then(result=>{
		res.render('edit-kateg.ejs', {
                title: "Izmjeni Kategoriju"
                ,kategorija: result[0]
                ,message: ''
            });
	});
    },
editKateg: (req, res) => {
        let kategId = req.params.id;
        let ime_kategorije = req.body.ime_kat;
        let kratak_opis = req.body.kr_op;
	
	Kategorija.update({
  	ime_kategorije: ime_kategorije,
	kratak_opis: kratak_opis,
	},
	{
	where:{
			id: kategId
			}
		}).then(() => {
			res.redirect('/');
				});
	
    },
editKompLokPage: (req, res) => {
        let komplokId = req.params.id;
                
	let komp_lok_kol_v2 = Komp_lok_kol_v2.findAll(
	{
		where: {
				id: komplokId
				}
	});
	
	let lokacija = Lokacija.findAll({});

	Promise
			.all([komp_lok_kol_v2,lokacija])
			.then(results=>{
				res.render('edit-komp-lok.ejs',{
					title:'Izmjeni Lokaciju i količinu',
					lok_kol:results[0][0],
					lokacije: results[1],
					message: ''
				});
			});

    },
editKompLok: (req, res) => {
        let komplokId = req.params.id;
        let kol = req.body.kolicina;
        let lokacijaId = req.body.lokacija;
	

	Komp_lok_kol.update({
  	kolicina: kol,
	lok_id: lokacijaId,
	},
	{
	where:{
			id: komplokId
			}
		}).then(() => {
			Komp_lok_kol.destroy({
		   	where: {
		      	kolicina: 0
		   	}
			}).then(()=> {
			res.redirect('/');
				});
				});
	
    },
addKompPage: (req, res) => {
        
	Kategorija.findAll({}).then(results => {
		res.render('dodaj-komp.ejs', {
                 title:"Dodaj Komponentu",
                  message: '',
	         kategorije:results
        });
	});
        
    },

addKomp: (req, res) => {

	let komponenta = new Komponenta;
	
	komponenta.ime_komponente=req.body.ime_komp;
	komponenta.kratak_opis_komp = req.body.kr_op;
	komponenta.kateg_id = req.body.kategorija;
	
	komponenta.save().then(()=>{
		res.redirect('/');
	});

    },



}