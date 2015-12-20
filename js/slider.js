var firstnames = [], lastnames = [], states = [], messages = [];
var slideAuthor, slideText, slideContent;
var backwardsSlide, forwardSlide;
var nextMessageTimeout = null;
var current = -1;
var blocked = false;
var hovering = false;
var loaded = false;
var xmlResource = "https://www.staatsschutz.at/appsrv/messages";
var timeout = 15000;

//for testing purposes use
//var xmlResource = "./appsrv/messages";

$(function () {
    findElements();
})

function htmlColToArray(xml, tagName) {
    var i, x, xmlDoc, nodeArray = [];
    xmlDoc = xml.responseXML;
    x = xmlDoc.getElementsByTagName(tagName);
    for (i = 0; i < x.length; i++) {
        nodeArray = nodeArray.concat([$("<div/>").text(x[i].childNodes[0].nodeValue).html()]);
    }
    return nodeArray;
}

function findElements() {
    slideAuthor = document.getElementById("slideauthor");
    slideText = document.getElementById("slidetext");
    slideContent = document.getElementById("slideContent");
    backwardsSlide = document.getElementById("slideleft");
    forwardSlide = document.getElementById("slideright");
    quoteFadeout = document.getElementById("quoteFadeout");
}

function adaptSlideTextHeight() {
    var sHeight = $('#slidetext')[0].scrollHeight;
    $('#slidetext').css('height', sHeight + 'px');
}

function setSlideScreen(index) {
    slideAuthor.innerHTML = firstnames[index] + " " + lastnames[index] + ", " + states[index];
    slideText.innerHTML = messages[index];
    if (hovering)
        adaptSlideTextHeight();
}

function getElements(xml) {
    firstnames = firstnames.concat(htmlColToArray(xml, "firstname"));
    lastnames = lastnames.concat(htmlColToArray(xml, "lastname"));
    states = states.concat(htmlColToArray(xml, "state"));
    messages = messages.concat(htmlColToArray(xml, "message"));
}

function loadXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            getElements(xhttp);
            if(!loaded) {
                loaded = true;
                forwardSlide.classList.remove("slideUnselectable");
                setTimeout(autoSlide, timeout);
            }
        }
    };
    xhttp.open("GET", xmlResource, true);
    xhttp.send();
}

function slideForwards() {
    if (blocked || ! loaded)
        return;
    
    blocked = true;
    
    if (current == -1) {
        backwardsSlide.classList.add("slideUnselectable");
    } else if (current == 0) {
        backwardsSlide.classList.remove("slideUnselectable");
    } else if (current + 3 >= firstnames.length) {
        loadXML();
    }
    
    nextMessageTimeout && clearTimeout(nextMessageTimeout);
    nextMessageTimeout = setTimeout(autoSlide, timeout);
    
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
    if (blocked || ! loaded)
        return;
    
    blocked = true;
    
    if (current == 0) {
        blocked = false;
        return;
    } else if (current <= 1) {
        backwardsSlide.classList.add("slideUnselectable");
    }
    
    nextMessageTimeout && clearTimeout(nextMessageTimeout);
    nextMessageTimeout = setTimeout(autoSlide, timeout);

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
}

$(document).ready(function(){
    $("#slider").hover(function () {
        hovering = true;
        adaptSlideTextHeight();
        $('#fadeout').css('opacity', 0);
    }, function () {
        hovering = false;
        $('#slidetext').css('height', '2.3em');
        $('#fadeout').css('opacity', 1);
    });
}); 

window.onload = function () {
    loadXML();
};
