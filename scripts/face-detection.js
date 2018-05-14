/*
Thesis
"Attacks regarding online tests and ensuring the integrity of results based on the example of TTÜ admission test"
Eva Maria Veitmaa, 155408IAPB
Tallinn University of Technology
2018
*/

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var objects = new tracking.ObjectTracker('face');
    objects.setInitialScale(4);
    objects.setStepSize(2);
    objects.setEdgesDensity(0.1);
    tracking.track('#video', objects, {camera: true});
    objects.on('track', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        });

        $('#numOfFacesTrackingJs').text(event.data.length);
        if (event.data.length > 1) {
            turnOverlayOn();
        }
    });
};





