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
}

module.exports = ApartmentRepository;
