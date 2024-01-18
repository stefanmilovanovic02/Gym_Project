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
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
  } else {
    bmr =
      10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
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

  resultElement.textContent = `${calories} Remaining`;
}

// Postavljanje podrazumevanog datuma na današnji datum
document.getElementById("datePicker").valueAsDate = new Date();

// Poziv funkcije za prikaz rezultata nakon učitavanja dokumenta
document.addEventListener("DOMContentLoaded", displayCalories);


document.addEventListener('DOMContentLoaded', function () {
  // Dummy data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Exercise Data",
        data: [10, 20, 15, 25, 30],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart configuration
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  // Initialize Chart
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, config);

  // Initialize Datepicker
  const datepicker = new Pikaday({
    field: document.getElementById("datepicker"),
    format: "MM/DD/YYYY",
    onSelect: function (date) {
      // Handle date selection, e.g., update the chart data based on the selected date
      const newData = generateRandomData(); // Replace with your logic to fetch data for the selected date
      myChart.data.labels = newData.labels;
      myChart.data.datasets[0].data = newData.data;
      myChart.update();
    },
  });

  // Function to generate random data (replace with your data fetching logic)
  function generateRandomData() {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May"];
    const data = labels.map(() => Math.floor(Math.random() * 50));
    return { labels, data };
  }

  // Initialize Chart for the third card
  const ctxThird = document.getElementById("myChartThird").getContext("2d");
  const myChartThird = new Chart(ctxThird, config);

  // Initialize Datepicker for the third card
  const datepickerThird = new Pikaday({
    field: document.getElementById("datePickerThird"),
    format: "MM/DD/YYYY",
    onSelect: function (date) {
      // Handle date selection for the third card
      const newData = generateRandomData(); // Replace with your logic to fetch data for the selected date
      myChartThird.data.labels = newData.labels;
      myChartThird.data.datasets[0].data = newData.data;
      myChartThird.update();
    },
  });
});


