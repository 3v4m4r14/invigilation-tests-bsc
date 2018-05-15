/*
Thesis
"Attacks regarding online tests and ensuring the integrity of results based on the example of TTÜ admission test"
Eva Maria Veitmaa, 155408IAPB
Tallinn University of Technology
2018
*/

var appId = config.APP_ID;
var apiKey = config.KEY;
var kairos = new Kairos(appId, apiKey);

var candidate = {
    'id': null,
    'gender': null,
    'age': null,
    'race': null
};

var successfulEnroll = false;


//https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
(function () {
    var canvas = document.getElementById('canvas');
    var kairosWidth = canvas.width;
    var kairosHeight = canvas.height;
    var video = document.getElementById('video');

    function galleryTeardown() {
        kairosRemoveGallery();
    }

    function kairosDetect() {
        var image = getImageFromCanvas();
        kairos.detect(image, showDetectData);
    }

    function kairosEnroll() {
        var image = getImageFromCanvas();
        kairos.enroll(image, "thesis_gallery", candidate['id'], showEnrollData);
    }


    function kairosRecognize() {
        var image = getImageFromCanvas();
        kairos.recognize(image, "thesis_gallery", showRecognitionResult);
    }

    function kairosVerify() {
        var image = getImageFromCanvas();
        kairos.verify(image, "thesis_gallery", candidate['id'], showVerifyResult)
    }

    function kairosViewSubjectsInGallery() {
        kairos.viewSubjectsInGallery("thesis_gallery", function (response) {
            showErrors(response);
        });
    }

    function kairosRemoveGallery() {
        kairos.removeGallery("thesis_gallery", function (response) {
            showErrors(response);
        });
    }


    function getImageFromCanvas() {
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, kairosWidth, kairosHeight);
        return canvas.toDataURL('image/png');
    }

    $('#kairosDetect').click(function () {
        kairosDetect();
    });
    $('#kairosEnroll').click(function () {
        kairosEnroll();
    });
    $('#kairosRecognise').click(function () {
        kairosRecognize();
    });
    $('#kairosVerify').click(function () {
        kairosVerify();
    });
    $('#kairosGalleryView').click(function () {
        kairosViewSubjectsInGallery();
    });
    $('#kairosGalleryRemove').click(function () {
        kairosRemoveGallery();
    });
    $('#loginBtn').click(function () {
        candidate['id'] = $('#candidateEmail').val();
        var valid = validEmail(candidate['id']);
        kairosEnroll();
        setTimeout(function () {
            if (valid && successfulEnroll) {
                $('#candidateId').text(candidate['id']);
                $('#registrationModal').modal('hide');
            } else if (!valid){
                $('#loginHelp').text("Invalid email.").css("color", "red");
            } else if (!successfulEnroll) {
                $('#loginHelp').text("Facial recognition error.").css("color", "red");
            }
        }, 1500);
    });

    window.addEventListener('load', galleryTeardown, false);
    window.addEventListener('beforeunload', galleryTeardown, false);
})();


function resetDataText() {
    $('#numOfFacesKairos').text('0');
    $('#genderKairos').text('unknown');
    $('#glassesKairos').text('unknown');
    $('#raceKairos').text('unknown');
    $('#ageKairos').text('unknown');
    $('#feedbackMsg').text('');
}

function showDetectData(response) {
    resetDataText();
    var parsed = JSON.parse(response.responseText);

    if (parsed.images !== null && parsed.images !== undefined) {
        var faces = parsed.images[0].faces;
        $('#numOfFacesKairos').text(faces.length);
        showFacesData(faces);
    } else if (hasErrors(parsed)) {
        getErrors(parsed);
    }
}

function showEnrollData(response) {
    resetDataText();
    var parsed = JSON.parse(response.responseText);

    if (parsed.images !== null && parsed.images !== undefined) {
        var face = parsed.images[0];
        $('#numOfFacesKairos').text(face.length);
        showPersonData(face);
        successfulEnroll = true;
    } else if (hasErrors(parsed)) {
        getErrors(parsed);
        successfulEnroll = false;
    }
}

function showFacesData(faces) {
    if (faces.length === 1) {
        var person = faces[0];
        showPersonData(person);
    } else {
        turnOverlayOn();
    }
}

function showPersonData(person) {
    $('#feedbackMsg').text("-");
    $('#numOfFacesKairos').text('1');
    $('#genderKairos').text(person.attributes.gender.type);
    candidate['gender'] = person.attributes.gender.type;
    $('#glassesKairos').text(person.attributes.glasses);
    $('#ageKairos').text(person.attributes.age);
    candidate['age'] = person.attributes.age;
    showRaceData(person);
}

function showRaceData(person) {
    var races = {
        'white': person.attributes.white,
        'black': person.attributes.black,
        'asian': person.attributes.asian,
        'hispanic': person.attributes.hispanic,
        'other': person.attributes.other
    };
    var maxVal = -1;
    var text = "";
    for (var race in races) {
        text += "<div class='row'><div class='col'>" + race + "</div><div class='col'>" + races[race] + "</div></div>";
        if (races[race] > maxVal) {
            maxVal = races[race];
            candidate['race'] = race;
        }
    }
    $('#raceKairos').html(text);
}

function showRecognitionResult(response) {
    resetDataText();
    var parsed = JSON.parse(response.responseText);

    if (parsed.images !== null && parsed.images !== undefined) {
        var candidates = parsed.images[0].candidates;
        var transactionMessage = parsed.images[0].transaction.message;

        if (candidates !== null && candidates !== undefined) {
            var curCandidate = candidates[0].subject_id;
            var confidence = candidates[0].confidence;

            $('#feedbackMsg').text(curCandidate + " (" + confidence + ")");
            $('#numOfFacesKairos').text('1');
            if (confidence >= 0.6) {
                $('#genderKairos').text(candidate['gender']);
                $('#raceKairos').text(candidate['race']);
                $('#ageKairos').text(candidate['age']);
            }
        }
        if (transactionMessage !== null && transactionMessage !== undefined) {
            $('#feedbackMsg').text(transactionMessage);
        }

    } else if (hasErrors(parsed)) {
        getErrors(parsed);
    }
}

function showCandidateData() {
    $('#genderKairos').text(candidate['gender']);
    $('#raceKairos').text(candidate['race']);
    $('#ageKairos').text(candidate['age']);
}

function showVerifyResult(response) {
    resetDataText();
    var parsed = JSON.parse(response.responseText);

    if (parsed.images !== null && parsed.images !== undefined) {
        var transaction = parsed.images[0].transaction;
        var confidence = transaction.confidence;
        var subjectId = transaction.subject_id;
        var status = transaction.status;

        $('#feedbackMsg').text(subjectId + " (" + confidence + ")");
        $('#numOfFacesKairos').text('1');

        if (confidence >= 0.8) {
            showCandidateData();
        }
    } else if (hasErrors(parsed)) {
        getErrors(parsed);
    }
}

function hasErrors(parsed) {
    return parsed.Errors !== null && parsed.Errors !== undefined;
}

function getErrors(parsed) {
    var err = parsed.Errors[0].Message;
    $('#feedbackMsg').text(err);
}

function showErrors(response) {
    var parsed = JSON.parse(response.responseText);
    if (hasErrors(parsed)) {
        getErrors(parsed);
    }
}

function setErrorText(err) {
    resetDataText();
    $('#feedbackMsg').text(err);
}

function validEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
