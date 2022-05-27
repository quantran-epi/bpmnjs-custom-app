const path = require("path");
const express = require("express");
const app = express(); // create express app
var cors = require('cors')

app.use(cors())

// add middlewares
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

// start express server on port 5000
app.listen(5000, () => {
    console.log("server started on port 5000");
});

const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "public"))
    },
})

var upload = multer({ storage: storage });

app.post('/upload', upload.single('uploaded_file'), function (req, res) {
    const file = req.file;
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)
    res.send(file)
});
