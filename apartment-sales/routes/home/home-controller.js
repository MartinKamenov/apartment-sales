const pageHandler = require('../../models/paging');

const controller = {
    showHome(propertyRepository, req, res) {
        var page = req.query.page;
        page = pageHandler.choosePage(page);
        const query = req.query;
        const type = query.type;
        const place = query.place;
        const params = { top: 'on' };

        propertyRepository.findPropertyByParams(params).then(properties => {
            properties.sort(function(a, b) { return b.date - a.date });
            const result = pageHandler.handle(properties, page, 6);
            const foundProperties = result.filteredCollection;
            const pagesCount = result.numberOfPages;
            const pages = result.navigationNumbers;
            const typeArray = ['Апартамент', 'Мезонет', 'Самостоятелна къща', 'Парцел', 'Земеделска земя', 'Магазин', 'Офис', 'Хотел'];
            const cityArray = ['Кавала', 'Кавала (Град)', 'Тасос', 'Халкидики', 'Солун', 'Серес', 'Тракия', 'Лимнос', 'Драма'].sort();
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
                'Агиа Параскеви', 'Агиас Варварас', 'Агиос Атанасиос',
                'Агиос Георгиос', 'Агиос Йоанис', 'Агиос Лукас', 'Агиос Николаос',
                'Агиос Павлос', 'Агиос Силас', 'Аспри Амос', 'Виронас',
                'Дексамени', 'Делос', 'Каламица', 'Кипуполи', 'Панагия',
                'Панагуда', 'Пентакосиа', 'Перигиали',
                'Потамудя', 'Профитис Илиас', 'Рапсани', 'Санаторио',
                'Сугело', 'Сфагия', 'Тимиос Ставрос – Сугело', 'Хилиа',
                'Хорафа', 'Център Кавала',
                'Серайки Акти', 'Порто Фино', 'Солун (Център)', 'Каламариа', 'Аналипси', 'Агиа Триада', 'Неа Крини',
                'Пилеа', 'Рентина'
            ].sort();
            const topProperties = properties.slice(0, 6);
            const codes = ['2773', '2928', '1995', '1982', '2789', '2322'];
            let newProperties = [];
            propertyRepository.findPropertyByCode(codes[0]).then((prop0) => {
                newProperties.push(prop0[0]);
                propertyRepository.findPropertyByCode(codes[1]).then((prop1) => {
                    newProperties.push(prop1[0]);
                    propertyRepository.findPropertyByCode(codes[2]).then((prop2) => {
                        newProperties.push(prop2[0]);
                        propertyRepository.findPropertyByCode(codes[3]).then((prop3) => {
                            newProperties.push(prop3[0]);
                            propertyRepository.findPropertyByCode(codes[4]).then((prop3) => {
                                newProperties.push(prop3[0]);
                                propertyRepository.findPropertyByCode(codes[5]).then((prop3) => {
                                    newProperties.push(prop3[0]);
                                    res.render('home', { newProperties, typeArray, topProperties, cityArray, regionArray, pagesCount, pages, currentPage: page });
                                });
                            });
                        });
                    });
                });
            });
        });
    },
    showUsefull(req, res) {
        res.render('usefull');
    },
    showServices(req, res) {
        res.render('services');
    },

    showContacts(req, res) {
        res.render('contacts');
    },
    showForUs(req, res) {
        res.render('for_us');
    }
};

// @ts-ignore
module.exports = controller;
