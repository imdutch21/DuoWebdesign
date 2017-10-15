/*tranlation engine*/

$(document).ready(function () {
    $("#nedSwitch").click(function () {
        setDutch();
    });

    $("#engSwitch").click(function () {
        setEnglish();
    });
    updateLang()

});

function loadTranlation(force) {
    //laad het lang bestand en doet de vertalingen
    var xhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xhttp = new XMLHttpRequest();
    }
    else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var translated = false;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200 && !translated) {
            translated = translate(this, force);
        }
    };
    //access file from github because of issues on different browsers
    xhttp.open("GET", "https://rawgit.com/imdutch21/DuoWebdesign/master/lang.xml", true);
    xhttp.send();


}


function translate(xml, force) {
    //haalt de vertaling op en past de pagina aan
    var translations = document.getElementsByTagName("translate");
    for (var i = 0; i < translations.length; i++) {
        var trans = translations[i];
        if (trans.innerHTML === "" || force)
            translations[i].innerHTML = getTranslation(xml, trans.attributes["key"].nodeValue, getCurrentLang());
    }
    return true;
}


function getTranslation(xml, translate, lang) {
    //haalt de vertaling met op uit het xml bestand
    var xmlDoc = xml.responseXML;
    var elements = xmlDoc.getElementsByTagName(translate);
    for (var i = 0; i < elements.length; i++) {
        var node = elements[i];
        if (node.attributes[0].nodeValue === lang) {
            //geeft de vertaling terug, doordat het een xml bestand is k
            return node.textContent.replace(/\/br\//g, "</br>");
        }
    }
}

function getCurrentLang() {
    //Deze ifstatement is hier om te kijken of getItem wel iets terug geeft, de default taal is nederlands
    if (localStorage.getItem("setLanguage") === "eng")
        return "eng";
    else
        return "ned";
}

function setEnglish(){
    localStorage.setItem("setLanguage", "eng");
    $("#engSwitch").attr("src", "img/flag_uk_selected.png");
    $("#nedSwitch").attr("src", "img/flag_nederland.png");
    loadTranlation(true);
}

function setDutch(){
    localStorage.setItem("setLanguage", "ned");
    $("#engSwitch").attr("src", "img/flag_uk.png");
    $("#nedSwitch").attr("src", "img/flag_nederland_selected.png");
    loadTranlation(true);
}


function updateLang() {
    //Herlaad de vertalingen als de pagina wordt geladen

    if (getCurrentLang() === "eng") {
        setEnglish();
    } else {
        setDutch();
    }
}

/*end tranlation engine*/