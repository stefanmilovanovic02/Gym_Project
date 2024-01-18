<?php
// Uključivanje connection.php datoteke
include 'connection.php';

// Provera da li su podaci poslati POST metodom
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Provera koji radio button je izabran
    if (isset($_POST['activityOption'])) {
        // Escapovanje unetih vrednosti radi sprečavanja SQL injection
        $selectedActivity = $conn->real_escape_string($_POST['activityOption']);

        // SQL upit za unos podataka u tabelu "informacije"
        $sql = "UPDATE informacije SET activity = '$selectedActivity'";

        if ($conn->query($sql) === TRUE) {
            // Ako je unos uspešan, preusmeri korisnika na sledeći korak
            header("Location: ../description.html");
            exit();
        } else {
            // Ako se desi greška pri unosu, možete ispisati ili logovati poruku o grešci
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        // Ako nije izabran nijedan radio button
        echo "Molimo izaberite jednu od opcija.";
    }
}

// Zatvori konekciju
$conn->close();
?>