import chai from "chai";
const expect = chai.expect;
import Bookings from "../src/Classes/Bookings";
import bookingsData from "./bookings-test-data";

const booking = bookingsData['bookings'][1];
console.log(booking, "test booking outside");
const booking1 = new Bookings(booking);

describe('Bookings', function () {
    
    console.log(booking1, "test booking");
    // const booking2 = new Bookings();

    it('should be a function', function () {
        expect(Bookings).to.be.a('function');
    });

    it('should be an instance of Bookings', function () {
        expect(booking1).to.be.an.instanceOf(Bookings);
    });

    it('should have an id', function () {
        expect(booking1.id).to.equal("5fwrgu4i7k55hl6t5");
    });

    // it('should default to an id if one isn/t provided', function () {
    //     expect(booking2.id).to.equal('');
    // });

    it('should keep track of the users id', function () {
        expect(booking1.userId).to.equal(3);
    });

    it('should keep track of booking date', function () {
        expect(booking1.date).to.equal("2022/01/24");
    });

    it('should keep track of the room booked', function () {
        expect(booking1.roomNumber).to.equal(24);
    });

    it('should have a lits of room sercvice charges', function () {
        expect(booking1.roomServiceCharges).to.deep.equal([]);
    });
});