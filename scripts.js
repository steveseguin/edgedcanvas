document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Product filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterBtns.length && productCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter products
                productCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (testimonialSlides.length) {
        let currentSlide = 0;
        
        // Initialize first slide and dot
        testimonialSlides[0].classList.add('active');
        testimonialDots[0].classList.add('active');
        
        // Function to show slide
        function showSlide(index) {
            // Remove active class from all slides and dots
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            testimonialSlides[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            
            // Update current slide
            currentSlide = index;
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let prevSlide = currentSlide - 1;
                if (prevSlide < 0) prevSlide = testimonialSlides.length - 1;
                showSlide(prevSlide);
            });
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let nextSlide = currentSlide + 1;
                if (nextSlide >= testimonialSlides.length) nextSlide = 0;
                showSlide(nextSlide);
            });
        }
        
        // Dot navigation
        testimonialDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showSlide(slideIndex);
            });
        });
        
        // Auto slideshow
        setInterval(function() {
            let nextSlide = currentSlide + 1;
            if (nextSlide >= testimonialSlides.length) nextSlide = 0;
            showSlide(nextSlide);
        }, 7000);
    }
    
    // Parallax effect for featured image
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const featuredSection = document.querySelector('.featured');
            const featuredTop = featuredSection.offsetTop;
            const featuredHeight = featuredSection.offsetHeight;
            
            if (scrolled > featuredTop - window.innerHeight && scrolled < featuredTop + featuredHeight) {
                const parallaxValue = (scrolled - featuredTop + window.innerHeight) * 0.1;
                parallaxImg.style.transform = `scale(1.1) translateY(-${parallaxValue}px)`;
            }
        });
    }
    
    // Video modal
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="close-modal">&times;</button>
                    <div class="video-wrapper">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1" frameborder="0" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .video-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-content {
                    position: relative;
                    width: 90%;
                    max-width: 800px;
                }
                
                .close-modal {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                }
                
                .video-wrapper {
                    position: relative;
                    padding-bottom: 56.25%;
                    height: 0;
                    overflow: hidden;
                }
                
                .video-wrapper iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(modal);
            
            // Close modal on click
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close modal on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(modal)) {
                        document.body.removeChild(modal);
                    }
                }
            });
        });
    }
    
    // Live stream status
    const streamStatus = document.getElementById('streamStatus');
    const liveStreamContainer = document.getElementById('liveStreamContainer');
    
    if (streamStatus && liveStreamContainer) {
        // Check if stream is live (this would be an API call in production)
        const isLive = false; // Change to true to show live stream
        
        if (isLive) {
            streamStatus.textContent = 'LIVE';
            streamStatus.classList.add('live');
            
            // Embed live stream (YouTube example)
            liveStreamContainer.innerHTML = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID&autoplay=1" frameborder="0" allowfullscreen></iframe>
            `;
        } else {
            // Show placeholder with next stream info
            liveStreamContainer.innerHTML = `
                <div class="stream-placeholder">
                    <div class="not-live-message">
                        <img src="images/stream-offline.jpg" alt="Stream Offline" class="offline-img">
                        <h3>We're not streaming right now</h3>
                        <p>Check our schedule below for upcoming streams</p>
                    </div>
                </div>
            `;
            
            // Add styles for placeholder
            const style = document.createElement('style');
            style.textContent = `
                .stream-placeholder {
                    width: 100%;
                    height: 100%;
                    background-color: #111;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .not-live-message {
                    text-align: center;
                    color: white;
                    padding: 2rem;
                }
                
                .offline-img {
                    max-width: 150px;
                    margin: 0 auto 1.5rem;
                    opacity: 0.7;
                }
                
                .not-live-message h3 {
                    color: white;
                    margin-bottom: 0.5rem;
                }
                
                .not-live-message p {
                    opacity: 0.7;
                }
            `;
            
            document.head.appendChild(style);
        }
    }
    
    // Stream reminders
    const reminderBtns = document.querySelectorAll('.reminder-btn');
    
    if (reminderBtns.length) {
        reminderBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const streamId = this.getAttribute('data-stream-id');
                // This would typically integrate with a calendar API or notification system
                
                // For demo purposes, just change the button text
                this.innerHTML = '<i class="fas fa-check"></i> Reminder Set';
                this.style.backgroundColor = '#4CAF50';
                this.style.borderColor = '#4CAF50';
                this.style.color = 'white';
                this.disabled = true;
            });
        });
    }
    
    // Past streams grid
    const pastStreamsGrid = document.getElementById('pastStreamsGrid');
    
    if (pastStreamsGrid) {
        // This would typically come from your backend
        const pastStreams = [
            {
                id: 1,
                title: 'Making Acoustic Art Panels',
                thumbnail: 'images/stream-thumb-1.jpg',
                url: '#',
                date: '2 weeks ago',
                views: 1240
            },
            {
                id: 2,
                title: 'Leather Watch Strap Engraving',
                thumbnail: 'images/stream-thumb-2.jpg',
                url: '#',
                date: '3 weeks ago',
                views: 985
            },
            {
                id: 3,
                title: 'Custom Knife Handle Carving',
                thumbnail: 'images/stream-thumb-3.jpg',
                url: '#',
                date: '1 month ago',
                views: 1567
            },
            {
                id: 4,
                title: 'Speaker Cabinet Design',
                thumbnail: 'images/stream-thumb-4.jpg',
                url: '#',
                date: '1 month ago',
                views: 1089
            }
        ];
        
        // Populate past streams
        pastStreams.forEach(stream => {
            const streamEl = document.createElement('div');
            streamEl.className = 'stream-card';
            streamEl.innerHTML = `
                <a href="${stream.url}">
                    <div class="stream-thumbnail">
                        <img src="${stream.thumbnail}" alt="${stream.title}">
                        <div class="stream-date">${stream.date}</div>
                    </div>
                    <div class="stream-info">
                        <h4>${stream.title}</h4>
                        <div class="stream-meta">
                            <span><i class="fas fa-eye"></i> ${stream.views}</span>
                        </div>
                    </div>
                </a>
            `;
            pastStreamsGrid.appendChild(streamEl);
        });
        
        // Add stream card styles
        const style = document.createElement('style');
        style.textContent = `
            .stream-card {
                border-radius: var(--border-radius);
                overflow: hidden;
                box-shadow: var(--box-shadow);
                transition: var(--transition);
                background-color: white;
            }
            
            .stream-card:hover {
                transform: translateY(-5px);
                box-shadow: var(--box-shadow-hover);
            }
            
            .stream-thumbnail {
                position: relative;
            }
            
            .stream-thumbnail img {
                width: 100%;
                height: 150px;
                object-fit: cover;
            }
            
            .stream-date {
                position: absolute;
                bottom: 0;
                right: 0;
                background-color: rgba(0,0,0,0.7);
                color: white;
                padding: 0.3rem 0.6rem;
                font-size: 0.8rem;
            }
            
            .stream-info {
                padding: 1rem;
            }
            
            .stream-info h4 {
                font-size: 1rem;
                margin-bottom: 0.5rem;
                color: var(--text-dark);
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                line-height: 1.3;
                height: 2.6rem;
            }
            
            .stream-meta {
                font-size: 0.8rem;
                color: var(--text-light);
            }
            
            .stream-meta span {
                display: inline-flex;
                align-items: center;
            }
            
            .stream-meta i {
                margin-right: 0.25rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to your server
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>Thank you for your message!</h3>
                    <p>We appreciate you contacting EdgedCanvas. One of our team members will be in touch with you shortly.</p>
                </div>
            `;
        });
    }
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your server
            console.log('Newsletter signup:', email);
            
            // Show success message
            newsletterForm.innerHTML = `
                <div class="success-message" style="background-color: transparent; color: white;">
                    <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <h3 style="color: white;">Thank you for subscribing!</h3>
                    <p>You've been added to our mailing list.</p>
                </div>
            `;
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (mobileMenuBtn) {
                            mobileMenuBtn.classList.remove('active');
                            const spans = mobileMenuBtn.querySelectorAll('span');
                            spans[0].style.transform = 'none';
                            spans[1].style.opacity = '1';
                            spans[2].style.transform = 'none';
                        }
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const addAnimations = () => {
        // Animation styles
        const animationStyle = document.createElement('style');
        animationStyle.textContent = `
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .fade-in-left {
                opacity: 0;
                transform: translateX(-30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in-left.animate {
                opacity: 1;
                transform: translateX(0);
            }
            
            .fade-in-right {
                opacity: 0;
                transform: translateX(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in-right.animate {
                opacity: 1;
                transform: translateX(0);
            }
            
            .zoom-in {
                opacity: 0;
                transform: scale(0.9);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .zoom-in.animate {
                opacity: 1;
                transform: scale(1);
            }
            
            .delay-100 { transition-delay: 0.1s; }
            .delay-200 { transition-delay: 0.2s; }
            .delay-300 { transition-delay: 0.3s; }
            .delay-400 { transition-delay: 0.4s; }
            .delay-500 { transition-delay: 0.5s; }
        `;
        document.head.appendChild(animationStyle);
        
        // Add animation classes to elements
        document.querySelectorAll('h2').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
        
        document.querySelectorAll('.section-subtitle').forEach(el => {
            el.classList.add('fade-in', 'delay-100');
            observer.observe(el);
        });
        
        document.querySelectorAll('.product-card').forEach((el, index) => {
            el.classList.add('fade-in', `delay-${(index % 5) * 100}`);
            observer.observe(el);
        });
        
        document.querySelectorAll('.timeline-item').forEach((el, index) => {
            el.classList.add('fade-in', `delay-${index * 100}`);
            observer.observe(el);
        });
        
        document.querySelectorAll('.contact-item').forEach((el, index) => {
            el.classList.add('fade-in', `delay-${index * 100}`);
            observer.observe(el);
        });
        
        document.querySelectorAll('.value-item').forEach((el, index) => {
            el.classList.add('zoom-in', `delay-${index * 100}`);
            observer.observe(el);
        });
        
        document.querySelectorAll('.featured-content').forEach(el => {
            el.classList.add('fade-in-right');
            observer.observe(el);
        });
        
        document.querySelectorAll('.featured-image').forEach(el => {
            el.classList.add('fade-in-left');
            observer.observe(el);
        });
        
        document.querySelectorAll('.about-images').forEach(el => {
            el.classList.add('fade-in-left');
            observer.observe(el);
        });
        
        document.querySelectorAll('.about-text').forEach(el => {
            el.classList.add('fade-in-right');
            observer.observe(el);
        });
        
        document.querySelectorAll('.business-content').forEach(el => {
            el.classList.add('fade-in-left');
            observer.observe(el);
        });
        
        document.querySelectorAll('.business-image').forEach(el => {
            el.classList.add('fade-in-right');
            observer.observe(el);
        });
    };
    
    // Call the function to add animations
    addAnimations();
    
    // Sticky header adjustment on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});
