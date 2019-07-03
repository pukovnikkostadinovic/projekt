const Komponenta_v1 = require("../src/models/Komponenta_v1");
const Komp_lok_kol_v1 = require("../src/models/Komp_lok_kol_v1");
const Kategorija= require("../src/models/Kategorija");
const Komponenta = require("../src/models/Komponenta");

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

        let ime_kategorije = req.body.ime_kateg;
        let kratak_opis = req.body.kr_opis;
	console.log(typeof(ime_kategorije));
	console.log(kratak_opis);
	
	let kategorija = new Kategorija;
	
	kategorija.ime_kategorije= 'ahhahllllahahsdsdsahahha';
	kategorija.kratak_opis = 'odsdkkksdpis';

	kategorija.save().then(()=>{
		res.redirect('/');
	});





        /*let query = "INSERT INTO `kategorije_komponenti` (ime_kategorije, kratak_opis)  VALUES ('" +
                            ime_kategorije + "', '" + kratak_opis + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
});*/

},


}