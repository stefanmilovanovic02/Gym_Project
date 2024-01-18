// Funkcija koja čita podatke iz localStorage
function readUserDataFromLocalStorage() {
  return {
    goal: localStorage.getItem("goal"),
    activity: localStorage.getItem("activity"),
    gender: localStorage.getItem("gender"),
    age: parseInt(localStorage.getItem("age"), 10),
    weight: parseFloat(localStorage.getItem("weight")),
    height: parseFloat(localStorage.getItem("height")),
    goalWeight: parseFloat(localStorage.getItem("goal_weight")),
    weekly: parseFloat(localStorage.getItem("weekly")),
  };
}

// Funkcija koja izračunava dnevni unos kalorija
function calculateDailyCalories(userData) {
  // Izračunavanje BMR koristeći Mifflin-St Jeor Equation
  let bmr;
  if (userData.gender === "male") {
    bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5;
  } else {
    bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
  }

  // Prilagodba faktora aktivnosti prema izboru korisnika
  let activityFactor;
  switch (userData.activity) {
    case "sedentary":
      activityFactor = 1.2;
      break;
    case "lightly_active":
      activityFactor = 1.375;
      break;
    case "moderately_active":
      activityFactor = 1.55;
      break;
    case "very_active":
      activityFactor = 1.725;
      break;
    case "extra_active":
      activityFactor = 1.9;
      break;
    default:
      activityFactor = 1.2; // Postavljanje podrazumevane vrednosti
  }

  // Prilagođavanje kalorijskog unosa prema cilju (maintain, gain, lose)
  let goalFactor;
  switch (userData.goal) {
    case "maintain":
      goalFactor = 1.0;
      break;
    case "gain":
      goalFactor = 1.2; // Povećavamo za 20% za dobijanje težine
      break;
    case "lose":
      goalFactor = 0.8; // Smanjujemo za 20% za mršavljenje
      break;
    default:
      goalFactor = 1.0; // Ako nije postavljen cilj, koristimo podrazumevanu vrednost
  }

  // Izračunavanje dnevnog unosa kalorija
  const dailyCalories = bmr * activityFactor * goalFactor;

  return Math.round(dailyCalories); // Zaokruživanje na celobrojni rezultat
}

// Funkcija koja postavlja rezultat na ekran
function displayCalories() {
  const userData = readUserDataFromLocalStorage();
  const resultElement = document.getElementById("progressCircleText");
  const calories = calculateDailyCalories(userData);

  resultElement.textContent = `${calories} kcal`;
}

// Poziv funkcije za prikaz rezultata nakon učitavanja dokumenta
document.addEventListener("DOMContentLoaded", displayCalories);