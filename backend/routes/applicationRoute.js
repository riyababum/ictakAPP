const routes = require("express").Router();
const multer = require('multer');
const applicationModel = require("../models/applicationModel");
const batchModel = require("../models/batchModel");
const courseModel = require("../models/courseModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-')+ file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

const upload = multer({
    storage:storage, 
    limits :{
        fileSize: 1024 *1024 *5 // upto 5 MB
    },
    fileFilter : fileFilter
});

const loginRequired = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		return res.status(401).json({ message: "Unauthorized user!" });
	}
};

routes.post("/postapplication",upload.single('photo') , loginRequired, async(req, res) => {
	try {
        const app = new applicationModel({
            // student: req.user._id,
            // name: req.body.username,
            // email: req.body.email,
            photo: req.file.path,
            // phone: req.body.phoneno,
            // batch: req.body.batch,
            // course: req.body.coursetype,
            // startDate: req.body.startingdate,
            // endDate:req.body.endingdate
        })
        await app.save((err, app) => {
					if (err) {
						return res.status(400).send({
							message: err,
						});
					} else {
						return res.status(200).json(app);
					}
				});
		
	} catch (error) {
		res.status(500).json(error);
	}
});
routes.get("/courselist", loginRequired,  async(req, res) => {
    try {
        const courselist = await courseModel.find({});
        res.status(200).json(courselist);
    } catch (error) {
        res.status(500).json(error);
    }
});
routes.get("/batchlist", loginRequired,  async(req, res) => {
    try {
        const batchlist = await batchModel.find({});
        res.status(200).json(batchlist);
    } catch (error) {
        res.status(500).json(error);
    }
});

// routes.get("/applicationstatus", loginRequired,  async(req, res) => {
//     try {
//         const app = await applicationModel.findOne({student:req.user._id});
//         const { student, phone, photo,  ...appstat } = app._doc;
//         res.status(200).json(appstat);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });
routes.get("/applicationstatus", loginRequired,  async(req, res) => {
    try {
        const app = await applicationModel.findOne({student:req.user._id});
        const { name, email, photo, isApproved } = app;
        res.status(200).json({name, email, photo, isApproved});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = routes;
