const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');





const app = express();

const router = express.Router();



const port = 8000;

require('./config/passport')(passport);

// DB connection
require('./src/database/connection');
const { ensureAuthenticated } = require('./config/auth');
const {getKategKomp} = require('./routes/index');
const {komponentePage,komplokPage,sveKompPage,addKategPage,
		addKateg, deleteKateg, editKategPage, editKateg, editKompLokPage,
		editKompLok, addKompPage, addKomp, editKompPage, editKomp,
		deleteKomp, addKompLokPage, addKompLok		
		} = require('./routes/komponenta');

const {getLoginPage, getRegPage,
		getReg, getLogin, logOut} = require('./routes/users');


// MIddlieware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.json()); // parse form data client
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next)=>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();

});





app.get('/',getKategKomp);
app.get('/kateg/:id',komponentePage);
app.get('/komp/:id',komplokPage);
app.get('/sve_komp', sveKompPage);
app.get('/dod',ensureAuthenticated,addKategPage);
app.get('/izbrisi/:id', ensureAuthenticated, deleteKateg);
app.get('/izmjeni/:id', ensureAuthenticated, editKategPage);
app.get('/izmjeni_komplok/:id', ensureAuthenticated, editKompLokPage);
app.get('/dod_komp', ensureAuthenticated, addKompPage);
app.get('/izmjeni_komp/:id', ensureAuthenticated, editKompPage);
app.get('/izbrisi_komp/:id', ensureAuthenticated, deleteKomp);
app.get('/dod_komp_lok/:id', ensureAuthenticated, addKompLokPage);
app.get('/users/login',getLoginPage);
app.get('/users/register',getRegPage);
app.get('/logout',logOut);

app.post('/users/register',getReg);
app.post('/dod', ensureAuthenticated, addKateg);
app.post('/izmjeni/:id', ensureAuthenticated, editKateg);
app.post('/izmjeni_komplok/:id', ensureAuthenticated, editKompLok);
app.post('/dod_komp', ensureAuthenticated,  addKomp);
app.post('/izmjeni_komp/:id', ensureAuthenticated, editKomp);
app.post('/dod_komp_lok/:id', ensureAuthenticated, addKompLok);
app.post('/users/login',getLogin);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


