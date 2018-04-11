const pageHandler = require('../../models/paging');

const controller = {
    showSearch(propertyRepository, req, res) {
        var page = req.query.page;
        page = pageHandler.choosePage(page);
        let params = {};
        let lastSearched = req.query;
        const type = req.query.type;
        if (type) {
            if (!(type instanceof Array)) {
                params.type = type;
            }
        }
        const place = req.query.place;

        let showBar = false;
        let placeIsSeres = false;
        if (place) {
            showBar = true;
            if (!place.includes('Серес')) {
                params.place = place;
                if (place.includes('Град')) {
                    params.place = "Кавала (Град)";
                }
            } else {
                placeIsSeres = true;
            }
            if (place.includes('Халкидики')) {
                showBar = false;
            }
        }

        let newConstruction = req.query.newConstruction;
        if (newConstruction) {
            params.newConstruction = 'on';
        }

        let investment = req.query.investment;
        if (investment) {
            params.investment = 'on';
        }
        const location = req.query.location;
        if (location) {
            params.location = location;
        }
        if (req.query.firstLine || req.query.first_line) {
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
        let rooms_from = req.query.rooms_from;
        const rooms_to = req.query.rooms_to;
        if (rooms_to) {
            if (!rooms_from) {
                rooms_from = 1;
            }
        }
        let baths_from = req.query.baths_from;
        const baths_to = req.query.baths_to;
        if (baths_to) {
            if (!baths_from) {
                baths_from = 1;
            }
        }
        const placesArray = ['Кавала', 'Кавала (Град)', 'Тасос', 'Халкидики',
            'Солун', 'Серес', 'Тракия', 'Лимнос', 'Драма'
        ].sort();
        const typesArray = ['Апартамент', 'Мезонет', 'Самостоятелна къща', 'Парцел', 'Земеделска земя', 'Магазин', 'Офис', 'Хотел'];
        propertyRepository.findPropertyByParams(params).then(properties => {
            if (placeIsSeres) {
                properties = properties.filter(prop => {
                    return (prop.place == 'Област Серес' || prop.place == 'Област Серрес');
                });
            }
            if (type instanceof Array) {
                properties = properties.filter(prop => {
                    for (let i = 0; i < type.length; i += 1) {
                        if (prop.type == type[i]) {
                            return true;
                        }
                    }
                    return false;
                });
            }
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
            const regionArray = ['Паралия Орфани', 'Офринио', 'Паралия Офринио', 'Карияни', 'Паралия Карияни',
                'Неа Перамос', 'Неа Ираклица', 'Палио', 'Кавала(град)', 'Керамоти',
                'Агия Параскеви', 'Агиос Мамас', 'Агиос Николаос', 'Агия Кариаки', 'Акти Азапико',
                'Акти Елиас', 'Акти Салоникю', 'Арнеа', 'Афитос', 'Вавдос', 'Ватопеди', 'Вурвуру', 'Елани', 'Елия Никитис', 'Йерисос',
                'Каламитси', 'Каландра', 'Каливес', 'Каликратия', 'Калитеа', 'Касандра', 'Касандрия',
                'Криарици', 'Криопиги', 'Лагомандра', 'Лутра', 'Метармофоси', 'Мола', 'Калива', 'Миконос', 'Мудания',
                'Неа Рода', 'Неа Скиони', 'Неа Триглия', 'Нео Фокеа', 'Неос Мармарас', 'Неохори', 'Никити', 'Олимпиада',
                'Олинтос', 'Ормос', 'Панагияс', 'Остров Амулиани', 'Палиури', 'Партенонас', 'Пефкохори',
                'Пиргадикия', 'Полигирос', 'Полийхроно', 'Полихроно',
                'Порто Куфо', 'Посиди', 'Потидеа', 'Псакудия', 'Сани', 'Сарти', 'Сивири', 'Сикия', 'Ситония', 'Спалатронисия',
                'Стратони', 'Таксиархис', 'Торони', 'Трипити', 'Урануполи',
                'Флогита', 'Фурка', 'Ханиоти', 'Херакини', 'Холомонтас',
                'Авли', 'Агиасма', 'Агиос Андреас', 'Акровуни', 'Акропотамос', 'Амигдалеонас', 'Амисиана',
                'Ано Лефки', 'Галипсос', 'Гравуна', 'Доматя', 'Ексохи', 'Елеохори', 'Елефтерес', 'Елефтеруполи',
                'Заркадя', 'Зигос', 'Каравагелис', 'Кариани', 'Керамоти', 'Кипя', 'Кокинохома', 'Кокинохори',
                'Кринидес', 'Крионери', 'Лефки', 'Лидиа', 'Лутра Елефтерон', 'Мелиса', 'Мелисиокомо',
                'Месоропи', 'Меся', 'Миртофито', 'Моностираки', 'Мустени', 'Неа Ираклица', 'Неа Карвали', 'Неа Каря',
                'Неа Перамос', 'Орфани', 'Орфани Паралия', 'Офринио', 'Палеохори', 'Пальо Чифлики (Пальо)',
                'Паралия Елеохори', 'Паралия Кариани', 'Паралия Миртофито', 'Паралия Офринио', 'Паралия Фоля',
                'Перни', 'Пигес', 'Пиргохори', 'Платанотопос', 'Подохори', 'Полистило', 'Сидирохори',
                'Филипи', 'Фоля', 'Хайдефето', 'Халкеро', 'Хрисокастро', 'Хрисохори', 'Хрисуполи',
                'Ано Ставрос', 'Аспровалта', 'Врасна', 'Милиес', 'Неа Врасна', 'Паралия Врасна',
                'Ривиера', 'Сериаки Акти', 'Ставрос',
                'Агиос Георгиос', 'Алики', 'Астрида', 'Гликади', 'Глифада', 'Иера Мони',
                'Каливес', 'Каливиа', 'Калирахи', 'Кастро', 'Кинира', 'Лефки', 'Лимена', 'Лименаря',
                'Макриамос', 'Мариес', 'Мегалос Принос', 'Микрос Принос', 'Мони Архагелу', 'Ормос Принос', 'Палеохори',
                'Панагия', 'Потамиа', 'Потос', 'Принос', 'Рахони', 'Скала Калихарис',
                'Скала Марион', 'Скала Потамяс', 'Скала Рахони', 'Скала Сотирас', 'Сотирас',
                'Тасос (Център)', 'Теологос', 'Тимониа', 'Хриси Акти', 'Хриси Амудя',
                'Драма',
                'Агий Анаргири', 'Агиос Антониос', 'Агиос Атанасиос', 'Агиос Йоанис', 'Агиос Никитас',
                'Агиос Пантелимонас', 'Амфиполи', 'Византио (Калкани)', 'Ептамили', 'Инуса',
                'Иония (Сфагия)', 'Каливиа', 'Каменикиа', 'Киупля', 'Лефконас', 'Македономахон',
                'Неа Кердилия', 'Нео Сули', 'Никеа', 'Омония', 'Палеокоми', 'Панорама - Калитеа',
                'Профитис Илияс- Агия София', 'Родоливос', 'Саранда Мартирес', 'Сирис (Сигис- Неа Кифися)', 'Таксиархес (Център)',
                'Авдира', 'Паралия Авдира', 'Фанари',
                'Лимнос',
                'Серайки Акти', 'Порто Фино', 'Солун (Център)', 'Каламариа', 'Аналипси', 'Агиа Триада', 'Неа Крини',
                'Пилеа', 'Рентина'
            ].sort();
            res.render('advanced_search', {
                typesArray,
                placesArray,
                regionArray,
                apartments: foundProperties,
                pagesCount,
                pages,
                currentPage: page,
                showBar,
                lastSearched
            });
        });
    },

};

// @ts-ignore
module.exports = controller;
