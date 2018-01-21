const collectionName = 'apartments';
class ApartmentRepository {
    constructor(database) {
        this.database = database;
    }
    getAllApartments() {
        return this.database.showAll(collectionName);
    }

    insertApartment(apartment) {
        this.database.insert(collectionName, apartment);
    }

    findApartmentByCode(code) {
        return this.database.find(collectionName, { code: code });
    }

    findApartmentByParams(params) {
        return this.database.find(collectionName, params);
    }

    removeApartment(code) {
        this.database.delete(collectionName, { code: code });
    }
}

module.exports = ApartmentRepository;
