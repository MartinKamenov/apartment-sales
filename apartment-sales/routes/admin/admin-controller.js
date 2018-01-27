const Property = require('../../models/Property');
const notifier = require('node-notifier');

const controller = {
    showAdminPanel(propertyRepository, req, res) {
        res.render('admin-login');
    },
    checkAdmin(adminRepository, propertyRepository, req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.redirect('/');
            return;
        }
        adminRepository.findAdmin(username, password).then((admins) => {
            if (admins.length !== 1) {
                res.redirect('/');
                return;
            }
            const admin = admins[0];

            res.redirect('/admin/add');
        });
    },
    addProperty(adminRepository, propertyRepository, req, res) {
        res.render('addProperty');
        /*adminRepository.findAdmin(username, password).then((admins) => {

        });*/
    },
    postProperty(adminRepository, propertyRepository, req, res) {
        const type = req.body.type;
        const title = req.body.title;
        const text = req.body.text;
        const price = req.body.price;
        const place = req.body.place;
        const size = req.body.size;
        const contacts = req.body.contacts;
        var firstLine = req.body.firstLine;
        var parkingSpot = req.body.parkingSpot;
        var view = req.body.view;
        var pool = req.body.pool;
        var furnished = req.body.furnished;
        const code = req.body.code;
        const filename = req.files[0].filename;
        const picturesNames = [];
        for (let i = 0; i < req.files.length; i += 1) {
            picturesNames.push('/static/images/added_pictures/' + req.files[i].filename);
        }
        if (!type || !title || !text || !price || !place || !contacts || !code || !size) {
            res.send('Моля попълнете всички полета.');
            return;
        }

        const property = new Property(title, text, type, place, price, contacts, size, code,
            firstLine, parkingSpot, view, pool, furnished, picturesNames);
        propertyRepository.insertProperty(property);
        notifier.notify('Успешно добавено!');
        res.redirect('/admin/add');
        /*adminRepository.findAdmin(username, password).then((admins) => {

        });*/
    },
    removeProperty(adminRepository, propertyRepository, req, res) {
        res.render('removeProperty');
    },
    postRemoveProperty(adminRepository, propertyRepository, req, res) {
        const code = req.body.code;
        if (!code) {
            res.send('Code should be added');
            return;
        }
        propertyRepository.removeProperty(code);
        notifier.notify('Успешно премахнат имот с код: ' + code + '!');
        res.redirect('/admin/remove');
    }

};

// @ts-ignore
module.exports = controller;
