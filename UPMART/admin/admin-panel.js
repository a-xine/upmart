document.addEventListener('DOMContentLoaded', () => {
        const chartCanvas = document.getElementById('myChart');
        const logoutBtn = document.querySelector('.logout-btn');

        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d');
            const data = {
                labels: catLabels,
                datasets: [{
                    label: 'Top Categories',
                    data: catData,
                    backgroundColor: [
                        'rgba(128, 0, 0, 0.85)',
                        'rgba(255, 184, 28, 0.85)',
                        'rgba(225, 245, 218, 1)',
                        'rgba(26, 26, 46, 0.85)',
                        'rgba(224, 99, 15, 0.85)'
                    ],
                    hoverOffset: 15,
                    borderWidth: 0
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
        

        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to logout of UPMart?")) {
                    window.location.href = "../dashboard/logout.php"; 
                }
            });
        }
    }
    });

    // GLOBAL SCOPE FUNCTIONS (So HTML can find them)
    function handlePost(postId, action) {
        const postElement = document.getElementById(`post-${postId}`);
        if (!postElement) return;

        postElement.style.transition = '0.3s ease';
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateX(20px)';

        setTimeout(() => {
            postElement.remove();
            console.log(`Action: Post #${postId} was ${action}.`);
        }, 300);
    }

    function showPreview(title, seller, price, desc, img, category) {
        const emptyState = document.getElementById('emptyState');
        const content = document.getElementById('previewContent');
        const mainImg = document.getElementById('prevImg');

        if (mainImg) {
            mainImg.src = img;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (content) {
            content.style.display = 'block';
            
            document.getElementById('prevTitle').innerText = title;
            document.getElementById('prevSeller').innerText = seller;
            document.getElementById('prevPrice').innerText = price;
            document.getElementById('prevDesc').innerText = desc;
            document.getElementById('prevImg').src = img;
            
            // If your database query fetches the category name
            if(category) {
                document.getElementById('prevCategory').innerText = category;
            }
        }
    }

    function approvePost(postId) {
        const postElement = document.getElementById(`post-${postId}`);

        // Send the ID to our PHP script
        fetch('admin_approve.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `product_id=${postId}`
        })
        .then(response => response.text())
        .then(data => {
            if (data === "success") {
                // Animate and remove from the Admin's view
                postElement.style.transition = '0.4s ease';
                postElement.style.opacity = '0';
                postElement.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    postElement.remove();
                    // Update the pending count badge if you have one
                    updatePendingBadge(); 
                }, 400);
            }
        });
    }
