var firstnames = [], lastnames = [], states = [], messages = [];
var slideAuthor, slideText, slideContent;
var backwardsSlide, forwardSlide;
var nextMessageTimeout = null;
var current = -1;
var blocked = false;
var hovering = false;
var loaded = false;
var xmlResource = "https://www.staatsschutz.at/appsrv/messages";
var timeout = 3000;

//for testing purposes use
//var xmlResource = "./appsrv/messages";

$(function () {
    findElements();
    
    var hash = window.location.hash.substring(1);
    if (hash == "dokumente") {
        $("#downloadsModal").modal("show");
    } else if (hash == "glosar") {
        $("#glossaryModal").modal("show");
    } else if (hash == "privacy") {
        $("#privacyModal").modal("show");
    }
})

function htmlColToArray(xml, tagName) {
    var i, x, xmlDoc, nodeArray = [];
    xmlDoc = xml.responseXML;
    x = xmlDoc.getElementsByTagName(tagName);
    for (i = 0; i < x.length; i++) {
		nodeArray.push(x[i].textContent);
    }
    return nodeArray;
}

function findElements() {
    $slideAuthor = $("#slideAuthor");
    $slideText = $("#slideText");
    $fixHeight = $("#fixHeight");
    $slideContent = $("#slideContent");
    $backwardsSlide = $("#slideleft");
    $forwardSlide = $("#slideright");
    $fadeout = $("#fadeout");
}

function adaptSlideTextHeight() {
    var scrollHeight = $slideText.prop("scrollHeight");
    $fixHeight.css('height', scrollHeight + 'px');
}

function setSlideScreen(index) {
    $slideAuthor.html(firstnames[index] + " " + lastnames[index] + ", " + states[index]);
    $slideText.html(messages[index]);
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
                $forwardSlide.removeClass("slideUnselectable");
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
        $backwardsSlide.addClass("slideUnselectable");
    } else if (current == 0) {
        $backwardsSlide.removeClass("slideUnselectable");
    } else if (current + 3 >= firstnames.length) {
        loadXML();
    }
    
    nextMessageTimeout && clearTimeout(nextMessageTimeout);
    nextMessageTimeout = setTimeout(autoSlide, timeout);
    
    current++;
    
    $slideContent.removeClass("slideBackwards");
    $slideContent.removeClass("slideForwards");
    $slideContent.offset($slideContent.offset());
    $slideContent.addClass("slideForwards");
    
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
        $backwardsSlide.addClass("slideUnselectable");
    }
    
    nextMessageTimeout && clearTimeout(nextMessageTimeout);
    nextMessageTimeout = setTimeout(autoSlide, timeout);

    current--;
    
    $slideContent.removeClass("slideBackwards");
    $slideContent.removeClass("slideForwards");
    $slideContent.offset($slideContent.offset());
    $slideContent.addClass("slideBackwards");
    
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
        $fadeout.css('opacity', 0);
    }, function () {
        hovering = false;
        $fixHeight.css('height', '2.3em');
        $fadeout.css('opacity', 1);
    });
}); 

window.onload = function () {
    loadXML();
};
