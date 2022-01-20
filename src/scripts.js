import './css/base.scss';
import domUpdates from './domUpdates';
import { userData, roomsData, allBookingsData, updateBookings, getSingleUser } from "./apiCalls";
import Room from './Classes/Room';
import User from './Classes/User';
import Bookings from './Classes/Bookings';
import './images/image-from-rawpixel-id-3018024-png.png';
import './images/turing-logo.png';
import './images/kisspng-m-gustave-hotel-lobby-boy-5-lobby-boy-2-zero-bar-propaganda-5addf024831701.451758941524494372537.png'
import Hotel from './Classes/Hotel';

// DOM elements
const ids = [
  "checkIn",
  "roomType",
  "rooms",
  "submit",
  "logOutBtn",
  "mainScreen",
  "welcomePage",
];
const [checkIn, roomFilter, allRoomsSection, loginBtn, logOutBtn, mainDisplay, mainImg] = ids.map(id => document.getElementById(id));

document.getElementById('checkIn').valueAsDate = new Date();
const today = new Date().toISOString().split('T')[0];

document.getElementById('checkIn').setAttribute('min', today);
const roomSelector = document.querySelectorAll('.filter');
const loginPage = document.querySelector(".login");
const nav = document.querySelector(".nav-buttons");


// Global Variables
let currentUser;
let allRooms = [];
let allBookings = [];
let currentHotel;

// Functions
const confirmBooking = (event, rooms, currentUser) => {
  let today = new Date(checkIn.value).toISOString().split("T")[0];
  today = today.split("-").join("/");
  const roomBook = rooms.find(room => event.target.id == room.number);
  const booking = {
    "userID": currentUser.id,
    "date": today,
    "roomNumber": roomBook.number
  }
  updateBookings(booking)
    .then((data) => domUpdates.popUpWindow(data))
    .catch((err) => domUpdates.displayErr('rooms', err.message));
}

const booking = (date) => {
    currentHotel.getAvailableRooms(date);
    domUpdates.displayAvailableRooms(currentHotel.availableRooms)
};

const updateData = (id) => {
  Promise.all([getSingleUser(id), roomsData(), allBookingsData()])
    .then((data) => {
      console.log(data, 'data')
      startPage(data, id);
    })
    .catch(
      (err) => domUpdates.displayErr("error", err.message));
}

const startPage = (data) => {
  currentUser = "";
  allRooms = [];
  allBookings = [];
  currentHotel = "";
  allBookings.push(data[2].bookings);
  allRooms.push(data[1].rooms);
  currentUser = new User(data[0]);
  allBookings.forEach((booking) => currentUser.getAllBookings(booking));
  allBookings.map((booking) => new Bookings(booking));
  allRooms.map((room) => new Room(room));
  currentUser.getTotalSpent(allRooms.flat(1));
  currentHotel = new Hotel(allRooms, allBookings, currentUser);
  domUpdates.displayCurrentUserInfo(currentUser, allRooms.flat(1));
}

const logOut = () => {
  currentUser = '';
  allRooms = [];
  allBookings = [];
  currentHotel = '';
  domUpdates.show([loginPage, allRoomsSection]);
  domUpdates.hide([mainDisplay, nav, logOutBtn, mainImg]);
  document.getElementById("username").value = '';
  document.getElementById("password").value = '';
}

// Event Listeners
window.addEventListener('load', function (event) {
  event.preventDefault()
  domUpdates.hide([
    document.querySelector(".nav-buttons"),
    document.querySelector(".log-out-btn"),
  ]);
})

loginBtn.addEventListener('click', function (event) {
  event.preventDefault()
  const username = document.getElementById('username');
  const password = document.getElementById('password')

  if (username.value.slice(0, 8) === 'customer' && password.value === 'overlook2021') {
    if (username.value.split('').length > 8) {
      const split = username.value.split('').length - 8;
      let id = username.value.split("").slice(-split);
      id = parseInt(id, 10);
      // getUpdatedData(id);
      updateData(id);
    }
  } else {
    domUpdates.displayErr(
      "error",
      "Login incorrect. Check your spelling"
    );
  }
})

checkIn.addEventListener('change', function () {
  booking(checkIn.value);
  roomSelector.forEach(filter => {
    if (filter.defaultSelected) {
      filter.selected = true;
      return false;
    }
  });
});

roomFilter.addEventListener('change', function () {
  domUpdates.filterRooms(
    roomFilter.value,
    currentHotel.availableRooms.flat(1)
  );
});

allRoomsSection.addEventListener('click', function (event) {
  if (event.target.id === 'mainPageBtn') {
    checkIn.valueAsDate = new Date()
    roomFilter.value = 'Select Room Type';
    updateData(currentUser.id);
  } else {
    confirmBooking(
      event,
      currentHotel.availableRooms.flat(1),
      currentUser
    );
  }
});

logOutBtn.addEventListener('click', logOut)