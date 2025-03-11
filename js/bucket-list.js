const bucketList = [
    {
        item: "Visit Disneyland together",
        status: "Soon"
    },
    {
        item: "Travel to Paris together",
        status: "Soon"
    },
    {
        item: "Visiting sicily",
        status: "Planning"
    },
    {
        item: "Travel to Rome",
        status: "Wishlist"
    }
];

function displayBucketList() {
    const container = document.getElementById('plans-list');
    container.innerHTML = bucketList.map(plan => `
        <li class="plan-item">
            <div class="plan-text">${plan.item}</div>
            <div class="plan-status">${plan.status}</div>
        </li>
    `).join('');
}

displayBucketList(); 