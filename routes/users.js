const bcrypt = require('bcryptjs');
const User = require("../src/models/User");
const passport = require('passport');

module.exports = {

getLoginPage: (req, res) => {
        res.render('login.ejs',{
	title:'Login'
});
    },
getRegPage: (req, res) => {
        res.render('register.ejs', {
                    title: "Register",
                });
    },
getReg: (req, res) => {
	const { name, email, password, password2 } = req.body;
	let dupl;        
	let errors = [];
	let hashed_pass;
	if(!name || !email || !password || !password2){
		errors.push({msg: 'Potrebno popuniti sva polja' });
	}

	if(password !== password2){
		errors.push({msg:'Lozinke se ne podudaraju' });
	}
	
	if(password.length < 6){
		errors.push({msg:'Lozinka mora sadržavat minimalno 6 znakova' });
	}

    	
	if(errors.length > 0){
		res.render('register.ejs', {
                   	title: "Register",
			errors,
			name,
			email,
			password,
			password2
                });
	} else {
	
	User.findAll(
	{
		where:{
				email:email
				}
	}).then(user => {
		if(user[0]){
			//user exists
			errors.push({msg: 'Email is already registered'});
			res.render('register.ejs', {
                   	title: "Register",
			errors,
			name,
			email,
			password,
			password2
                				});
				}else{
					const newUser = new User;
					newUser.name= name;
					newUser.email = email;

					bcrypt.genSalt(10, (err, salt) => 
					bcrypt.hash(password, salt, (err, hash) =>{
					if(err) throw err;
					
					newUser.password = hash;
					newUser.save()
						.then(user => {
							req.flash('success_msg', 'Uspjesno si se registrirao');
							res.redirect('/users/login');
						})
						.catch(err => console.log(err));	
						
						}));
						}
	});
		
}
   
 },

getLogin: (req,res,next)=>{
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req,res,next);
},

logOut:(req,res)=>{
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');

}

}
