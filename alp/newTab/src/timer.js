hour = document.getElementById("timeHour");
minute = document.getElementById("timeMinute");
date = document.getElementById("timeDate");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

setInterval(getTime,500);

function getTime() {
    const d = new Date();

    if(d.getHours() < 10) {
        hour.innerText = "0" + d.getHours().toString();
    }else {
        hour.innerText = d.getHours();
    }

    if(d.getMinutes() < 10) {
        minute.innerText = "0" + d.getMinutes().toString();
    }else {
        minute.innerText = d.getMinutes();
    }

    date.innerText = d.getDate() + ", " + months[d.getMonth()] + " " + d.getFullYear();
}