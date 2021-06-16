const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const MongoClient = require('mongodb').MongoClient;
const fetch = require('node-fetch');
const uri = "url";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
var database = null;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

client.connect(err => {
    if (err) throw err;
    database = client.db('TestMERN');
    app.listen(3000);
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: {success: false, data:'You are being rate limited'}
});
app.post('/api/:request', apiLimiter, (req, res) => {
    if (req.params.request == 'like') {
        const secret_key = '6Lf_urcZAAAAAHNLkCQPG5gX8NpMp0Gmk13nbU5T';
        const token = req.body['g-recaptcha-response'];
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

        fetch(url, {
            method: 'post'
        })
            .then(response => response.json())
            .then(google_response => {
                if (google_response.success) {
                    var presentationLikes = null;
                    database.collection('TestMERN').find().forEach((doc) => {
                        presentationLikes = doc.likes;
                    }, function (err) {
                        if (err) throw err;
                        if (!presentationLikes.includes(req.socket.remoteAddress)) {
                            presentationLikes.push(req.socket.remoteAddress)
                            database.collection('TestMERN').updateOne({ id: '60ca042c066fdec5c5518781' }, { $set: { likes: presentationLikes } }, (err, result) => {
                                if (err) throw err;
                                if (result) {
                                    res.send({
                                        success: true,
                                        data: 'Success'
                                    });
                                }
                            });
                        } else {
                            res.send({
                                success: false,
                                data: 'Already liked with this ip'
                            });
                        }
                    });
                } else {
                    res.send({
                        success: false,
                        data: 'Recaptcha invalid'
                    });
                }
            })
            .catch(error => console.log(error));
        //database.collection('TestMERN').find()[0];
    } else if (req.params.request == 'getLikes') {
        //database.collection('TestMERN').find()[0];
        var presentationLikes = null;
        database.collection('TestMERN').find().forEach((doc) => {
            presentationLikes = doc.likes;
        }, function (err) {
            if (err) throw err;
            res.send({
                success: true,
                data: presentationLikes.length
            });
        });
    }
});