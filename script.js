function daysUntilExpiry(expiryDate) {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}
document.addEventListener('DOMContentLoaded', function () {
    const foodForm = document.getElementById('foodForm');
    const foodItemInput = document.getElementById('food');
    const expiryDateInput = document.getElementById('expiry');
    const foodList = document.getElementById('foodList');

    let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];
    renderFoodList(foodItems);

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

            foodForm.reset();
        } else {
            alert('Please fill in both fields.');
        }
    });

    function renderFoodList(items) {
        foodList.innerHTML = '';
        items.forEach(item => {
            const daysLeft = daysUntilExpiry(item.expiry);
            const li = document.createElement('li');
            
            if (daysLeft < 1) {
                li.classList.add('red');
            } else if (daysLeft < 3) {
                li.classList.add('yellow');
            } else {
                li.classList.add('green');
            }

            li.innerHTML = `${item.name} - Expires in ${daysLeft} day(s) (${new Date(item.expiry).toLocaleDateString()})`;
            foodList.appendChild(li);
        });
    }
});