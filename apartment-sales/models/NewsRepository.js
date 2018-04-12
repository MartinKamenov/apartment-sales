const collectionName = 'news';
class NewsRepository {
    constructor(database) {
        this.database = database;
    }

    createNews(news) {
        return this.database.insert(collectionName, news);
    }

    showNews() {
        return this.database.showAll(collectionName);
    }

    findNewsById(id) {
        return this.database.find(collectionName, { id });
    }

    deleteNews(id) {
        return this.database.delete(collectionName, { id });
    }
}

module.exports = NewsRepository;
