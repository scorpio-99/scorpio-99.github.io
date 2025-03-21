function displayBucketList() {
    const container = document.getElementById('plans-list');
    container.innerHTML = data.bucketList
        .map(plan => `
            <li class="plan-item card hover-grow">
                <div class="plan-text">${plan.item}</div>
                <div class="plan-status">${plan.status}</div>
            </li>
        `).join('');
}

displayBucketList(); 