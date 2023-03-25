var tabs = new Tabby('[data-tabs]');
var activeNum = 0;
var activeTabString = "#tab" + activeNum;
var activeTab = document.querySelector(activeTabString);
var tabNmForKilling = 0;

var draggable = activeTab.querySelector(".draggable");
var leftPanel = activeTab.querySelector("webview.left");
var rightPanel = activeTab.querySelector("webview.right");

window.setInterval(setPanel,500);

function setPanel() {
    
    draggable = activeTab.querySelector(".draggable");
    leftPanel = activeTab.querySelector("webview.left");
    rightPanel = activeTab.querySelector("webview.right");

            //? dragging

let isDragging = false;
let initialWidth;

draggable.addEventListener("mousedown", (event) => {
  isDragging = true;
  initialWidth = leftPanel.offsetWidth;
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const currentWidth = initialWidth + event.clientX - draggable.offsetLeft;
    const containerWidth = leftPanel.offsetWidth + rightPanel.offsetWidth;
    const leftPanelWidth = (currentWidth / containerWidth) * 100;
    const rightPanelWidth = 100 - leftPanelWidth;

    leftPanel.style.width = `${leftPanelWidth}%`;
    rightPanel.style.width = `${rightPanelWidth}%`;
  }
});

document.addEventListener("mouseup", (event) => {
  isDragging = false;
});

}
// Hacker Effect by/Hyperplexed
const letters = "ABCÇDEFGĞHIİJKLMNOÖPQRSŞTUÜVWXYZ";
let interval = null;


window.setInterval(activeTabTrigger,100);

function activeTabTrigger() {
    let activeTabHref = document.querySelector('[aria-selected="true"]').href;

    const activeNumSpliter = activeTabHref.split("tab");

    activeNum = activeNumSpliter[1];
    console.log("active tab number: " + activeNum);

    activeTabString = "#tab" + activeNum
    activeTab = document.querySelector(activeTabString);
}

document.getElementById("gohome").addEventListener("click", goHome);
document.getElementById("goback").addEventListener("click", goBack);
document.getElementById("goforward").addEventListener("click", goForward);
document.getElementById("refresh").addEventListener("click",refresh);
document.getElementById("urlSearch").addEventListener("keypress",urlsearch);
document.getElementById("sideview").addEventListener("click",sidepage);

popup("info","Welcome","Welcome to Browser Alp!")

function sidepage() {
    var webview = document.createElement("webview");
    webview.setAttribute("id","webview w2");
    webview.setAttribute("src","alp/newTab/index.html");
    webview.setAttribute(":allowpopus","allowpopus");
    webview.setAttribute("webpreferences","allowRunningInsecureContent=yes");
    webview.setAttribute("enableremotemodule","true");
    webview.setAttribute("allowpopus","");
    webview.classList.add("right");
    var draggable = document.createElement("div");
    draggable.classList.add("draggable");
    document.querySelector(activeTabString).appendChild(draggable);
    document.querySelector(activeTabString).appendChild(webview);
    activeTab.classList.add("sided");
}

function goHome() {
    activeTab.querySelector("webview").loadURL("file://" + __dirname.replace("\\\\","/") + "/alp/newTab/index.html");
}

function goBack() {
    activeTab.querySelector("webview").goBack();
}

function goForward() {
    activeTab.querySelector("webview").goForward();
}

function refresh() {
    activeTab.querySelector("webview").reload();
}

function go() {
    if(document.getElementById("urlSearch").value == "alp://newTab") {
        activeTab.querySelector("webview").loadURL("file://" + __dirname + "/alp/newTab/index.html"); 
    }else {
        let url = document.getElementById("urlSearch").value;
        activeTab.querySelector("webview").loadURL(url);    
    }
    
}

setInterval(webUrlChange,500);

function webUrlChange() {
    if(document.getElementById('urlSearch') !== document.activeElement) {
        if(activeTab.querySelector("webview").src.includes("alp/newTab/index.html")) {
            document.getElementById('urlSearch').value = "alp://newTab";
        }else {
            document.getElementById('urlSearch').value = activeTab.querySelector("webview").src;
        }
        
        if(activeTab.querySelector("webview").src.includes("https://")){
            document.querySelector(".topSearch .secure").classList.add("on");
            document.querySelector(".topSearch .secure").classList.remove("off");
            document.querySelector(".topSearch .secure use").setAttribute("href","node_modules/feather-icons/dist/feather-sprite.svg#lock");
        }else {
            if(activeTab.querySelector("webview").src.includes("file://")) {
                if(activeTab.querySelector("webview").src.includes(__dirname.replace("\\\\","/")) || document.querySelector(".topSearch input").value.includes("alp://")){
                    document.querySelector(".topSearch .secure").classList.add("on");
                    document.querySelector(".topSearch .secure").classList.remove("off");
                    document.querySelector(".topSearch .secure use").setAttribute("href","assets/LogoSmall.svg");
                }else {
                    document.querySelector(".topSearch .secure").classList.remove("on");
                    document.querySelector(".topSearch .secure").classList.add("off");
                    document.querySelector(".topSearch .secure use").setAttribute("href","node_modules/feather-icons/dist/feather-sprite.svg#file");
                }
            }else {
                document.querySelector(".topSearch .secure").classList.remove("on");
                document.querySelector(".topSearch .secure").classList.add("off");
                document.querySelector(".topSearch .secure use").setAttribute("href","node_modules/feather-icons/dist/feather-sprite.svg#unlock");
            }
            
        }
    }
    
}

function urlsearch(event) {
    if (event.key == "Enter") {
        go();
    }
}

function newTab(url) {
    var random = Math.floor(Math.random() * 1000000000000000001);
    aAtt = "#tab" + random;
    divAtt = "tab" + random;

    var li  = document.createElement("li"); // .tabs ul
    li.setAttribute('role','presentation');
    li.setAttribute('oncontextmenu', 'contexted(' + random + ')');

    var a = document.createElement("a"); // li
    a.setAttribute('href', aAtt);
    a.setAttribute('id','tabby-toggle_tab' + random);
    a.setAttribute('role','tab');
    a.setAttribute('aria-controls','tab' + random);
    a.setAttribute('aria-selected','true');
    a.setAttribute('tab-index','-1');
    a.setAttribute('tabindex','0');

    var span = document.createElement("span");
    span.setAttribute('onclick', 'killQuickly(' + random + ')');
    span.innerText = "Close";

    ///**---**\\\

    var div = document.createElement("div"); // .webview
    div.setAttribute('id', divAtt);
    div.setAttribute('class', 'tab');
    div.setAttribute('role','tabpanel');
    div.setAttribute('aria-labelledby','tabby-toggle_tab' + random);

    var webview = document.createElement("webview"); // div
    webview.setAttribute('id','webview');
    webview.setAttribute('src',url);
    webview.setAttribute(':allowpopups','allowpopups');
    webview.setAttribute('webpreferences','allowRunningInsecureContent=yes');
    webview.setAttribute('enableremotemodule','true');
    webview.setAttribute('allowpopus',true);
    webview.classList.add("left");


    ///**--- **\\\

    document.querySelector("div.tabs ul").appendChild(li);
    document.querySelector("div.tabs ul li:last-child").appendChild(a);
    document.querySelector("div.tabs ul li:last-child").appendChild(span);

    document.querySelector(".webview").appendChild(div);
    document.querySelector(".webview div#tab" + random).appendChild(webview);

    tabs = new Tabby('[data-tabs]'); //!{}
}

setInterval(onLoading,500);

function onLoading() {

    var webview = activeTab.querySelector("webview");
    const indicator = document.querySelector('.indicator');

    const loadstart = () => {
      indicator.classList.add("load");
      document.querySelector(".titlebar").innerText = "Loading...";
    }

    const loadstop = () => {
      indicator.classList.remove("load");
      if(activeTab.classList.contains("sided")) {
        document.querySelector(".titlebar").innerHTML = "Splited: &nbsp; <b>" + webview.getTitle() + "</b> &nbsp; & another page(s)";
    }else {
        document.querySelector(".titlebar").innerText = webview.getTitle();
    }
    }

    const pagetitle = () => {
        if(activeTab.classList.contains("sided")) {
            document.querySelector(".titlebar").innerHTML = "Splited: &nbsp; <b>" + webview.getTitle() + "</b> &nbsp; & another page(s)";
        }else {
            document.querySelector(".titlebar").innerText = webview.getTitle();
        }
    }

    if(activeTab.classList.contains("sided")) {
        document.querySelector(".titlebar").innerHTML = "Splited: &nbsp; <b>" + webview.getTitle() + "</b> &nbsp; & another page(s)";
    }else {
        document.querySelector(".titlebar").innerText = webview.getTitle();
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
    webview.addEventListener('page-title-updated', pagetitle)
    webview.addEventListener('dom-ready', function () {
        webview.insertCSS(`
            input,proggress,progress{
                accent-color: #98E2C6 !important;
            }
        `)
    })

    webview.addEventListener('page-favicon-updated', e => {
        console.log(e.favicons);

        let activeTrigger = document.querySelector('[aria-selected="true"]');
        activeTrigger.style.backgroundImage = "url(" + e.favicons[e.favicons.length - 1] + ")";
    })
}

function killQuickly(n) {
    tabNmForKilling = n;
    killTab(false);
}

function contexted(tabNm) {
    var error = document.querySelector(".error");
    var errorBox = error.querySelector(".error-box");
    tabNmForKilling = tabNm;

    error.classList.toggle("show");
    errorBox.innerHTML = `
    <p class="b">Tab #` + tabNm + ` Options</p>
    <p>
    Do you want to close "` + document.querySelector("#tab" + tabNmForKilling + " webview").getTitle() + `" tab?<br/>
  </p>
  <br/><br/><br/>
  <div class="buttons">
    <button data-value="CANCEL" onclick="contextC()" class="no special a">
      Cancel
    </button>
    <button data-value="CLOSE THE TAB" onclick="killTab(true)" class="yes special b">
      Close The Tab
    </button>
  </div>
  <br/>`;
  hacker();
}

function contextC() {
    var error = document.querySelector(".error");

    error.classList.toggle("show");
}

function killTab(c) {
    var li = document.querySelector(".tabs ul li:has(a[href='#tab" + tabNmForKilling + "'])");
    var div = document.querySelector(".webview div#tab" + tabNmForKilling);

    tabs = new Tabby('[data-tabs]'); //!{}

    popup("info","Closed","\"Tab " + tabNmForKilling + "\" closed.");

    li.remove();
    div.remove();
    if(c) {
        contextC();
    }
}

onload = () => {
    const webview = activeTab.querySelector("webview");
    const indicator = document.querySelector('.indicator');

    const loadstart = () => {
      indicator.classList.add("load");
      document.querySelector(".titlebar").innerText = "Loading...";
    }

    const loadstop = () => {
      indicator.classList.remove("load");
      document.querySelector(".titlebar").innerText = webview.getTitle();
    }

    const pagetitle = () => {
        document.querySelector(".titlebar").innerText = webview.getTitle();
    }

    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
    webview.addEventListener('page-title-updated', pagetitle)
  }


  function options() {
    document.querySelector(".options-menu").classList.toggle("show");
  }



        // Hack Effect by *HyperPlexed*
    function hacker() {
        
        document.querySelector(".special.a").onmouseover = event => {  
        let iteration = 0;
        
        clearInterval(interval);
        
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 32)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }
        
        document.querySelector(".special.b").onmouseover = event => {  
        let iteration = 0;
        
        clearInterval(interval);
        
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 32)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
        }
    } 


    document.querySelector(".special.c").onmouseover = event => {  
        let iteration = 0;
        
        clearInterval(interval);
        
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 32)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }
        
    document.querySelector(".special.d").onmouseover = event => {  
        let iteration = 0;
        
        clearInterval(interval);
        
        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return event.target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 32)]
            })
            .join("");
            
            if(iteration >= event.target.dataset.value.length){ 
            clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    }


    // Settings | Sidebar Navigation
    function sidenav(n) {
        if(n == 0) {
            document.querySelector('.settings-box .sidebar :nth-child(1)').classList.add('active');
            document.querySelector('.settings-box .sidebar :nth-child(2)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(3)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(4)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(5)').classList.remove('active');
        
            document.querySelector('.settings-box .content .general').classList.add("active-content");
            document.querySelector('.settings-box .content .about').classList.remove("active-content");

        }else if(n == 1) {
            document.querySelector('.settings-box .sidebar :nth-child(1)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(2)').classList.add('active');
            document.querySelector('.settings-box .sidebar :nth-child(3)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(4)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(5)').classList.remove('active');
        }else if(n == 2) {
            document.querySelector('.settings-box .sidebar :nth-child(1)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(2)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(3)').classList.add('active');
            document.querySelector('.settings-box .sidebar :nth-child(4)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(5)').classList.remove('active');
        }else if(n == 3) {
            document.querySelector('.settings-box .sidebar :nth-child(1)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(2)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(3)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(4)').classList.add('active');
            document.querySelector('.settings-box .sidebar :nth-child(5)').classList.remove('active');
        }else if(n == 4) {
            document.querySelector('.settings-box .sidebar :nth-child(1)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(2)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(3)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(4)').classList.remove('active');
            document.querySelector('.settings-box .sidebar :nth-child(5)').classList.add('active');
        
            document.querySelector('.settings-box .content .general').classList.remove("active-content");
            document.querySelector('.settings-box .content .about').classList.add("active-content");
        }
    }

        //? Cheching (on/off)line

        if(!window.navigator.onLine) {
            popup("info","Connection","You are offline");
        }

        window.addEventListener('online', () => popup("info","Connection","Get connected"));
        setInterval(window.addEventListener('offline', () => popup("info","Connection","You are offline")),4000);

        //? Making popus

        function popup(icon,title,desc) {
            document.querySelector(".popup-alert").classList.add("show");
            document.querySelector(".popup-alert").innerHTML = `
            <svg
                class="svg"
                fill="none"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <use href="node_modules/feather-icons/dist/feather-sprite.svg#`+ icon  +`"/>
            </svg>
            <b>`+ title +`</b>
            <span>`+ desc +`</span>
            `;

            setTimeout(killPopup,3895);
        }

        function killPopup() {
            document.querySelector(".popup-alert").classList.remove("show");
        }


        //? dragging

let isDragging = false;
let initialWidth;

draggable.addEventListener("mousedown", (event) => {
  isDragging = true;
  initialWidth = leftPanel.offsetWidth;
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const currentWidth = initialWidth + event.clientX - draggable.offsetLeft;
    const containerWidth = leftPanel.offsetWidth + rightPanel.offsetWidth;
    const leftPanelWidth = (currentWidth / containerWidth) * 100;
    const rightPanelWidth = 100 - leftPanelWidth;

    leftPanel.style.width = `${leftPanelWidth}%`;
    rightPanel.style.width = `${rightPanelWidth}%`;
  }
});

document.addEventListener("mouseup", (event) => {
  isDragging = false;
});