import chai from 'chai';
const expect = chai.expect;
import User from '../src/Classes/User.js'
import usersTest from './test-user-data.js'
import bookingsData from './bookings-test-data.js';
import roomsData from './room-test-data.js';

const bookings = bookingsData['bookings'];
const users = usersTest;
const user = users['customers'][1];
const secondUser = users['customers'][0];
const thirdUser = users['customers'][2];
const rooms = roomsData['rooms'];

describe('User', function () {
  const user1 = new User(user)
  const user2 = new User(secondUser)
  const user3 = new User(thirdUser)

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function () {
    expect(user1).to.be.an.instanceOf(User)
  });

  it('should have a name', function() {
    expect(user1.name).to.equal('Rocio Schuster')
    expect(user3.name).to.equal('new user')
  });

  it('should have a unique id', function () {
    expect(user1.id).to.equal(2)
    expect(user2.id).to.equal(1)
    expect(user3.id).to.be.a('number')
  });

  it('should keep track of all bookings', function () {
    user2.getAllBookings(bookings)

    expect(user2.allBookings).to.deep.equal([
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
  })

  it('should be able to see past bookings', function () {
    user2.getPastAndFutureBookings()

    expect(user2.pastBookings).to.deep.equal([
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
  })

  it('should be able to see future bookings', function () {
    user2.getPastAndFutureBookings()

    expect(user2.futureBookings).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
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
    ]);
  })

  it('should keep track of the total amount spent on past bookings', function () {
    user2.getTotalSpent(rooms)

    expect(user2.totalSpent).to.equal(785.70);
  })
});
