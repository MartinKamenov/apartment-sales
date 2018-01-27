const express = require('express');
const app = express();
const path = require('path');
const homeRoute = require('./routes/home/home-route');
const propertyRoute = require('./routes/property/property-route');
const adminRoute = require('./routes/admin/admin-route');
const Database = require('./database/mongodb');
const Property = require('./models/Property');
const PropertyRepository = require('./models/PropertyRepository');
const AdminRepository = require('./models/AdminRepository');
const bodyParser = require('body-parser');
// const connectionstring = 'mongodb://localhost/test2-db';
const connectionstring = 'mongodb://beastmk10:doobre96@ds247357.mlab.com:47357/apartment-sales';

app.use(express.static(__dirname + '../'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));

const database = new Database(connectionstring);
const propertyRepository = new PropertyRepository(database);
const adminRepository = new AdminRepository(database);

/*const property = new Property('Варна - ахтопол', 55);
propertyRepository.insertProperty(property);
propertyRepository.getAllPropertys().then((properties) => {
    console.log(properties);
});*/


homeRoute(app, propertyRepository);
adminRoute(app, adminRepository, propertyRepository);
propertyRoute(app, propertyRepository);

app.listen(process.env.PORT || 5000);
