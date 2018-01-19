const Apartment = require('../../models/Apartment');

const controller = {
    showAdminPanel(apartmentRepository, req, res) {
        res.render('admin-login');
    },
    checkAdmin(adminRepository, apartmentRepository, req, res) {
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
    addApartment(adminRepository, apartmentRepository, req, res) {
        res.render('addApartment');
        /*adminRepository.findAdmin(username, password).then((admins) => {

        });*/
    },
    postApartment(adminRepository, apartmentRepository, req, res) {
        const type = req.body.type;
        const title = req.body.title;
        const text = req.body.text;
        const price = req.body.price;
        const place = req.body.place;
        const size = req.body.size;
        const rooms = req.body.rooms;
        var firstLine = req.body.firstLine;
        var parkingSpot = req.body.parkingSpot;
        var view = req.body.view;
        var pool = req.body.pool;
        var furnished = req.body.furnished;
        const code = req.body.code;
        const filename = req.files[0].filename;
        if (!type || !title || !text || !price || !place || !rooms || !code || !size) {
            res.send('Моля попълнете всички полета.');
            return;
        }

        const apartment = new Apartment(title, text, type, place, rooms, price, size, code,
            firstLine, parkingSpot, view, pool, furnished, filename);
        apartmentRepository.insertApartment(apartment);
        res.redirect('/admin/add');
        /*adminRepository.findAdmin(username, password).then((admins) => {

        });*/
    },
    removeApartment(adminRepository, apartmentRepository, req, res) {
        res.render('removeProperty');
    },
    postRemoveApartment(adminRepository, apartmentRepository, req, res) {
        const code = req.body.code;
        if (!code) {
            res.send('Code should be added');
            return;
        }
        apartmentRepository.removeApartment(code);
        res.render('removeProperty');
    }

};

// @ts-ignore
module.exports = controller;
