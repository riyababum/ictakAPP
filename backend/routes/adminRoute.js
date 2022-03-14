const routes = require("express").Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const userModel = require("../models/userModel");
const batchModel = require("../models/batchModel");
const courseModel = require("../models/courseModel");

const loginRequired = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		return res.status(401).json({ message: "Unauthorized user!" });
	}
};

//batchmanager CRUD
routes.post("/regbatchmanager", loginRequired, async (req, res) => {
	try {
		const takenmail = await userModel.findOne({ email: req.body.email });
		if (takenmail) {
			res.json({ message: "Email has already been taken" });
		} else {
			password = await bcrypt.hash(req.body.password, 10);
			const user = new userModel({
				name: req.body.name,
				email: req.body.email,
				hashPassword: password,
				isBatchManager: true,
			});
			await user.save((err, user) => {
				if (err) {
					return res.status(400).send({
						message: err,
					});
				} else {
					let mailTransporter = nodemailer.createTransport({
						service: "gmail",
						auth: {
							user: "nodemailer96@gmail.com",
							pass: "nayanthara@96",
						},
					});

					let mailDetails = {
						from: "nodemailer96@gmail.com",
						to: req.body.email,
						subject: "Test mail by ID",
						text: "Credential mail for ID Generator",
						html: `Email: ${req.body.email} <br/> Password: ${req.body.password}`,
					};

					mailTransporter.sendMail(mailDetails, function (err, data) {
						if (err) {
							res.status(500).json("Mail send Unsucessfull");
							console.log(err);
						} else {
							console.log(data);
							user.hashPassword = undefined;
							return res.status(200).json({ user });
						}
					});
					user.hashPassword = undefined;
					return res.status(200).json({ user });
				}
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.get("/getbatchmanager", loginRequired, (req, res) => {
	try {
		userModel
			.find({ isBatchManager: true }, (err, user) => {
				if (err) {
					throw err;
				} else {
					res.status(200).json(user);
				}
			})
			.select("_id name email");
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.delete("/:id/deletebatchmanager", loginRequired, (req, res) => {
	try {
		userModel.findByIdAndDelete(req.params.id, (err, info) => {
			if (err) {
				throw err;
			} else {
				return res.status(200).json("Deleted Successfully");
			}
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

//course CRUD
routes.post("/createcourse", loginRequired, async (req, res) => {
	try {
		const course = new courseModel({
			name: req.body.name,
		});
		await course.save((err, course) => {
			if (err) {
				return res.status(400).send({
					message: err,
				});
			} else {
				return res.status(200).json(course);
			}
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.get("/getcourse", (req, res) => {
	try {
		courseModel.find((err, course) => {
			if (err) {
				throw err;
			} else {
				res.status(200).json(course);
			}
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.put("/:id/editcourse", loginRequired, (req, res) => {
	try {
		const course = {
			name:req.body.name
		}
		if(req.body.name === ""){
			res.json("Fields cannot be empty")
		}else{
			courseModel.findByIdAndUpdate({_id:req.params.id}, course, (err, data) => {
				if (err) {
					res.json(err);
				}else {
					res.status(200).json(data+"course updated");
				}
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.delete("/:id/deletecourse", loginRequired, (req, res) => {
	try {
		courseModel.findByIdAndDelete(req.params.id, (err, info) => {
			if (err) {
				throw err;
			} else {
				return res.status(200).json(info+"Deleted Successfully");
			}
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

//Batches CRUD
routes.post("/createbatch", loginRequired, async (req, res) => {
	try {
		const batch = new batchModel({
			batchName: req.body.batchname,
			course: req.body.course,
			startDate: req.body.sdate,
			endDate: req.body.edate,
			owner: req.body.owner,
		});
		await batch.save((err, batch) => {
			if (err) {
				return res.status(400).send({
					message: err,
				});
			} else {
				return res.status(200).json(batch);
			}
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.get("/getbatch", (req, res) => {
	try {
		batchModel.find((err, batch) => {
			if (err) {
				throw err;
			} else {
				res.status(200).json(batch);
			}
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.put("/:id/editbatch", loginRequired, (req, res) => {
	try {
		const batch = {
			batchName: req.body.batchname,
			course: req.body.course,
			startDate: req.body.sdate,
			endDate: req.body.edate,
			owner: req.body.owner,
		};
		if (req.body.batchname === "") {
			res.json("Fields cannot be empty");
		} else {
			batchModel.findByIdAndUpdate({ _id: req.params.id }, batch, (err, data) => {
				if (err) {
					res.json(err);
				} else {
					res.status(200).json(data + "course updated");
				}
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

routes.delete("/:id/deletebatch", loginRequired, (req, res) => {
	try {
		batchModel.findByIdAndDelete(req.params.id, (err, info) => {
			if (err) {
				throw err;
			} else {
				return res.status(200).json("Deleted Successfully");
			}
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = routes;
