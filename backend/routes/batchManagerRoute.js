const routes = require("express").Router();
const nodemailer = require("nodemailer");
const applicationModel = require("../models/applicationModel");

const loginRequired = (req, res, next) => {
	if (req.user && req.user.isBatchManager) {
		console.log('bm');
		next();
	} else {
		return res.status(401).json({ message: "Unauthorized user!" });	
	}
};


routes.get("/applications",(req, res) => {
    try {
			applicationModel.find({}, (err,data) => {
                if(err){
                    res.json(err);
                }else{
                    res.status(200).json(data)
                }
            })
			// .select("_id name course batch isApproved");
			
		} catch (error) {
			res.status(500).json(error);
		}
});

routes.get("/:id/application", loginRequired, async (req, res) => {
	try {
		applicationModel.findOne({_id : req.params.id},(err, data) => {
				if (err) {
					res.json(err);
				} else {
					res.status(200).json(data);
				}
			})
	} catch (error) {
		res.status(500).json(error);
	}
});
  
routes.put("/:id/approveapplication", async (req, res) => {
    try {
		console.log(req.body.id );
			await applicationModel.findOneAndUpdate({ _id:req.params.id },  { isApproved: "approved" }, (err, data) => {
				if (err) {
					res.json(err);
				} else {            
					res.status(200).json(data._id +  " is approved");
				} 
			});
		} catch (error) {
			res.status(500).json(error);
		} 
});

routes.put("/:id/rejectapplication", loginRequired, (req, res) => {
    try {
			console.log(req.params.id );
	 		applicationModel.findOneAndUpdate({ _id: req.params.id }, {isApproved:"rejected"}, (err, data) => {
				if (err) {
					res.json(err);
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
                        to: data.email,
                        subject: "Test mail by ID",
                        text: "Approved mail for ID Generator",
                        html: `Application no ${data._id} is rejected`,
                    };

                    mailTransporter.sendMail(mailDetails, function (err, data) {
                        if (err) {
                            res.status(500).json("Mail send Unsucessfull");
                            console.log(err);
                        } else {
                            console.log(data);
                        }
                    });                    
					res.status(200).json(data._id+"is rejected");
				}
			});
		} catch (error) {
			res.status(500).json(error);
		}
});

module.exports = routes;