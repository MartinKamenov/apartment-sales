const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const homeRoute = require('./routes/home/home-route');
const propertyRoute = require('./routes/property/property-route');
const searchRoute = require('./routes/advanced_search/search-route');
const adminRoute = require('./routes/admin/admin-route');
const Database = require('./database/mongodb');
const Property = require('./models/Property');
const PropertyRepository = require('./models/PropertyRepository');
const AdminRepository = require('./models/AdminRepository');
const bodyParser = require('body-parser');
const authConfig = require('./config/auth.config');
// const connectionstring = 'mongodb://localhost/test2-db';
const connectionstring = 'mongodb://beastmk10:doobre96@ds247357.mlab.com:47357/apartment-sales';
const sessionSecret = 'catisdog';

app.use(express.static(__dirname + '../'));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
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
const propertyRepository = new PropertyRepository(database);
const adminRepository = new AdminRepository(database);

/*const property = new Property('Варна - ахтопол', 55);
propertyRepository.insertProperty(property);
propertyRepository.getAllPropertys().then((properties) => {
    console.log(properties);
});*/

var fs = require('fs');
/*fs.readFile('../apartment-sales/FirstProperty.txt', 'utf8', function(err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
    console.log(obj);
    for (let i = 0; i < obj.data.length; i += 1) {
        console.log(obj.data[i].id);
    }
});*/

/*fs.readFile('../apartment-sales/FirstProperty.txt', 'utf8', function(err, data) {
    if (err) throw err; // we'll not consider error handling for now
    var obj = JSON.parse(data);
    const jsonProp = obj;
    const title = jsonProp.property;
    const text = jsonProp.description;
    const type = jsonProp.home_types[0].type;
    const location = jsonProp.area.area;
    const place = jsonProp.area.region.region;
    const price = jsonProp.selling_price;
    const contacts = 'Христо Георгиев\nТел. номер: 0988228857\nИмейл: estatesingreece@gmail.com\nSkype: live:estatesingreece\nНамерете ме във Viber и WhatsApp';
    const size = jsonProp.square_metres;
    const code = jsonProp.alias_id;
    const pictures = [];
    const mainPicture = jsonProp.photo;
    const latitude = jsonProp.coords.latitude;
    const longitude = jsonProp.coords.longitude;
    let rooms = jsonProp.rooms;
    if (!rooms) {
        rooms = null;
    }
    let baths = jsonProp.baths;
    if (!baths) {
        baths = null;
    }
    pictures.push('https://remax-choice.gr/images/properties/' + code + '/' + mainPicture);
    const photos = jsonProp.photos;
    if (photos) {
        for (let j = 0; j < photos.length; j += 1) {
            pictures.push('https://remax-choice.gr/images/properties/' + code + '/' + photos[j].photo);
        }
    }
    const date = new Date();
    propertyRepository.findPropertyByCode(code).then(prope => {
        if (prope.length == 0) {
            const property = new Property(title, text, type, place, location, price, contacts, size, code,
                null, null, null, null, null, rooms, baths,
                pictures, latitude, longitude, null, null, null, date);
            propertyRepository.insertProperty(property);
            console.log('added ' + jsonProp.id);
        } else {
            console.log('same code: ' + jsonProp.id);
        }
    });
});*/

/*const http = require('http');
const request = require("request");
let i = 12;
setInterval(function() {
    i += 1;
    request({
        url: 'http://api.remax-choice.gr/v1/bg/property/' + i,
        json: true,
        headers: {
            'cookie': `Authorization=Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ2M2VjZmUyNzZmNGIwZjNhZWQyMWI0NWZjYzdkZmQyZWEwNzNmMGEwOTEzNmRmMDg5YjU4Mjg1M2M1NmU4NmM3MjBkNmYzNzRkMWIyZTY1In0.eyJhdWQiOiIxIiwianRpIjoiNDYzZWNmZTI3NmY0YjBmM2FlZDIxYjQ1ZmNjN2RmZDJlYTA3M2YwYTA5MTM2ZGYwODliNTgyODUzYzU2ZTg2YzcyMGQ2ZjM3NGQxYjJlNjUiLCJpYXQiOjE1MTYwODYzNTAsIm5iZiI6MTUxNjA4NjM1MCwiZXhwIjoxODMxNjE5MTUwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.6PqWOYfSbm2hczt9kB4k0HvOlz9eC_4UtBg1s2Cjpfwqp79hRLL61J7Aij2qplLPbNEfVepnd9Sfk74XSFHqd6beCvEW6ZIZngi2tANe0kxgmMz60iD8BT_J2Z8P_GWQ01p_wZAWQMMfa6DCqgoMoWFe4Kz4aHmUcVvieMP43YAvcGBnoaUDnyhwinlZ9meQ_nUkOdLqXotlooYJ83nbf9T50AsUtSfVRXjvSWhU0umPjOHRmt-UjigDvwn9iKZxtVXkw1i4KDA-8aKU9cVUGWKjE-u71-YZ2wDRyaLFHEaxefTsCX8O7ohQGp23UcAzBIl3dkkii94uN8k65BE67R4wxYV79pJTs9dpN4ZKymCUbPgghim03LeHUS6mMLndmoHhMrlWrCg6CQygo22z2qk3g8VyyjqKuUNZB7QYNUn8TD3xLUCKsFMIXYsVEcLbtNu_PaAS5_woIujc6-KseUsGT7VaGsvyfwhfIT6ZWjI0Lnr_mgAGqdpoVNSht8ivlQeHW1-5SbAeamXbIWOEnnmP2UezVTNCGzkdyfGX9yCV_nt5EvCZ5ATJ3fXEBJjfrv5SQfNm0dk7B1jusgBr8vgku5sTH8n2F1704BEJr4nul84QKVidtzkjD7Jh-LhtcLdJrT53iZExHoqXNxpyp3xj1GDqdsD1D50CbZwJBYg`
        }
    }, async function(error, response, body) {
        if (response.statusCode === 200) {
            const jsonProp = body;
            const title = jsonProp.property;
            const text = jsonProp.description;
            const type = jsonProp.home_types[0].type;
            const location = jsonProp.area.area;
            const place = jsonProp.area.region.region;
            const price = jsonProp.selling_price;
            const contacts = 'Христо Георгиев\nТел. номер: 0988228857\nИмейл: estatesingreece@gmail.com\nSkype: live:estatesingreece\nНамерете ме във Viber и WhatsApp';
            const size = jsonProp.square_metres;
            const code = jsonProp.alias_id;
            const pictures = [];
            const mainPicture = jsonProp.photo;
            const latitude = jsonProp.coords.latitude;
            const longitude = jsonProp.coords.longitude;
            let rooms = jsonProp.rooms;
            if (!rooms) {
                rooms = null;
            }
            let baths = jsonProp.baths;
            if (!baths) {
                baths = null;
            }
            pictures.push('https://remax-choice.gr/images/properties/' + code + '/' + mainPicture);
            const photos = jsonProp.photos;
            if (photos) {
                for (let j = 0; j < photos.length; j += 1) {
                    pictures.push('https://remax-choice.gr/images/properties/' + code + '/' + photos[j].photo);
                }
            }
            const date = new Date();
            propertyRepository.findPropertyByCode(code).then(prope => {
                if (prope.length == 0) {
                    const property = new Property(title, text, type, place, location, price, contacts, size, code,
                        null, null, null, null, null, rooms, baths,
                        pictures, latitude, longitude, null, null, null, date);
                    propertyRepository.insertProperty(property);
                    console.log('added ' + jsonProp.id);
                } else {
                    console.log('same code: ' + jsonProp.id);
                }
            });
        } else {
            console.log('404 = ' + i);
        }
    });
}, 1500);*/

authConfig(app, adminRepository);
homeRoute(app, propertyRepository);
adminRoute(app, adminRepository, propertyRepository);
propertyRoute(app, propertyRepository);
searchRoute(app, propertyRepository);

app.listen(process.env.PORT || 5000);
