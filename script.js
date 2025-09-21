let currentSlide = 1;
const totalSlides = 13;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide-container');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show current slide
    if (n > totalSlides) currentSlide = 1;
    if (n < 1) currentSlide = totalSlides;
    
    slides[currentSlide - 1].classList.add('active');
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide - 1);
    });
    
    // Update navigation buttons state
    const prevBtns = document.querySelectorAll('#prevBtn');
    const nextBtns = document.querySelectorAll('#nextBtn');
    
    prevBtns.forEach(btn => {
        btn.style.opacity = currentSlide === 1 ? '0.5' : '1';
        btn.disabled = currentSlide === 1;
    });
    
    nextBtns.forEach(btn => {
        btn.style.opacity = currentSlide === totalSlides ? '0.5' : '1';
        btn.disabled = currentSlide === totalSlides;
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    showSlide(currentSlide);
}

// Initialize indicators
function initializeIndicators() {
    const indicatorsContainers = document.querySelectorAll('#indicators');
    indicatorsContainers.forEach(container => {
        // Clear existing indicators
        container.innerHTML = '';
        
        for (let i = 1; i <= totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'slide-indicator';
            if (i === 1) indicator.classList.add('active');
            indicator.onclick = () => goToSlide(i);
            container.appendChild(indicator);
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
});

// Initialize presentation
initializeIndicators();
showSlide(1);

// Initialize charts when slides are shown
function initializeCharts() {
    // Market Growth Chart
    const marketCtx = document.getElementById('marketGrowthChart');
    if (marketCtx) {
        new Chart(marketCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [{
                    label: 'Market Size (INR Cr)',
                    data: [34860, 40856, 47883, 56119, 65752, 77061, 90316, 106240],
                    borderColor: '#60A5FA',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#60A5FA',
                    pointRadius: 4
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 26, 79, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return 'INR ' + context.parsed.y.toLocaleString() + ' Cr';
                            }
                        }
                    }
                }
            }
        });
    }

    // Financial Projections Chart
    const financeCtx = document.getElementById('financialProjectionsChart');
    if (financeCtx) {
        new Chart(financeCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Year 1', 'Year 2', 'Year 3'],
                datasets: [{
                    label: 'ARR (INR Cr)',
                    data: [9.96, 39.84, 99.6],
                    backgroundColor: 'rgba(96, 165, 250, 0.7)',
                    borderColor: 'rgba(96, 165, 250, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Net Revenue (INR Cr)',
                    data: [8.47, 34.66, 88.64],
                    backgroundColor: 'rgba(167, 139, 250, 0.7)',
                    borderColor: 'rgba(167, 139, 250, 1)',
                    borderWidth: 1
                },
                {
                    label: 'EBITDA (INR Cr)',
                    data: [-1.66, 9.96, 29.05],
                    backgroundColor: 'rgba(52, 211, 153, 0.7)',
                    borderColor: 'rgba(52, 211, 153, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            padding: 20,
                            boxWidth: 12
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 26, 79, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': INR ' + context.parsed.y + ' Cr';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize charts when the page loads
setTimeout(initializeCharts, 100);
