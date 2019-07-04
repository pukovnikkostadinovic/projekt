const fs = require('fs');



const Komponenta_v1 = require("../src/models/Komponenta_v1");
const Komp_lok_kol_v1 = require("../src/models/Komp_lok_kol_v1");
const Komp_lok_kol_v2 = require("../src/models/Komp_lok_kol_v2");
const Kategorija= require("../src/models/Kategorija");
const Komponenta = require("../src/models/Komponenta");
const Lokacija = require("../src/models/Lokacija");
const Komp_lok_kol = require("../src/models/Komp_lok_kol");
const img_path = require('../config/keys').img_path;

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

editKompPage: (req,res)=>{
	let kompId=req.params.id;
	
	let komponenta = Komponenta.findAll({
		where:{
				id: kompId
				}
	});
	let kategorija = Kategorija.findAll({});	

	Promise
			.all([komponenta,kategorija])
			.then(results=>{
				res.render('edit-komp.ejs',{
					title:'Izmjeni Komponentu',
					komponenta:results[0][0],
					kategorije: results[1],
					message: ''
				});
			});

},
editKomp: (req, res) => {
        let kompId = req.params.id;
        let ime_komponente = req.body.ime_komp;
        let kategorija = req.body.kategorija;
	let kr_opis = req.body.kr_op;
	let slika;
	let uploadedFile;
        let image_name = req.body.slika;
        let fileExtension;
	let obrisi;

	if( image_name.length > 0){
		obrisi = req.body.brisisl;
		image_name=req.body.slika;
		if(obrisi == 1){
		fs.unlink(img_path+image_name, (err) => {
					if (err) throw err;
		  			console.log('public/assets/img/'+image_name+' was deleted');
				});
			image_name = null;
		    }

	}else{
		slika=req.body.slika;
		uploadedFile = req.files.image;
 		 //let img_name = uploadedFile.name;
		image_name= uploadedFile.name;
        	fileExtension = uploadedFile.mimetype.split('/')[1];
		uploadedFile.mv(img_path+`${image_name}`, (err ) => {
                       if (err) {
                           return res.status(500).send(err);
                        }
		image_name= "'"+image_name+"'";
		});
	
			}

	Komponenta.update({
  	ime_komponente: ime_komponente,
	kratak_opis_komp: kr_opis,
	slika: image_name,
	kateg_id: kategorija
	},
	{
	where:{
			id: kompId
			}
		}).then(() => {
			res.redirect('/');
				});
	
    },
deleteKomp: (req, res) => {
        let kompId = req.params.id;
	
	Komponenta.findAll({
		where:{
				id: kompId
				}
	}).then(result => {
	if(result[0].slika){
		fs.unlink(img_path+result[0].slika, (err) => {
					if (err) throw err;
		  			console.log('public/assets/img/'+result[0].slika+' was deleted');
				});
	}
	Komponenta.destroy({
   	where: {
      	id: kompId
   	}
	}).then(()=> {
		res.redirect('/');
		});
	});

        /*let deleteKompQuery = 'DELETE FROM komponente WHERE id = "' + kompId + '"';

                       db.query(deleteKompQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                     });*/
    },
addKompLokPage:(req,res)=>{
	 Lokacija.findAll({}).then( result =>{
		res.render('add-komp-lok.ejs', {
                title: "Dodaj lokaciju i količinu"
                ,lokacije: result
            });

	});

	/*let query="select * from lokacije";
	
	db.query(query,(err,result)=>{
		if(err){
			return res.status(500).send(err);
		}
		res.render('add-komp-lok.ejs', {
                title: "Dodaj lokaciju i kolicinu"
                ,lokacije: result
            });
	});*/	
},
addKompLok:(req,res)=>{
	let kompId=req.params.id;
	let kolicina=req.body.kolicina;
	let lokId=req.body.lokacija;
	
	let komp_lok_kol = new Komp_lok_kol;
	
	komp_lok_kol.komp_id = req.params.id;
	komp_lok_kol.lok_id = req.body.lokacija;
	komp_lok_kol.kolicina = req.body.kolicina;
	
	komp_lok_kol.save().then(()=>{
		res.redirect('/');
	});

},


}