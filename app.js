const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const session = require('express-session');




const app = express();

const router = express.Router();



const port = 5000;



// DB connection
require('./src/database/connection');

const {getKategKomp} = require('./routes/index');
const {komponentePage,komplokPage,sveKompPage,addKategPage,
		addKateg,deleteKateg,editKategPage,editKateg
		} = require('./routes/komponenta');




// MIddlieware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder



app.get('/', getKategKomp);
app.get('/kateg/:id',komponentePage);
app.get('/komp/:id',komplokPage);
app.get('/sve_komp', sveKompPage);
app.get('/dod',addKategPage);
app.get('/izbrisi/:id', deleteKateg);
app.get('/izmjeni/:id',editKategPage);


app.post('/dod', addKateg);
app.post('/izmjeni/:id',editKateg);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


