var cartTotal = 0; 

function addToCart(price, name, manufacturer, image) {
    cartTotal += price; // Dodajte cenu proizvoda na ukupnu cenu

    // Ažurirajte HTML za prikaz ukupne cene na ikonici korpe
    $('#cartTotal').text(cartTotal.toFixed(0)); // Prikazujemo ukupnu cenu sa dve decimale

    // Sačuvajte podatke o suplementu u localStorage
    saveSupplementToLocalStorage(price, name, manufacturer, image);
}

function saveSupplementToLocalStorage(price, name, manufacturer, image) {
    var supplement = {
        price: price,
        name: name,
        manufacturer: manufacturer,
        image: image
    };

    // Proverite da li već postoji localStorage pod ključem 'supplements'
    var storedSupplements = localStorage.getItem('supplements');
    var supplements = storedSupplements ? JSON.parse(storedSupplements) : [];

    // Dodajte novi suplement u niz
    supplements.push(supplement);

    // Sačuvajte ažurirani niz u localStorage
    localStorage.setItem('supplements', JSON.stringify(supplements));
}