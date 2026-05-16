// navigation

let screenHistory = [];

function showScreen(screenId) {

    const current = document.querySelector(".active-screen");

    if (current && current.id !== screenId) {
        screenHistory.push(current.id);
        current.classList.remove("active-screen");
        current.classList.add("screen");
    }

    const next = document.getElementById(screenId);
    if (!next) return;

    next.classList.remove("screen");
    next.classList.add("active-screen");
}

function goBack() {

    if (screenHistory.length === 0) return;

    const previousId = screenHistory.pop();

    const current = document.querySelector(".active-screen");
    if (current) {
        current.classList.remove("active-screen");
        current.classList.add("screen");
    }

    const prev = document.getElementById(previousId);

    if (prev) {
        prev.classList.remove("screen");
        prev.classList.add("active-screen");
    }
}


// search

function handleSearch(e) {
    e.preventDefault();
    showScreen('search-page');
}


// carousel

const slides = document.querySelectorAll('.carousel-img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
}

if (nextBtn && prevBtn) {

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= slides.length) currentIndex = 0;
        showSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        showSlide(currentIndex);
    });
}


// calender

const datesEl = document.getElementById("dates");
const monthYearEl = document.getElementById("monthYear");

let currentDate = new Date();
let startDate = null;
let endDate = null;

function renderCalendar() {

    if (!datesEl || !monthYearEl) return;

    datesEl.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    monthYearEl.innerText =
        currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric"
        });

    for (let i = 0; i < firstDay; i++) {
        datesEl.innerHTML += "<div></div>";
    }

    for (let day = 1; day <= lastDate; day++) {

        const dateDiv = document.createElement("div");
        const thisDate = new Date(year, month, day);

        dateDiv.innerText = day;

        dateDiv.onclick = () => handleDateClick(thisDate);

        datesEl.appendChild(dateDiv);
    }
}

function handleDateClick(date) {

    if (!startDate || endDate) {
        startDate = date;
        endDate = null;
    } else {
        endDate = date;
    }

    renderCalendar();
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}



// time slots

const slots = [
    "09:00 - 09:45",
    "09:45 - 10:30",
    "10:30 - 11:15",
    "11:15 - 12:00",
    "12:00 - 12:45",
    "12:45 - 13:30",
    "13:45 - 14:30",
    "14:30 - 15:15",
    "15:15 - 16:00"
];

const timeSlotsContainer = document.getElementById("timeSlots");

let selectedSlot = null;

if (timeSlotsContainer) {

    slots.forEach(slot => {
        const div = document.createElement("div");
        div.classList.add("time-slot");
        div.innerText = slot;

        div.onclick = () => {

            document.querySelectorAll(".time-slot")
                .forEach(s => s.classList.remove("selected"));

            div.classList.add("selected");
            selectedSlot = slot;
        };

        timeSlotsContainer.appendChild(div);
    });
}


renderCalendar();
