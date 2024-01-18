$(document).ready(function () {
    // Funkcija koja popunjava tabelu sa podacima iz korpe
    function renderCart() {
        // Dobavi podatke iz localStorage pod ključem 'supplements'
        var storedSupplements = localStorage.getItem('supplements');
        var supplements = storedSupplements ? JSON.parse(storedSupplements) : [];

        // Selektuj tbody element u koji ćemo dodati redove tabele
        var cartItemsContainer = $('#cartItems');

        // Isprazni trenutni sadržaj tabele
        cartItemsContainer.empty();

        // Iteriraj kroz sve suplemente u korpi
        supplements.forEach(function (supplement) {
            // Kreiraj HTML red za svaki suplement
            var row = '<tr>' +
                '<td><img src="' + supplement.image + '" alt="Supplement Image" style="width: 50px;"></td>' +
                '<td>' + supplement.name + '</td>' +
                '<td>$' + supplement.price.toFixed(0) + '</td>' +
                '<td><button class="btn btn-danger btn-sm remove-btn" data-name="' + supplement.name + '">Remove</button></td>' +
                '</tr>';

            // Dodaj red u tabelu
            cartItemsContainer.append(row);
        });

        // Dodaj event handler za dugme Remove
        $('.remove-btn').on('click', function () {
            var itemNameToRemove = $(this).data('name');
            removeItemFromCart(itemNameToRemove);
            renderCart(); // Ažuriraj tabelu nakon uklanjanja stavke iz korpe
        });
    }

    // Funkcija za uklanjanje stavke iz korpe na osnovu imena
    function removeItemFromCart(itemName) {
        var storedSupplements = localStorage.getItem('supplements');
        var supplements = storedSupplements ? JSON.parse(storedSupplements) : [];

        // Pronađi indeks stavke koja se uklanja
        var indexToRemove = supplements.findIndex(function (supplement) {
            return supplement.name === itemName;
        });

        // Ukloni stavku iz niza
        if (indexToRemove !== -1) {
            supplements.splice(indexToRemove, 1);
            // Sačuvaj ažuriran niz u localStorage
            localStorage.setItem('supplements', JSON.stringify(supplements));
        }
    }

    // Pozovi funkciju za popunjavanje tabele kada se dokument učita
    renderCart();
});