const express = require('express');
const app = express();
const path = require('path');
const home = require('./routes/home/home-route');
const admin = require('./routes/admin/admin-route');
const Database = require('./database/mongodb');
const Apartment = require('./models/Apartment');
const ApartmentRepository = require('./models/ApartmentRepository');
const AdminRepository = require('./models/AdminRepository');
// const connectionstring = 'mongodb://localhost/test2-db';
const connectionstring = 'mongodb://beastmk10:doobre96@ds247357.mlab.com:47357/apartment-sales';

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '../'));
app.use('/static', express.static(path.join(__dirname, './static')));
app.use('/libs', express.static(path.join(__dirname, '../node_modules')));

const database = new Database(connectionstring);
const apartmentRepository = new ApartmentRepository(database);
const adminRepository = new AdminRepository(database);

/*const apartment = new Apartment('Plovdiv', 5);
apartmentRepository.insertApartment(apartment);
apartmentRepository.getAllApartments().then((apps) => {
    console.log(apps);
});*/


home(app, apartmentRepository);
admin(app, adminRepository, apartmentRepository);

app.listen(3001, () =>
    console.log(`Magic is running at :3001`));
