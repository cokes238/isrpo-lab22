const profileForm = document.getElementById('profileForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const cityInput = document.getElementById('city');
const hobbyInput = document.getElementById('hobby');
const displayName = document.getElementById('displayName');
const displayAge = document.getElementById('displayAge');
const displayCity = document.getElementById('displayCity');
const displayHobby = document.getElementById('displayHobby');
const clearBtn = document.getElementById('clearBtn');
const errorMessage = document.getElementById('errorMessage');

function validateForm() {
    if (!nameInput.value.trim()) {
        errorMessage.textContent = 'Пожалуйста, введите имя';
        nameInput.style.borderColor = '#f56565';
        return false;
    }
    nameInput.style.borderColor = '#e0e0e0';
    
    if (!ageInput.value.trim()) {
        errorMessage.textContent = 'Пожалуйста, введите возраст';
        ageInput.style.borderColor = '#f56565';
        return false;
    }
    
    const age = parseInt(ageInput.value);
    if (isNaN(age) || age < 0 || age > 150) {
        errorMessage.textContent = 'Пожалуйста, введите корректный возраст (0-150)';
        ageInput.style.borderColor = '#f56565';
        return false;
    }
    ageInput.style.borderColor = '#e0e0e0';
    
    if (!cityInput.value.trim()) {
        errorMessage.textContent = 'Пожалуйста, введите город';
        cityInput.style.borderColor = '#f56565';
        return false;
    }
    cityInput.style.borderColor = '#e0e0e0';
    
    if (!hobbyInput.value.trim()) {
        errorMessage.textContent = 'Пожалуйста, введите хобби';
        hobbyInput.style.borderColor = '#f56565';
        return false;
    }
    hobbyInput.style.borderColor = '#e0e0e0';
    
    errorMessage.textContent = '';
    return true;
}

function updateProfileDisplay() {
    displayName.textContent = nameInput.value.trim() || 'Не указано';
    displayAge.textContent = ageInput.value.trim() || 'Не указано';
    displayCity.textContent = cityInput.value.trim() || 'Не указано';
    displayHobby.textContent = hobbyInput.value.trim() || 'Не указано';
}

function handleSubmit(event) {
    event.preventDefault();
    
    if (validateForm()) {
        updateProfileDisplay();
        errorMessage.style.color = '#48bb78';
        errorMessage.textContent = '✓ Данные успешно сохранены!';
        
        setTimeout(() => {
            if (errorMessage.textContent === '✓ Данные успешно сохранены!') {
                errorMessage.textContent = '';
                errorMessage.style.color = '#f56565';
            }
        }, 3000);
    }
}

function clearData() {
    nameInput.value = '';
    ageInput.value = '';
    cityInput.value = '';
    hobbyInput.value = '';
    
    displayName.textContent = 'Не указано';
    displayAge.textContent = 'Не указано';
    displayCity.textContent = 'Не указано';
    displayHobby.textContent = 'Не указано';
    
    errorMessage.textContent = '';
    
    nameInput.style.borderColor = '#e0e0e0';
    ageInput.style.borderColor = '#e0e0e0';
    cityInput.style.borderColor = '#e0e0e0';
    hobbyInput.style.borderColor = '#e0e0e0';
}

profileForm.addEventListener('submit', handleSubmit);
clearBtn.addEventListener('click', clearData);