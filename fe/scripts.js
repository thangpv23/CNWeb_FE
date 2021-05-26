let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let selectDay = new Date();

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);
showCalendar2(currentMonth, currentYear);

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
    showCalendar2(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
    showCalendar2(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
    showCalendar2(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                cell.setAttribute("class", "mini-calenar")
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                cell.setAttribute("class", "mini-calenar");
                cell.id = year + "-" + (month + 1) + "-" + date;
                cell.addEventListener("click", function () {
                    localStorage.setItem("selectDay", new Date(cell.id).toString());

                    console.log(localStorage.getItem("selectDay"));
                    location.href = "cal_day.html";
                });


                let link = document.createElement("a");
                link.setAttribute("class", "text-decoration-none ");



                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-warning");
                }
                link.appendChild(cellText);
                cell.append(link);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}
function showCalendar2(month, year) {
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body-2");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
                cell.classList.add("t1");
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                cell.setAttribute("class", "t1");
                cell.id = year + "-" + (month + 1) + "-" + date;
                cell.addEventListener("click", function () {
                    localStorage.setItem("selectDay", new Date(cell.id).toString());

                    console.log(localStorage.getItem("selectDay"));
                    location.href = "cal_day.html";
                });
                let link = document.createElement("a");
                link.setAttribute("class", "text-decoration-none");
                // link.setAttribute("href","cal_day.html");

                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-warning");
                }
                link.appendChild(cellText);
                cell.append(link);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);
    }
}
var xmlhttp = new XMLHttpRequest();
function showResult(str) {
    if (str.length == 0) {
        document.getElementById("live-search").innerHTML = "";
        return;
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('live-search').innerHTML = this.responseText;
        }
    }
    xmlhttp.open("GET", "http://localhost:5000/search?a=" + str, true);
    xmlhttp.send();
}

function showForm() {

    let element = document.getElementById("myForm");
    element.classList.toggle("show");

}
function logout() {
    console.log('logout')
    sessionStorage.setItem("token", 0);
    sessionStorage.setItem("uid", 0)
    window.location.href = 'login.html'
}
const query = new URLSearchParams(window.location.search);
const text = query.get("text");
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
fetch(`http://localhost:5000/events/search?text=${text}`, requestOptions)
    .then(response => response.text())
    .then(result => {
        const json = JSON.parse(result);

        let html = ""
        json.forEach(item => {
            const t = `
                    <div style="width: 50%; margin-left: 30%; margin-top: 30px;">
                    <ul class="list-group">
                      <li class="list-group-item ">Event Name:  ${item.name}</li>
                      <li class="list-group-item">Time Start: ${new Date(item.startTime * 1000).toLocaleTimeString()}</li>
                      <li class="list-group-item">Time end: ${new Date(item.endTime * 1000).toLocaleTimeString()}<</li>
                      <li class="list-group-item">Description: ${item.description}</li>
                     <li class="list-group-item">Day:  ${new Date(item.updateTime * 1000).toLocaleDateString()}</li>
                  </ul> 
                   </div>
                    `
            html = html + t
        });
        document.getElementById("content").innerHTML = html
    })
    .catch(error => console.log('error', error));

