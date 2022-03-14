const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/idg", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

//routers
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const applicationRoute = require("./routes/applicationRoute");
const batchManagerRoute = require("./routes/batchManagerRoute");
const pdfs = require("./routes/pdf");

const app = express();
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public/uploads', express.static('uploads'));
 
// JWT setup
app.use((req, res, next) => {

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) {req.user = undefined;}
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
}); 


//routes
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/application', applicationRoute);
app.use('/api/batch', batchManagerRoute);
app.use('/api/pdf', pdfs);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log("running in port" + PORT);
});
