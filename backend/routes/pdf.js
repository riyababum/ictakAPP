var pdfmake = require('pdfmake');
const routes = require("express").Router();
const applicationModel = require("../models/applicationModel");

  routes.get('/generate-pdf/', async(req, res) => {

    const app = await applicationModel.findOne({student:req.user._id});
        const { student, phone, photo,  ...appstat } = app._doc;
        console.log(appstat);
    var name = "shynu"

    const doc = new pdfmake({
      Roboto: { normal: new Buffer(require('pdfmake/build/vfs_fonts.js').pdfMake.vfs['Roboto-Regular.ttf'], 'base64') }
    }).createPdfKitDocument({ content: [
      {text: 'ICTAK', style: 'header', alignment: 'center'},
      {text: appstat.email, style: 'header', alignment: 'center'},
    ] })
    var chunks = [];
    var result;
    doc.on('readable', function () {
      var chunk;
      while ((chunk = doc.read(9007199254740991)) !== null) {
        chunks.push(chunk);
      }
    });
    doc.on('end', function () {
      result = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-disposition', 'attachment; filename=idcard.pdf');
      res.send(result);
    });
    doc.end();
  
  });

  module.exports = routes;