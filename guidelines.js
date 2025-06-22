document.addEventListener('DOMContentLoaded', function () {
    const guidelines = [
        { tip: "Plan your meals to avoid buying unnecessary food", details: "Create a meal plan for the week before going grocery shopping." },
        { tip: "Store food correctly to make it last longer", details: "Learn how to store vegetables, fruits, and other perishables in the fridge or pantry to extend their shelf life." },
        { tip: "Use leftovers creatively", details: "Make use of leftovers by turning them into new dishes, like soups, stir-fries, or salads." },
        { tip: "Freeze surplus food", details: "If you can't eat something before it expires, freeze it for later use instead of throwing it away." },
        { tip: "Check expiration dates regularly", details: "Organize your fridge and pantry, so you can easily spot foods that are nearing their expiration date." }
    ];

    const guidelinesList = document.getElementById('guidelinesList');

    guidelines.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('guideline-item');

        const tipTitle = document.createElement('h3');
        tipTitle.textContent = item.tip;
        tipTitle.classList.add('guideline-title');
        tipTitle.addEventListener('click', () => toggleDetails(index));

        const tipDetails = document.createElement('p');
        tipDetails.textContent = item.details;
        tipDetails.classList.add('guideline-details', 'hidden');
        tipDetails.setAttribute('id', `details-${index}`);

        const markButton = document.createElement('button');
        markButton.textContent = 'Mark as Completed';
        markButton.classList.add('mark-button');
        markButton.addEventListener('click', () => markAsCompleted(tipTitle));

        listItem.appendChild(tipTitle);
        listItem.appendChild(tipDetails);
        listItem.appendChild(markButton);
        guidelinesList.appendChild(listItem);
    });

    // Function to toggle tip details
    function toggleDetails(index) {
        const details = document.getElementById(`details-${index}`);
        details.classList.toggle('hidden');
    }

    // Function to mark a tip as completed
    function markAsCompleted(title) {
        title.style.textDecoration = 'line-through';
    }
});