/* upload and post users. */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
	  cb(null, file.originalname)
	  var post = req.body;
	  db.query('INSERT INTO workers SET ?',{rfid: post.rfid,nome: post.nome, dept: post.depto, turno: post.turno, email: post.email, receiver: post.receiver, sourceAmount: post.sourceAmount, foto: file.originalname});
	}
})
