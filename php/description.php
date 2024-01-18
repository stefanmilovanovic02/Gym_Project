<?php
// Uključivanje connection.php skripte za konekciju na bazu
include('connection.php');

// Provera da li je zahtev poslat metodom POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Dobijanje vrednosti iz POST zahteva
    $gender = $_POST['gender'];
    $age = $_POST['age'];
    $height = $_POST['height'];
    $weight = $_POST['weight'];
    $goal_weight = $_POST['goal_weight'];
    $bodyfat = $_POST['bodyfat'];
    $weekly = $_POST['weekly'];

    // SQL upit za unos podataka u tabelu "informacije"
    $sql = "INSERT INTO informacije (gender, age, height, weight, goal_weight, bodyfat, weekly) 
            VALUES ('$gender', '$age', '$height', '$weight', '$goal_weight', '$bodyfat', '$weekly')";

    // Izvršavanje upita
    if ($conn->query($sql) === TRUE) {
        // Ako je unos uspešan, preusmeri korisnika na app.html
        header("Location: ../app.html");
        exit(); // Odmah završi izvršavanje skripte nakon preusmeravanja
    } else {
        echo "Greška prilikom upisa podataka u bazu: " . $conn->error;
    }
}
// Zatvaranje konekcije
$conn->close();
?>
