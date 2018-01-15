const controller = {
    showHome(apartmentRepository, req, res) {
        apartmentRepository.getAllApartments().then(apartments => {
            const cityArray = [];
            const found = false;
            for (var i = 0; i < apartments.length; i += 1) {
                for (var j = 0; j < cityArray.length; j += 1) {
                    if (apartments[i].place == cityArray[j]) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    cityArray.push(apartments[i].place);
                }
            }

            console.log(cityArray);
            res.render('home', { apartments, cityArray });
        });
    },

};

// @ts-ignore
module.exports = controller;
