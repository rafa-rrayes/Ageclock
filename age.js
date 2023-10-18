function getAgeInYears(birthdate) {
    const now = new Date();

    const yearsDifference = now.getFullYear() - birthdate.getFullYear();
    const birthdayThisYear = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());

    let age = (now < birthdayThisYear) ? yearsDifference - 1 : yearsDifference;

    const millisecondsInYear = 31557600000; // Average milliseconds in a year (including leap years)
    const millisecondsSinceLastBirthday = now - ((now < birthdayThisYear) ? new Date(now.getFullYear() - 1, birthdate.getMonth(), birthdate.getDate()) : birthdayThisYear);
    
    const fractionalYear = millisecondsSinceLastBirthday / millisecondsInYear;

    return age + fractionalYear;
}

function updateAgeDisplay() {
    const birthdateValue = getBirthdateValue();
    if (birthdateValue) {
        const birthdateObj = new Date(birthdateValue);
        if (!isNaN(birthdateObj.getTime())) {
            const age = getAgeInYears(birthdateObj);
            document.getElementById('age').innerHTML = "You are exactly <br> " + age.toFixed(9) + "<br> Years old";
        } else {
            document.getElementById('age').textContent = 'Invalid birthdate';
        }
    } else {
        document.getElementById('age').textContent = 'Please enter birthdate';
    }
}

function getBirthdateValue() {
    const birthdateInput = document.getElementById('birthdate');
    return birthdateInput.value;
}

// Remove the need for the button and start updating as soon as the user selects a date
document.getElementById('birthdate').addEventListener('input', () => {
    updateAgeDisplay();
    setInterval(updateAgeDisplay, 50);
});
