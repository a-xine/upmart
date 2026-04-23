document.addEventListener('DOMContentLoaded', () => {
    const chartCanvas = document.getElementById('myChart');
    const logoutBtn = document.querySelector('.logout-btn');
    const postBtn = document.getElementById('postBtn');
    const bulletinInput = document.getElementById('bulletinText');
    const bulletinList = document.getElementById('bulletinList');
    const notifDrawer = document.getElementById('notifDrawer');
    const notifTrigger = document.getElementById('notifTrigger'); 
    const closeNotifBtn = document.getElementById('closeNotifBtn');

    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        const data = {
            labels: ['Academic', 'Electronics', 'Dorm Essentials', 'Food'],
            datasets: [{
                label: 'Top Categories',
                data: [6, 9, 11, 15],
                backgroundColor: [
                    'rgba(128, 0, 0, 0.85)',
                    'rgba(255, 184, 28, 0.85)',
                    'rgba(225, 245, 218, 1)',
                    'rgba(26, 26, 46, 0.85)'
                ],
                hoverOffset: 15
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true, // Circular markers in legend
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12,
                                weight: '600'
                            }
                        }
                    }
                }
            }
        };

        new Chart(ctx, config);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to logout of UPMart?")) {
                window.location.href = "login.html"; // Redirects to login
            }
        });
    }

    if (postBtn) {
        postBtn.addEventListener('click', () => {
            const message = bulletinInput.value.trim();

            // RESTRICTION 1: Check for empty text
            if (message === "") {
                alert("Please enter a message before posting.");
                return;
            }

            // RESTRICTION 2: Check for inappropriate keywords (Example)
            const forbiddenWords = ["spam", "fuck", "nigga", "sex", "mlm", "wlw", "rave", "tangina", "dumb", "bobo"];
            const containsBadWord = forbiddenWords.some(word => message.toLowerCase().includes(word));

            if (containsBadWord) {
                alert("Your post contains restricted language.");
                return;
            }

            // Create the post element
            const newPost = document.createElement('div');
            newPost.className = 'post';
            newPost.textContent = message;

            // Add to the top of the list
            bulletinList.prepend(newPost);

            // Clear the input
            bulletinInput.value = "";
        });

        if (notifTrigger && notifDrawer) {
            notifTrigger.addEventListener('click', () => {
                notifDrawer.classList.toggle('open');
            });
        }

        if (closeNotifBtn) {
            closeNotifBtn.addEventListener('click', () => {
                notifDrawer.classList.remove('open');
            });
        }

        document.addEventListener('click', (event) => {
            if (!notifDrawer.contains(event.target) && !notifTrigger.contains(event.target)) {
                notifDrawer.classList.remove('open');
            }
        });
    }

});
