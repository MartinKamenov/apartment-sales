const Property = require('../../models/Property');
const notifier = require('node-notifier');

const controller = {
    showAdminPanel(propertyRepository, req, res) {
        res.render('admin-login');
    },
    addProperty(adminRepository, propertyRepository, req, res) {
        checkIfAdminIsAuthenticated(req, res);
        res.render('addProperty');
    },
    postProperty(adminRepository, propertyRepository, req, res) {
        checkIfAdminIsAuthenticated(req, res);
        const type = req.body.type;
        const title = req.body.title;
        const text = req.body.text;
        const price = req.body.price;
        const place = req.body.place;
        const size = req.body.size;
        const contacts = req.body.contacts;
        const location = req.body.location;
        var firstLine = req.body.firstLine;
        var parkingSpot = req.body.parkingSpot;
        var view = req.body.view;
        var pool = req.body.pool;
        var furnished = req.body.furnished;
        const code = req.body.code;
        const filename = req.files[0].filename;
        const picturesNames = [];
        const investment = req.body.investment;
        const rooms = req.body.rooms;
        const baths = req.body.baths;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const newConstruction = req.body.newConstruction;
        const top = req.body.top;
        const date = new Date();
        for (let i = 0; i < req.files.length; i += 1) {
            picturesNames.push('/static/images/added_pictures/' + req.files[i].filename);
        }
        if (!type || !title || !text || !price || !place || !contacts || !code || !size) {
            res.send('Моля попълнете всички полета.');
            return;
        }

        const property = new Property(title, text, type, place, location, price, contacts, size, code,
            firstLine, parkingSpot, view, pool, furnished, rooms, baths, picturesNames, latitude, longitude, top, newConstruction, investment, date);
        propertyRepository.insertProperty(property);
        notifier.notify('Успешно добавено!');
        res.redirect('/admin/add');
        /*adminRepository.findAdmin(username, password).then((admins) => {

        });*/
    },
    removeProperty(adminRepository, propertyRepository, req, res) {
        checkIfAdminIsAuthenticated(req, res);
        res.render('removeProperty');
    },
    postRemoveProperty(adminRepository, propertyRepository, req, res) {
        checkIfAdminIsAuthenticated(req, res);
        const code = req.body.code;
        if (!code) {
            res.send('Code should be added');
            return;
        }
        propertyRepository.removeProperty(code);
        notifier.notify('Успешно премахнат имот с код: ' + code + '!');
        res.redirect('/admin/remove');
    },

    getCodeForEdit(propertyRepository, req, res) {
        checkIfAdminIsAuthenticated(req, res);
        res.render('codeForEdit');
    },

    editProperty(propertyRepository, req, res) {
        const code = req.params.code;
        checkIfAdminIsAuthenticated(req, res);
        propertyRepository.findPropertyByCode(code).then(properties => {
            if (properties.length != 1) {
                res.send('No property was found with code: ' + code);
                return;
            }

            const property = properties[0];
            res.render('editProperty', { property });
        });
    },

    postEditProperty(propertyRepository, req, res) {
        checkIfAdminIsAuthenticated(req, res);
        const type = req.body.type;
        const title = req.body.title;
        const text = req.body.text;
        const price = req.body.price;
        const place = req.body.place;
        const size = req.body.size;
        const contacts = req.body.contacts;
        const location = req.body.location;
        var firstLine = req.body.firstLine;
        var parkingSpot = req.body.parkingSpot;
        var view = req.body.view;
        var pool = req.body.pool;
        var furnished = req.body.furnished;
        const code = req.body.code;
        const filename = req.files[0].filename;
        const picturesNames = [];
        const investment = req.body.investment;
        const rooms = req.body.rooms;
        const baths = req.body.baths;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const newConstruction = req.body.newConstruction;
        const top = req.body.top;
        const date = new Date();
        for (let i = 0; i < req.files.length; i += 1) {
            picturesNames.push('/static/images/added_pictures/' + req.files[i].filename);
        }
        if (!type || !title || !text || !price || !place || !contacts || !code || !size) {
            res.send('Моля попълнете всички полета.');
            return;
        }

        const property = new Property(title, text, type, place, location, price, contacts, size, code,
            firstLine, parkingSpot, view, pool, furnished, rooms, baths, picturesNames, latitude, longitude, top, newConstruction, investment, date);
        updateProperty(code, property);
        notifier.notify('Успешно променен имот с код: ' + code + '!');
        res.redirect('/admin/edit');
    },

    logout(req, res) {
        checkIfAdminIsAuthenticated(req, res);
        req.logout();
        res.redirect('/admin');
    }

};

function checkIfAdminIsAuthenticated(req, res) {
    const user = req.user;
    if (!user) {
        res.redirect('/');
        return;
    }
};

// @ts-ignore
module.exports = controller;
