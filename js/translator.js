
/*tranlation engine*/

function test() {
    var xhttp = new XMLHttpRequest();
    var translated = false;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200 && !translated) {
            translated = translate(this, false);
            // console.log(getTranslation(this, "title1", "ned"));
        }
    };
    xhttp.open("GET", "lang.xml", true);
    xhttp.send();

}


function translate(xml, force) {
    var translations = document.getElementsByTagName("translate");
    for (var i = 0; i < translations.length; i++) {
        var trans = translations[i];
        if (trans.innerHTML === "" || force)
            translations[i].innerHTML = getTranslation(xml, trans.attributes["key"].nodeValue, getCurrentLang());
    }
    return true;
}


function getTranslation(xml, translate, lang) {
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
    return "eng";
}
/*end tranlation engine*/