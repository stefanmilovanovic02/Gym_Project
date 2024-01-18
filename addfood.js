$(document).ready(function () {
  // Postavi event handler za dugme "Add food"
  $(".button1").on("click", function () {
    // Pronađi roditeljski element proizvoda
    var foodItem = $(this).closest(".proizvod");

    // Dohvati ime hrane
    var foodName = foodItem.find("h5").text();

    // Kreiraj HTML element za dodatu hranu
    var listItem =
      "<li>" +
      foodName +
      ' <button class="btn btn-danger btn-sm delete-btn">Delete</button></li>';

    // Dodaj element na listu
    $("#selectedExercisesList").append(listItem);
  });

  // Postavi event handler za dugme "Delete"
  $("#selectedExercisesList").on("click", ".delete-btn", function () {
    // Ukloni roditeljski element (li) kada se klikne na dugme "Delete"
    $(this).closest("li").remove();
  });

  // Postavi event handler za dugme "Log food"
  $(".button3").on("click", function () {
    // Sacuvaj listu hrane u local storage pod nazivom "food"
    var foodList = $("#selectedExercisesList").html();
    localStorage.setItem("food", foodList);
  });

  // Učitaj sačuvanu hranu iz local storage-a
  var savedFood = localStorage.getItem("food");
  if (savedFood) {
    $("#selectedExercisesList").html(savedFood);
  }
});
