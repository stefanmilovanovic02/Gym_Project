
<?php

    // Uključivanje fajla za konekciju sa bazom podataka
        include 'connection.php';

    // Pokretanje sesije
        session_start();
    
    // Provera da li je korisnik već prijavljen
        if (isset($_SESSION['korisnik_id'])) {    // Korisnik je već prijavljen, redirekcija na početnu stranicu
            header("Location: ../app.html");  // ovo treba promeniti
        exit();
        }

    // Provera da li je forma za login poslata
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

         // Prihvatanje podataka iz forme
                $email = $_POST['email'];
                $lozinka = $_POST['password'];
        
        // Provera korisnika u bazi podataka
            $upit = "SELECT * FROM korisnici WHERE email = '$email'";
                $rezultat = mysqli_query($conn, $upit);
            if (mysqli_num_rows($rezultat) === 1) {   // Korisnik pronađen, provera lozinke
                $korisnik = mysqli_fetch_assoc($rezultat);
            if (password_verify($lozinka, $korisnik['lozinka'])) {  // Lozinka je ispravna, korisnik je uspešno prijavljen
                $_SESSION['korisnik_id'] = $korisnik['id'];
                    header("Location: ../app.html");
            exit();
            }
        }

            // Neuspešna prijava, prikazivanje odgovarajuće poruke
                echo "Pogrešna email adresa ili lozinka.";
        }
?>