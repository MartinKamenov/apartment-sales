class PropertyRepository {
    constructor(database, collectionName) {
        this.collectionName = collectionName;
        this.database = database;
    }
    getAllProperties() {
        return this.database.showAll(this.collectionName);
    }

    insertProperty(property) {
        return this.database.insert(this.collectionName, property);
    }

    findPropertyByCode(code) {
        return this.database.find(this.collectionName, { code: code });
    }

    updateProperty(code, property) {
        this.database.delete(this.collectionName, { code: code }, property);
    }

    findPropertyByParams(params) {
        return this.database.find(this.collectionName, params);
    }

    removeProperty(code) {
        return this.database.delete(this.collectionName, { code: code });
    }
}

module.exports = PropertyRepository;
