const { Router } = require('express');
const controller = require('./admin-controller');
const multer = require('multer');
const upload = multer({ dest: 'apartment-sales/static/images/added_pictures' });

const attach = (app, adminRepository, apartmentRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showAdminPanel(apartmentRepository, req, res);
        }).post('/', (req, res) => {
            controller.checkAdmin(adminRepository, apartmentRepository, req, res);
        }).get('/add', (req, res) => {
            controller.addApartment(adminRepository, apartmentRepository, req, res);
        }).post('/add', upload.any(), (req, res) => {
            controller.postApartment(adminRepository, apartmentRepository, req, res);
        }).get('/edit', (req, res) => {
            controller.editApartment(adminRepository, apartmentRepository, req, res);
        }).get('/remove', (req, res) => {
            controller.removeApartment(adminRepository, apartmentRepository, req, res);
        });
    app.use('/admin', router);
};

module.exports = attach;
