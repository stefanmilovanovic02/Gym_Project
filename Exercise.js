// Funkcija koja će se izvršiti kada se učita cela stranica
$(document).ready(function () {
  // Prikazivanje imena rutina prilikom učitavanja stranice
  displayRoutineNames();

  // Funkcija za prikazivanje imena rutina
  function displayRoutineNames() {
    var $routineList = $("#routineList");
    var routines = getRoutinesFromLocalStorage();

    // Prikazivanje imena rutina kao direktne linkove
    routines.forEach(function (routine) {
      var $routineItem = $("<div class='routine-item'>");

      // Dodajte query parametar routineName u URL za svaku rutinu
      var urlWithQuery =
        "routine.html?routineName=" + encodeURIComponent(routine.name);

      // Direktan link za ime rutine
      $routineItem.append(
        "<h5><a href='" + urlWithQuery + "'>" + routine.name + "</a></h5>"
      );

      // Dodajte dugme za brisanje rutine
      var $deleteButton = $(
        "<button class='btn btn-danger deleteRoutine'>Delete</button>"
      );
      $deleteButton.on("click", function () {
        // Poziv funkcije za brisanje rutine i osvežavanje prikaza
        deleteRoutine(routine.name);
        displayRoutineNames();
      });
      $routineItem.append($deleteButton);

      $routineList.append($routineItem);
    });
  }

  // Funkcija za dobavljanje rutina iz localStorage
  function getRoutinesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("routines")) || [];
  }

  // Funkcija za brisanje rutine iz localStorage
  function deleteRoutine(routineName) {
    var routines = getRoutinesFromLocalStorage();
    var updatedRoutines = routines.filter(function (routine) {
      return routine.name !== routineName;
    });
    localStorage.setItem("routines", JSON.stringify(updatedRoutines));
  }
});
