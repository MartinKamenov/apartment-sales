class News {
    constructor(id, title, text, picture) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.picture = picture;
        this.date = new Date();
    }
}

module.exports = News;
