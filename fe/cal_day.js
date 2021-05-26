if (sessionStorage.getItem("uid") == 0 || sessionStorage.getItem("token") == 0) {
    window.location.href = 'login.html'
}

var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");


var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var monthAndYear = document.getElementById("monthAndYear");

// var top_day = document.getElementById("top-day");
var colors_array = [
    "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177", "#0d5ac1",
    "#f205e6", "#1c0365", "#14a9ad", "#4ca2f9", "#a4e43f", "#d298e2", "#6119d0",
    "#d2737d", "#c0a43c", "#f2510e", "#651be6", "#79806e", "#61da5e", "#cd2f00",
    "#9348af", "#01ac53", "#c5a4fb", "#996635", "#b11573", "#4bb473", "#75d89e",
    "#2f3f94", "#2f7b99", "#da967d", "#34891f", "#b0d87b", "#ca4751", "#7e50a8",
    "#c4d647", "#e0eeb8", "#11dec1", "#289812", "#566ca0", "#ffdbe1", "#2f1179",
    "#935b6d", "#916988", "#513d98", "#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
    "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
    "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
    "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
    "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
    "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
    "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
    "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
    "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
    "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
    "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
    "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
    "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
    "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
    "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
    "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
    "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
    "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
    "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
    "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
    "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
    "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
    "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
    "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
    "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
    "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
    "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
    "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"]

createTimeline();
showToday();
showRule();
showCalendar(currentMonth, currentYear);

// showEvent();
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
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
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                cell.setAttribute("class", "mini-calenar");

                cell.id = year + "-" + (month + 1) + "-" + date;
                cell.addEventListener("click", function () {
                    localStorage.setItem("selectDay", cell.id);
                    showToday();
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

// function showDay(id){
//     selectDay = new Date(id);
//     showToday();
// }

function createTimeline() {
    var grid_con = document.getElementById("timeline-div");
    for (var i = 0; i < 24; i++) {
        var div = document.createElement("div");
        if (0 <= i && i < 12) {
            div.innerHTML = i + " AM  ";
        }
        if (i == 12) {
            div.innerHTML = i + " PM  ";
        }
        if (12 < i && i < 24) {
            div.innerHTML = i - 12 + " PM  ";
        }
        div.className = "timeLineItem";
        grid_con.appendChild(div);
    }
}

function showToday() {
    showEvent();
    selectDay = new Date(localStorage.getItem("selectDay"));


    document.getElementById("top-day").innerHTML = selectDay.getDate() + "/" + (selectDay.getMonth() + 1).toString() + "/" + selectDay.getFullYear().toString();

}

function showRule() {
    var rule = document.getElementById("timeline-rule");

    for (var i = 0; i < 25; i++) {

        var div = document.createElement("div");
        div.innerHTML = "";
        div.className = "timeLineItem rule";
        div.id = "" + i;

        if (i == 24) {
            div.style.borderBottomStyle = "dotted";
        }
        rule.appendChild(div);
        // div.setAttribute('onclick', 'callFormUpdate(' + i + ')');
    }
}

function showEvent() {
    eveDay = new Date(localStorage.getItem("selectDay"));
    console.log((eveDay / 1000));

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    var url = "http://localhost:5000/Events/get_all?from=" + eveDay / 1000 + "&to=" + (eveDay.setHours("23", "59")) / 1000 + "";
    console.log(url);
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            for (var i = 0; i < result.length; i++) {
                var eve = result[i];
                var name = "" + eve.name;
                var des = "" + eve.description;
                var uid = "" + eve.uid;
                var id = "" + eve.id;
                var startTime = Math.floor(new Date(eve.startTime * 1000).getHours());
                console.log(startTime);
                var endTime = Math.ceil(new Date(eve.endTime * 1000).getHours());
                console.log(endTime);
                console.log(i);
                var cssStyle = "background-color:" + colors_array[i] + "; flex-basis=100%;"

                for (var j = startTime + 1; j < endTime + 2; j++) {

                    var flexTime = document.getElementById("" + j);
                    flexTime.style.cssText = cssStyle;
                    // document.getElementById(""+(startTime+1));
                    // document.getElementById(""+endTime+1);
                    var div = document.createElement("div");
                    div.style.cssText = cssStyle;
                    if (j == startTime + 1) {
                        div.innerHTML = "<div>" + eve.name + "</div>";
                        div.style.padding = '10px';
                        div.style.textAlign = 'center';
                    }
                    div.style.flexBasis = '100%';
                    div.setAttribute('onclick', 'callFormUpdate("' + name
                        + '","' + des + '",' + eve.startTime * 1000 + ',' + eve.endTime * 1000 + ',' + id + ')');
                    // div.setAttribute('onclick', 'callFormUpdate()');
                    div.className = "" + uid + "_" + id;
                    document.getElementById("" + j).appendChild(div);

                }


            }
        })
        .catch(error => console.log('error', error));


}


function callFormCreate() {


    let element = document.getElementById("formCreate");
    element.classList.toggle("show");

}
function callFormUpdate(name, des, start, end, id) {
    sessionStorage.setItem("id", id);
    sessionStorage.setItem("startHour", new Date(start).getHours());
    sessionStorage.setItem("endHour", new Date(end).getHours());

    // start = new Date(start).getHours() + ":" +new Date(start).getMinutes();
    function changeTime(x) {
        var resTime;
        if (new Date(x).getHours() < 10) {
            resTime = "0" + new Date(x).getHours();
        }
        else resTime = "" + new Date(x).getHours();
        if (new Date(x).getMinutes() < 10) {
            resTime = resTime + ":0" + new Date(x).getMinutes();
        }
        else resTime = resTime + ":" + new Date(x).getMinutes();
        return resTime;

    }


    let element = document.getElementById("formUpdate");
    element.classList.toggle("show");
    document.getElementsByClassName("eveTitleUpdate")[0].setAttribute('value', name);
    document.getElementsByClassName("eveDesUpdate")[0].setAttribute('value', des);
    document.getElementsByClassName("timeStartUpdate")[0].setAttribute('value', changeTime(start));
    document.getElementsByClassName("timeEndUpdate")[0].setAttribute('value', changeTime(end));

}

function upEve() {
    var uid = sessionStorage.getItem("uid");
    var id = sessionStorage.getItem("id");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");
    eveDay = new Date(localStorage.getItem("selectDay"));
    var start = new Date();
    var end = new Date();
    if ((document.querySelector('.timeStartUpdate').value === "")
        && (document.querySelector('.timeEndUpdate').value === "")) {
        start = eveDay.setHours("0", "0");
        end = eveDay.setHours("23", "59");
    } else {
        start = eveDay.setHours("" + (document.querySelector('.timeStartUpdate')).value.toString().substring(0, 2), "" +
            (document.querySelector('.timeStartUpdate')).value.toString().substring(3));
        end = eveDay.setHours("" + (document.querySelector('.timeEndUpdate')).value.toString().substring(0, 2),
            "" + (document.querySelector('.timeEndUpdate')).value.toString().substring(3));
    }

    var raw = JSON.stringify({
        "id": parseInt(id),
        "uid": parseInt(uid),
        "name": (document.querySelector('.eveTitleUpdate')).value,
        "description": (document.querySelector('.eveDesUpdate')).value,
        "updateTime": 0,
        "startTime": start / 1000,
        "endTime": end / 1000,
        "isPublic": (document.querySelector('.privacyUpdate')).value / 1
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/Events/update", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            window.location.reload()
        })
        .catch(error => console.log('error', error));

}

function crEve() {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));
    console.log(sessionStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");
    eveDay = new Date(localStorage.getItem("selectDay"));
    console.log(eveDay);

    var start = new Date();
    var end = new Date();
    if ((document.querySelector('.timeStart').value === "")
        && (document.querySelector('.timeEnd').value === "")) {
        start = eveDay.setHours("0", "0");
        end = eveDay.setHours("23", "59");
    } else {
        start = eveDay.setHours("" + (document.querySelector('.timeStart')).value.toString().substring(0, 2), "" +
            (document.querySelector('.timeStart')).value.toString().substring(3));
        end = eveDay.setHours("" + (document.querySelector('.timeEnd')).value.toString().substring(0, 2),
            "" + (document.querySelector('.timeEnd')).value.toString().substring(3));
    }

    var raw = JSON.stringify({
        "Name": (document.querySelector('.eveTitle')).value,
        "Description": (document.querySelector('.eveDes')).value,
        "StartTime": start / 1000,
        "EndTime": end / 1000,
        "IsPublic": (document.querySelector('.privacy')).value / 1
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/Events/create", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            window.location.reload();
        })
        .catch(error => console.log('error', error));

}

function delEvent(uid, id, start, end) {
    uid = sessionStorage.getItem("uid");
    id = sessionStorage.getItem("id");
    start = Math.floor(new Date(start * 1000).getHours());

    end = Math.ceil(new Date(end * 1000).getHours());

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:5000/Events/delete?id=" + id + "", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);

            location.reload();
        })
        .catch(error => console.log('error', error));




}

// var t = document.getElementsByClassName("" + 38 + "_" + 47);
// t.style.backgroundColor= "white";
// showEvent();

// function openForm() {
//     document.getElementById("myForm").style.display = "block";
// }
//
// function closeForm() {
//     document.getElementById("myForm").style.display = "none";
// }


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

