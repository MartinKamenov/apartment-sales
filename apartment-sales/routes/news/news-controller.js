const pageHandler = require('../../models/paging');
const months = ['Януари', 'Февруари', 'Март', 'Април', 'Май',
    'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'
];

const controller = {
    showNews(newsRepository, req, res) {
        newsRepository.showNews().then((news) => {
            res.render('news', { news, months });
        });
    },
    showSingleNews(newsRepository, req, res) {
        const id = req.params.id;
        newsRepository.findNewsById(id).then((foundNews) => {
            if (foundNews.length == 0) {
                res.send('No news with this id');
                return;
            }

            const news = foundNews[0];
            res.render('single_news', { news, months });
        });

        /*const news = await Promise.all(['1111'].map(newsRepository.findNewsById.bind(newsRepository)));
        res.send(news);
        add async to function*/
    }
};

// @ts-ignore
module.exports = controller;
