class Property {
    constructor(title, text, type, place, location, price, contacts, size, code, firstLine, parkingSpot,
        view, pool, furnished, pictures, date) {

        this.title = title;
        this.text = text;
        this.type = type;
        this.place = place;
        this.location = location;
        this.contacts = contacts;
        this.price = price;
        this.size = size;
        this.code = code;
        this.firstLine = firstLine;
        this.parkingSpot = parkingSpot;
        this.view = view;
        this.pool = pool;
        this.furnished = furnished;
        this.pictures = pictures;
        this.date = date;
    }
}

module.exports = Property;
