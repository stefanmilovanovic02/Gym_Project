$(document).ready(function () {
  // Dohvati ime izabrane rutine iz URL-a
  var urlParams = new URLSearchParams(window.location.search);
  var selectedRoutineName = urlParams.get("routineName");

  // Postavi ime rutine u header kartice
  $("#routineTitle").text(selectedRoutineName);

  // Prikazi vezbe za izabranu rutinu
  displayRoutineExercises(selectedRoutineName);

  // Funkcija za prikazivanje vezbi izabrane rutine
  function displayRoutineExercises(routineName) {
    var $routineDetails = $("#routineDetails");
    var routines = getRoutinesFromLocalStorage();

    // Pronadji izabranu rutinu
    var selectedRoutine = routines.find(function (routine) {
      return routine.name === routineName;
    });

    if (selectedRoutine) {
      // Prikazi vezbe izabrane rutine
      selectedRoutine.exercises.forEach(function (exercise) {
        var $exerciseItem = $("<div class='exercise-item'>");
        $exerciseItem.text(exercise);

        // Dodaj dodatne informacije za svaku vezbu
        var $exerciseDetails = $("<div class='exercise-details'>");
        $exerciseDetails.append("<h6>Exercise Description:</h6>");
        $exerciseDetails.append(
          "<textarea class='description-text' placeholder='Enter exercise description...'></textarea>"
        );

        // Dodaj prvi set
        addSet($exerciseDetails);

        // Dodaj dugme za dodavanje seta
        var $addSetButton = $(
          "<button class='btn btn-success button2 addSet'>Add Set</button>"
        );
        $addSetButton.on("click", function () {
          addSet($exerciseDetails);
        });

        $routineDetails.append($exerciseItem);
        $routineDetails.append($exerciseDetails);
        $routineDetails.append($addSetButton);
      });
    }
  }

  // Funkcija za dobavljanje rutina iz localStorage
  function getRoutinesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("routines")) || [];
  }

  // Funkcija za dodavanje seta
  function addSet($exerciseDetails) {
    var $setContainer = $("<div class='set-item'>");
    var setNumber = $exerciseDetails.find(".set-item").length + 1;

    $setContainer.append(
      "<span class='set-counter'>Set " + setNumber + ":</span>"
    );
    $setContainer.append("<input type='text' placeholder='Reps'>");
    $setContainer.append("<input type='text' placeholder='Weight (kg)'>");

    $exerciseDetails.append($setContainer);
  }
});
