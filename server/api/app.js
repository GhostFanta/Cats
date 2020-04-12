let http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose')

console.log(process.env.NODE_ENV)

let isProd = process.env.NODE_ENV === 'production';

let app = express();

if(isProd) {
    mongoose.connect('mongodb://cat_mongo/cats')
}else{
    mongoose.connect('mongodb://localhost/cats');
    mongoose.set('debug',true);
}

require('./models/RecenetSearch');

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes'));

let server = app.listen(process.env.PORT ||  3000 ,function () {
    console.log('Listening on port ' + server.address().port);
});

