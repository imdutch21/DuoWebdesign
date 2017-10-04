/*tranlation engine*/

$(document).ready(function(){
    loadTranlation(false)
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
            return node.textContent;
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


function switchLang() {
    //Switcht de taal en herlaad de vertalingen
    var lang = localStorage.getItem("setLanguage");
    if (lang === "eng") {
        localStorage.setItem("setLanguage", "ned");
    } else {
        localStorage.setItem("setLanguage", "eng");
    }
    //forceerd de vertaling
    loadTranlation(true);
}

/*end tranlation engine*/