class Apartment {
    constructor(title, text, type, place, rooms, price, size, code, firstLine, parkingSpot,
        view, pool, furnished) {

        this.title = title;
        this.text = text;
        this.type = type;
        this.place = place;
        this.rooms = rooms;
        this.price = price;
        this.size = size;
        this.code = code;
        this.firstLine = firstLine;
        this.parkingSpot = parkingSpot;
        this.view = view;
        this.pool = pool;
        this.furnished = furnished;
    }
}

module.exports = Apartment;
