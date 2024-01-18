$(document).ready(function () {
  // Postavi event handler za dugme "Add Exercise"
  $(".button1").on("click", function () {
    var exerciseName = $(this).siblings("h5").text();
    addExerciseToList(exerciseName);
  });

  // Postavi event handler za dugme "Remove Exercise"
  $(document).on("click", ".removeExercise", function () {
    $(this).parent().remove();
  });

  // Postavi event handler za dugme "Log Workout"
  $(".button3").on("click", function () {
    var routineName = $("#routineName").val();
    if (routineName === "") {
      alert("Please enter routine name.");
      return;
    }

    var selectedExercises = [];
    $("#selectedExercisesList li").each(function () {
      selectedExercises.push($(this).text());
    });

    // Sacuvaj rutinu u localStorage
    saveRoutineToLocalStorage(routineName, selectedExercises);

    // Obrisi sve unose
    $("#routineName").val("");
    $("#selectedExercisesList").empty();
  });

  // Funkcija za dodavanje vezbe u listu sa desne strane
  function addExerciseToList(exerciseName) {
    var exerciseListItem =
      "<li>" +
      exerciseName +
      ' <button class="btn btn-danger removeExercise">Remove</button></li>';
    $("#selectedExercisesList").append(exerciseListItem);
  }

  // Funkcija za cuvanje rutine u localStorage
  function saveRoutineToLocalStorage(routineName, exercises) {
    var storedRoutines = JSON.parse(localStorage.getItem("routines")) || [];
    var newRoutine = {
      name: routineName,
      exercises: exercises,
    };
    storedRoutines.push(newRoutine);
    localStorage.setItem("routines", JSON.stringify(storedRoutines));
  }
});
