const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const homeRoute = require('./routes/home/home-route');
const propertyRoute = require('./routes/property/property-route');
const searchRoute = require('./routes/advanced_search/search-route');
const adminRoute = require('./routes/admin/admin-route');
const newsRoute = require('./routes/news/news-route');
const Database = require('./database/mongodb');
const Property = require('./models/Property');
const PropertyRepository = require('./models/PropertyRepository');
const AdminRepository = require('./models/AdminRepository');
const NewsRepository = require('./models/NewsRepository');
const bodyParser = require('body-parser');
const authConfig = require('./config/auth.config');
const connectionstring = 'mongodb://beastmk10:doobre96@ds247357.mlab.com:47357/apartment-sales';
const sessionSecret = 'catisdog';

app.use(express.static(__dirname + '../'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
//app.use('/', express.static(path.join(__dirname, './static/google')));
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000000,
    },
}));

const database = new Database(connectionstring);
const propertyRepository = new PropertyRepository(database, 'properties');
const adminRepository = new AdminRepository(database);
const newsRepository = new NewsRepository(database);

authConfig(app, adminRepository);
homeRoute(app, propertyRepository);
adminRoute(app, adminRepository, propertyRepository, newsRepository);
propertyRoute(app, propertyRepository);
searchRoute(app, propertyRepository);
newsRoute(app, newsRepository);

app.listen(process.env.PORT || 5000);
