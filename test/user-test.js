import chai from 'chai';
const expect = chai.expect;
import User from '../src/Classes/User.js'
import usersTest from './test-user-data.js'

const users = usersTest;
const user = users['customers'][1];
const secondUser = users['customers'][0];
console.log(user, "user")

describe('User', function () {
  const user1 = new User(user)
  console.log(user1, 'user1')
  const user2 = new User(secondUser)

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function () {
    expect(user1).to.be.an.instanceOf(User)
  });

  it('should have a name', function() {
    expect(user1.name).to.equal('Rocio Schuster')
  });

  it('should have a unique id', function () {
    expect(user1.id).to.equal(2)
    expect(user2.id).to.equal(1)
  })
});
