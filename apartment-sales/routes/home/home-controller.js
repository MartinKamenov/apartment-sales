const controller = {
    showHome(apartmentRepository, req, res) {
        apartmentRepository.getAllApartments().then(apartments => {
            res.render('test', { apartments });
        });
    },

};

// @ts-ignore
module.exports = controller;
