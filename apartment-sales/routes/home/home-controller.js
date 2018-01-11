const controller = {
    showHome(apartmentRepository, req, res) {
        apartmentRepository.getAllApartments().then(apartments => {
            res.render('home', { apartments });
        });
    },

};

// @ts-ignore
module.exports = controller;
