// Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav ul');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });

        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        });

        // Check saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animate progress bars on scroll
        const animateProgressBars = () => {
            document.querySelectorAll('.progress-fill').forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (bar.getBoundingClientRect().top < window.innerHeight - 100) {
                    bar.style.width = `${width}%`;
                }
            });
        };

        window.addEventListener('scroll', animateProgressBars);
        animateProgressBars(); // Run once on load

        // Project filtering
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                document.querySelectorAll('.project-card').forEach(card => {
                    card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter) 
                        ? 'block' 
                        : 'none';
                });
            });
        });

        // Typewriter effect for terminal
        const texts = [
            "npm install creativity", 
            "git push innovation", 
            "node passion.js",
            "const solution = await findSolution();"
        ];
        let count = 0;
        let index = 0;
        let currentText = "";
        let isDeleting = false;

        function type() {
            currentText = texts[count];
            const typedText = document.getElementById('typed-text');
            
            if (isDeleting) {
                typedText.textContent = currentText.substring(0, index--);
                if (index === 0) {
                    isDeleting = false;
                    count = (count + 1) % texts.length;
                }
            } else {
                typedText.textContent = currentText.substring(0, index++);
                if (index > currentText.length) {
                    isDeleting = true;
                }
            }
            
            setTimeout(type, isDeleting ? 50 : 150);
        }

        type();

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                // In a real implementation, you would send this to your backend or Formspree
                const formData = new FormData(e.target);
                const response = await fetch('https://formspree.io/f/your-form-id', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    alert('Message sent successfully!');
                    e.target.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Error sending message. Please try again later.');
                console.error('Form submission error:', error);
            }
        });

        // Console greeting
        console.log('%c👋 Hello fellow dev!', 'font-size: 18px; color: #4361ee;');
        console.log('%cCheck out my GitHub: https://github.com/alexdev-dot', 'font-size: 14px; color: #6c757d;');
