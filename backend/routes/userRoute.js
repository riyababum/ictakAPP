const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");


routes.post("/reg", async (req, res) => {
	try {
		const takenmail = await userModel.findOne({ email: req.body.email });
		if (takenmail) {
			res.json({ message: "Email has already been taken" });
		} else {
			let password = await bcrypt.hash(req.body.password, 10);
			const user = new userModel({
				name: req.body.name,
				email: req.body.email,
				hashPassword: password
			});
			await user.save((err, user) => {
				if (err) {
					return res.status(400).send({
						message: err,
					});
				} else {
					user.hashPassword = undefined;
					return res.status(200).json({message:'Successfully Registered. Please Log In'});
				}
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}	
});

routes.post("/login", async (req, res) => {
	try {
		const { email } = req.body;
		userModel.findOne({ email: email },(err, user) => {
        if (err) {throw err;}
        if (!user) {
            res.json({ message: 'Authentication failed. No user found'});
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.json({ message: 'Authentication failed. Wrong password'});
            } else {
                return res.json({token: jwt.sign({ isAdmin: user.isAdmin, isBatchManager: user.isBatchManager, email: user.email, username: user.username, _id: user.id}, 'RESTFULAPIs'), message: 'Login Successfull'});
            }
        }
    })
	} catch (error) {
		res.status(500).json(error);
		console.log('error');
	}
});


module.exports = routes;
