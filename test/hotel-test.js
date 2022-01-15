import chai from "chai";
import Hotel from "../src/Classes/Hotel";
const expect = chai.expect;
import bookingsData from "./bookings-test-data";
import roomsData from "./room-test-data";

const rooms = roomsData['rooms'];
const bookings = bookingsData['bookings'];

describe('Hotel', function () {
    const hotel = new Hotel(rooms, bookings);
    const hotel1 = new Hotel();
    const date = '2021 - 02 - 05';

    it('should be a function', function () {
        expect(Hotel).to.be.a('function');
    });

    it('should be an instance of hotel', function () {
        expect(hotel).to.be.an.instanceOf(Hotel);
    });

    it('should have a list of all rooms', function () {
        expect(hotel.rooms).to.deep.equal([
            {
                number: 7,
                roomType: "single room",
                bidet: false,
                bedSize: "queen",
                numBeds: 2,
                costPerNight: 231.46,
            },
            {
                number: 15,
                roomType: "residential suite",
                bidet: false,
                bedSize: "full",
                numBeds: 1,
                costPerNight: 294.56,
            },
            {
     
            },
            {
                number: 12,
                roomType: "suite",
                bidet: true,
                bedSize: "king",
                numBeds: 2,
                costPerNight: 172.09,
            },
            {
                number: 3,
                roomType: "single room",
                bidet: false,
                bedSize: "king",
                numBeds: 1,
                costPerNight: 491.14,
            },
        ]);
    });

    it('should default to to no rooms', function () {
        expect(hotel1.rooms).to.deep.equal([]);
    });

    it('should have a list of all bookings', function () {
        expect(hotel.bookings).to.deep.equal([
            {
                id: "5fwrgu4i7k55hl6sz",
                userID: 2,
                date: "2022/04/22",
                roomNumber: 15,
                roomServiceCharges: [],
            },
            {
                id: "5fwrgu4i7k55hl6t5",
                userID: 3,
                date: "2022/01/24",
                roomNumber: 24,
                roomServiceCharges: [],
            },
            {
                id: "5fwrgu4i7k55hl6t6",
                userID: 3,
                date: "2022/01/10",
                roomNumber: 12,
                roomServiceCharges: [],
            },
            {
                id: "5fwrgu4i7k55hl6t7",
                userID: 1,
                date: "2022/02/16",
                roomNumber: 7,
                roomServiceCharges: [],
            },
            {
                id: "5fwrgu4i7k55hl6t8",
                userID: 1,
                date: "2022/02/05",
                roomNumber: 12,
                roomServiceCharges: [],
            },
            {
                id: "5fwrgu4i7k55hl6a9",
                userID: 1,
                date: "2021/02/05",
                roomNumber: 15,
                roomServiceCharges: [],
            },
            {
                id: "5fwrgu4i7k55hl6w1",
                userID: 1,
                date: "2021/07/13",
                roomNumber: 3,
                roomServiceCharges: [],
            },
        ]);
    });

        it('should have a list of all available rooms', function () {
            hotel.getAvailableRooms(date);

            expect(hotel.availableRooms).to.deep.equal([
              [
                {
                  number: 7,
                  roomType: "single room",
                  bidet: false,
                  bedSize: "queen",
                  numBeds: 2,
                  costPerNight: 231.46,
                },
                {
                  number: 15,
                  roomType: "residential suite",
                  bidet: false,
                  bedSize: "full",
                  numBeds: 1,
                  costPerNight: 294.56,
                },
                {},
                {
                  number: 12,
                  roomType: "suite",
                  bidet: true,
                  bedSize: "king",
                  numBeds: 2,
                  costPerNight: 172.09,
                },
                {
                  number: 3,
                  roomType: "single room",
                  bidet: false,
                  bedSize: "king",
                  numBeds: 1,
                  costPerNight: 491.14,
                },
              ],
            ]);
        });
    });