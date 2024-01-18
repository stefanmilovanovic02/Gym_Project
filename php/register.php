<?php
// Uključivanje connection.php datoteke
include 'connection.php';

// Provera da li su podaci poslati POST metodom
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Dobijanje vrednosti iz forme
    $email = $_POST["email"];
    $username = $_POST["username"];
    $lozinka = $_POST["lozinka"];

    // Hashiranje lozinke
    $lozinkaHash = password_hash($lozinka, PASSWORD_DEFAULT);

    // SQL upit za unos podataka u tabelu "korisnici"
    $sql = "INSERT INTO korisnici (email, username, lozinka) VALUES ('$email', '$username', '$lozinkaHash')";

    if ($conn->query($sql) === TRUE) {
        // Ako je unos uspešan, preusmeri korisnika na sledeći korak
        header("Location: ../goal.html");
        exit();
    } else {
        // Ako se desi greška pri unosu, možete ispisati ili logovati poruku o grešci
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Zatvori konekciju
$conn->close();
?>
