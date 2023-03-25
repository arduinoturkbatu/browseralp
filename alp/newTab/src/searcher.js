var e = document.getElementById("service");
var value = "you";

document.getElementById("search").addEventListener("keypress",urlsearch);

function urlsearch(event) {
    if (event.key == "Enter") {
        if(value == "you") {
            window.location.href = "http://www.you.com/search?q=" + document.getElementById("search").value;
        }else if(value == "google") {
            window.location.href = "http://www.google.com/search?q=" + document.getElementById("search").value;
        }else if(value == "bing") {
            window.location.href = "https://www.bing.com/search?q=" + document.getElementById("search").value;
        }else if(value == "brave") {
            window.location.href = "https://search.brave.com/search?q=" + document.getElementById("search").value;
        }else if(value == "yandex") {
            window.location.href = "https://yandex.com/search/?text=" + document.getElementById("search").value;
        }
    }
}

function onChange() {
  value = e.value;
  console.log(value);
}
e.onchange = onChange;