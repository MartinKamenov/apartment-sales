const pageHandler = require('../../models/paging');

const controller = {
    showSearch(propertyRepository, req, res) {
        var page = req.query.page;
        page = pageHandler.choosePage(page);
        let params = {};
        const type = req.query.type;
        if (type) {
            params.type = type;
        }
        const place = req.query.place;

        let showBar = false;
        if (place) {
            showBar = true;
            params.place = place;
            if (place.includes('Халкидики')) {
                showBar = false;
            }
        }
        let newConst = req.query.new;
        let newConstruction = req.query.newConstruction;
        if (newConstruction || newConst) {
            params.newConstruction = 'on';
        }

        let investition = req.query.investition;
        let investment = req.query.investment;
        if (investment || investition) {
            params.investment = 'on';
        }
        const location = req.query.location;
        if (location) {
            params.location = location;
        }
        if (req.query.firstLine) {
            params.firstLine = 'on';
        }
        if (req.query.pool) {
            params.pool = 'on';
        }
        if (req.query.view) {
            params.view = 'on';
        }
        if (req.query.furnished) {
            params.furnished = 'on';
        }
        const size_from = req.query.size_from;
        const size_to = req.query.size_to;
        const price_from = req.query.price_from;
        const price_to = req.query.price_to;
        const rooms_from = req.query.rooms_from;
        const rooms_to = req.query.rooms_to;
        const baths_from = req.query.baths_from;
        const baths_to = req.query.baths_to;
        const placesArray = ['Кавала', 'Тасос', 'Халкидики',
            'Солун', 'Серес', 'Тракия', 'Лимнос', 'Драма'
        ];
        const typesArray = ['Апартамент', 'Мезонет', 'Самостоятелна къща', 'Парцел', 'Земеделска земя', 'Магазин', 'Офис', 'Хотел'];
        propertyRepository.findPropertyByParams(params).then(properties => {
            if (size_from) {
                properties = properties.filter(prop => (prop.size >= (+size_from)));
            }
            if (size_to) {
                properties = properties.filter(prop => (prop.size <= (+size_to)));
            }
            if (price_from) {
                properties = properties.filter(prop => (prop.price >= (+price_from)));
            }
            if (price_to) {
                properties = properties.filter(prop => (prop.price <= (+price_to)));
            }
            if (rooms_from) {
                properties = properties.filter(prop => (prop.rooms >= (+rooms_from)));
            }
            if (rooms_to) {
                properties = properties.filter(prop => (prop.rooms <= (+rooms_to)));
            }
            if (baths_from) {
                properties = properties.filter(prop => (prop.baths >= (+baths_from)));
            }
            if (baths_to) {
                properties = properties.filter(prop => (prop.baths <= (+baths_to)));
            }
            properties.sort(function(a, b) { return b.date - a.date });
            const result = pageHandler.handle(properties, page, 12);
            const foundProperties = result.filteredCollection;
            const pagesCount = result.numberOfPages;
            const pages = result.navigationNumbers;
            res.render('advanced_search', { typesArray, placesArray, apartments: foundProperties, pagesCount, pages, currentPage: page, showBar });
        });
    },

};

// @ts-ignore
module.exports = controller;
