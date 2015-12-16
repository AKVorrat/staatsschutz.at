var firstnames, lastnames, states, messages;
var slideAuthor, slideText, slideContent;
var backwardsSlide;
var current = -1;
var blocked = false;
var hovering = false;
var xmlResource = "./docs/comments.xml";

function htmlColToArray(htmlCol) {
    // TODO
    // convert htmlCollection object to array
    return nodeArray;
}

function findElements() {
    slideAuthor = document.getElementById("slideauthor");
    slideText = document.getElementById("slidetext");
    slideContent = document.getElementById("slideContent");
    
    backwardsSlide = document.getElementById("slideleft");
}

function setSlideScreen(index) {
    var firstname, lastname, state, message;
    
    firstname = firstnames[index].childNodes[0].nodeValue;
    lastname = lastnames[index].childNodes[0].nodeValue;
    state = states[index].childNodes[0].nodeValue;
    message = messages[index].childNodes[0].nodeValue;
    
    slideAuthor.innerHTML = firstname + " " + lastname + ", " + state;
    slideText.innerHTML = message;
}

function getElements(xml) {
    var xmlDoc = xml.responseXML;
    
    firstnames = htmlColToArray(xmlDoc.getElementsByTagName("firstname"));
    lastnames = htmlColToArray(xmlDoc.getElementsByTagName("lastname"));
    states = htmlColToArray(xmlDoc.getElementsByTagName("state"));
    messages = htmlColToArray(xmlDoc.getElementsByTagName("message"));
}

function openXML(path) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            getElements(xhttp); 
            findElements();
            autoSlide();
        }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
}

function loadNext() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            xmlDoc = xhttp.responseXML;
            
            firstnames = firstnames.concat(htmlColToArray(xmlDoc.getElementsByTagName("firstname")));
            lastnames = lastnames.concat(htmlColToArray(xmlDoc.getElementsByTagName("lastname")));
            states = states.concat(htmlColToArray(xmlDoc.getElementsByTagName("state")));
            messages = messages.concat(htmlColToArray(xmlDoc.getElementsByTagName("message")));
        }
    };
    xhttp.open("GET", xmlResource, true);
    xhttp.send();
}

function slideForwards() {
    if (blocked == true)
        return;
    
    blocked = true;
    
    if (current == -1) {
        backwardsSlide.classList.add("slideUnselectable");
    } else if (current == 0) {
        backwardsSlide.classList.remove("slideUnselectable");
    } else if (current + 3 >= firstnames.length) {
        loadNext();
    }
    
    current++;
    
    slideContent.classList.remove("slideBackwards");
    slideContent.classList.remove("slideForwards");
    slideContent.offsetWidth = slideContent.offsetWidth;
    slideContent.classList.add("slideForwards");
    
    setTimeout(function () {
        setSlideScreen(current);
        blocked = false;
    }, 300);
}

function slideBackwards() {
    if (blocked == true)
        return;
    
    blocked = true;
    
    if (current == 0) {
        blocked = false;
        return;
    } else if (current <= 1) {
        backwardsSlide.classList.add("slideUnselectable");
    }
    
    current--;
    
    slideContent.classList.remove("slideBackwards");
    slideContent.classList.remove("slideForwards");
    slideContent.offsetWidth = slideContent.offsetWidth;
    slideContent.classList.add("slideBackwards");
    
    setTimeout(function () {
        setSlideScreen(current);
        blocked = false;
    }, 300);
}

function autoSlide() {
    if (!hovering) {
        slideForwards();
    }
    setTimeout(autoSlide, 15000);
}

$(document).ready(function(){
    $("#slider").hover(function () {
        hovering = true;
    }, function () {
        hovering = false;
    });
}); 

window.onload = function () {
    openXML(xmlResource);
};