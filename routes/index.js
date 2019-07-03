const Kategorija = require("../src/models/Kategorija");



module.exports = {
getKategKomp: (req, res) => {

Kategorija.findAll({
		attributes:['id','ime_kategorije','kratak_opis']
	}).then(kategorije=>{
		res.render('kateg.ejs', {
                title: "Baza komponenti"
                ,kategorije: kategorije
            });
	});
}
}