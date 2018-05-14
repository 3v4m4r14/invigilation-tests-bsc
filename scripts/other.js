/*
Thesis
"Attacks regarding online tests and ensuring the integrity of results based on the example of TTÜ admission test"
Eva Maria Veitmaa, 155408IAPB
Tallinn University of Technology
2018
*/

function turnOverlayOn() {
    $('#severalFacesModal').modal('show');
}

function showRegistration() {
    $('#registrationModal').modal('show');
}

showRegistration();

function changeInputLocation() {
    var btn = $("#clicker");
    var parent = btn.parent();
    var parentCoord = parent[0].getBoundingClientRect();

    var windowHeight = btn.parent().height();
    var windowWidth = btn.parent().width();

    var btnTop = Math.floor((Math.random() * (windowHeight - btn.height())) + 1);
    var btnLeft =  Math.floor((Math.random() * (windowWidth - btn.width())) + 1);

    btn.parent().css({position: 'relative'});
    btn.css({top: btnTop, left: btnLeft, position: 'absolute'});
}


$(document).ready(function () {
    $("#clicker").click(function () {
        changeInputLocation();
    });
});
