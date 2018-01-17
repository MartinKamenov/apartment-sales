const pageHandler = require('../../models/paging');

const controller = {
    showHome(apartmentRepository, req, res) {
        var page = req.query.page;
        page = pageHandler.choosePage(page);
        apartmentRepository.getAllApartments().then(apartments => {

            const result = pageHandler.handle(apartments, page, 2);
            const foundApartments = result.filteredCollection;
            const pagesCount = result.numberOfPages;
            const pages = result.navigationNumbers;
            const cityArray = [];
            var found = false;
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

            res.render('home', { apartments: foundApartments, cityArray, pagesCount, pages, currentPage: page });
        });
    },

};

// @ts-ignore
module.exports = controller;
