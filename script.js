document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop - (mainNav.offsetHeight), // Adjust for sticky header height
                    behavior: 'smooth'
                });
            }

            // Close mobile nav after clicking an anchor link
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // FAQ Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;

            // Toggle the 'active' class on the header
            header.classList.toggle('active');

            // Toggle the max-height for smooth open/close
            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
                accordionContent.style.paddingBottom = '0px'; // Remove padding when closed
            } else {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                accordionContent.style.paddingBottom = '20px'; // Restore padding when open
            }

            // Optional: Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.style.maxHeight = null;
                    otherContent.style.paddingBottom = '0px';
                }
            });
        });
    });


    // Simple form submission (for demonstration purposes, no actual backend)
    const deliveryForm = document.getElementById('deliveryForm');
    if (deliveryForm) {
        deliveryForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission

            // Basic client-side validation
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const location = document.getElementById('location').value;
            const volume = document.getElementById('volume').value;

            if (!name || !phone || !location || !volume) {
                alert('Please fill in all required fields (Name, Phone, Location, Desired Water Volume).');
                return;
            }

            alert('Thank you for your water delivery request! We will contact you shortly to confirm your order and provide a quote.');
            deliveryForm.reset(); // Clear the form after submission
            // In a real application, you would send this data to a backend server
            // using Fetch API or XMLHttpRequest.
            // Example:
            // fetch('/submit-delivery-request', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         name: name,
            //         phone: phone,
            //         email: document.getElementById('email').value,
            //         location: location,
            //         volume: volume,
            //         date: document.getElementById('date').value,
            //         purpose: document.getElementById('purpose').value,
            //         notes: document.getElementById('notes').value
            //     }),
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Success:', data);
            //     alert('Thank you for your water delivery request! We will contact you shortly.');
            //     deliveryForm.reset();
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            //     alert('There was an error submitting your request. Please try again or call us directly.');
            // });
        });
    }

    // Basic Testimonial Slider (manual for static site)
    // For a real site, consider a dedicated library like Swiper.js or slick.js
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach((item, i) => {
            item.style.display = (i === index) ? 'block' : 'none';
        });
    }

    // Call showTestimonial initially to show the first one
    if (totalTestimonials > 0) {
        showTestimonial(currentTestimonial);

        // Auto-advance testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
});
