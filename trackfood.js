function daysUntilExpiry(expiryDate) {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}

document.addEventListener('DOMContentLoaded', function () {
    const foodForm = document.getElementById('food-form');
    const foodItemInput = document.getElementById('food-item');
    const expiryDateInput = document.getElementById('expiry-date');
    const foodList = document.getElementById('food-list');
    const expiringAlert = document.getElementById('expiring-alert');

    let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
    renderFoodList(foodItems);
    checkForExpiringItems(foodItems);

    foodForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const foodItem = foodItemInput.value.trim();
        const expiryDate = expiryDateInput.value;

        if (foodItem && expiryDate) {
            const foodObj = {
                name: foodItem,
                expiry: expiryDate
            };

            foodItems.push(foodObj);
            localStorage.setItem('foodItems', JSON.stringify(foodItems));
            renderFoodList(foodItems);
            checkForExpiringItems(foodItems);

            foodForm.reset();
        } else {
            alert('Please fill in both fields.');
        }
    });

    function renderFoodList(items) {
        foodList.innerHTML = '';
        items.forEach((item, index) => {
            const daysLeft = daysUntilExpiry(item.expiry);
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - Expires in ${daysLeft} day(s) (${new Date(item.expiry).toLocaleDateString()})
                            <button class="remove-item" data-index="${index}">Remove</button>`;
            foodList.appendChild(li);
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeFoodItem);
        });
    }

    function removeFoodItem(event) {
        const index = event.target.getAttribute('data-index');
        foodItems.splice(index, 1);
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        renderFoodList(foodItems);
        checkForExpiringItems(foodItems);
    }

    function checkForExpiringItems(items) {
        const expiringSoon = items.filter(item => daysUntilExpiry(item.expiry) <= 2);
        if (expiringSoon.length > 0) {
            expiringAlert.style.display = 'block';
            expiringAlert.innerHTML = '⚠️ Warning: Some items are expiring soon!';
        } else {
            expiringAlert.style.display = 'none';
        }
    }
});