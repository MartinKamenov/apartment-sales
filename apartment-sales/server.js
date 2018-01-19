const express = require('express');
const app = express();
const path = require('path');
const homeRoute = require('./routes/home/home-route');
const propertyRoute = require('./routes/property/property-route');
const adminRoute = require('./routes/admin/admin-route');
const Database = require('./database/mongodb');
const Apartment = require('./models/Apartment');
const ApartmentRepository = require('./models/ApartmentRepository');
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
const apartmentRepository = new ApartmentRepository(database);
const adminRepository = new AdminRepository(database);

/*const apartment = new Apartment('Варна - ахтопол', 55);
apartmentRepository.insertApartment(apartment);
apartmentRepository.getAllApartments().then((apps) => {
    console.log(apps);
});*/


homeRoute(app, apartmentRepository);
adminRoute(app, adminRepository, apartmentRepository);
propertyRoute(app, apartmentRepository);

app.listen(3001, () =>
    console.log(`Magic is running at :3001`));
