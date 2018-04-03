const { Router } = require('express');
const controller = require('./admin-controller');
const multer = require('multer');
const mime = require('mime');
const crypto = require('crypto');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'apartment-sales/static/images/added_pictures');
    },
    filename: function(req, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});
const passport = require('passport');
const upload = multer({ storage: storage });

const attach = (app, adminRepository, propertyRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showAdminPanel(propertyRepository, req, res);
        }).post('/', passport.authenticate('local', {
            successRedirect: '/admin/add',
            failureRedirect: '/',
        })).get('/add', (req, res) => {
            controller.addProperty(adminRepository, propertyRepository, req, res);
        }).post('/add', upload.any(), (req, res) => {
            controller.postProperty(adminRepository, propertyRepository, req, res);
        }).get('/edit', (req, res) => {
            controller.getCodeForEdit(propertyRepository, req, res);
        }).get('/edit/:code', (req, res) => {
            controller.editProperty(propertyRepository, req, res);
        }).post('/edit/:code', upload.any(), (req, res) => {
            controller.postEditProperty(propertyRepository, req, res);
        }).get('/remove', (req, res) => {
            controller.removeProperty(adminRepository, propertyRepository, req, res);
        }).post('/remove', (req, res) => {
            controller.postRemoveProperty(adminRepository, propertyRepository, req, res);
        }).get('/logout', (req, res) => {
            controller.logout(req, res);
        });
    app.use('/admin', router);
};

module.exports = attach;
