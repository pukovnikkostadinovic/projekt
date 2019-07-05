const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require("../src/models/User");

module.exports = function(passport){
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) =>{
			User.findAll({where:{email:email}})
			.then(user => {
				if(!user[0]){
					return done(null, false, { message: 'That email is not registered' });
				}
				
				bcrypt.compare(password, user[0].password, (err, isMatch) => {
					if(err) throw err;
					if(isMatch){
						if(user[0].raz_ovl==1){
						return done(null, user[0]);
						}else{
							return done(null, false, { message: 'Račun Vam još nije aktiviran' });
						}
					} else {
							return done(null, false, { message: 'Password incorrect' });
							}

				});
				
			})
			.catch(err=> console.log(err))
		})
	);

	 passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            User.findAll({where:{id:id}}).then(function(user){
                done(null, user);
            }).catch(function(e){
                done(e, false);
            });
        });
	
}