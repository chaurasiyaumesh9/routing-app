var express    = require('express')   ;
var router= express.Router();
var multer  =   require('multer');
var fs = require('fs');  

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/img');
  },
  filename: function (req, file, callback) {
    //callback(null, file.fieldname + '-' + Date.now());
	var datetimestamp = Date.now();
     callback(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});
//var upload = multer({ storage : storage}).array('userPhoto', 12);
var upload = multer({ storage : storage}).single('userPhoto');
router.get('/',function(req,res){
      res.sendFile(__dirname + "/public/pages/fileupload.html");
});

router.post('/',function(req,res){
    upload(req,res,function(err) {
        if(err) {
			console.log( err );
            return res.end("Error uploading file.",err);
        }
        res.redirect("/");
    });
});




module.exports = router;
