// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});

// Custom Cursor
const customCursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (customCursor && cursorFollower) {
    document.body.classList.add('custom-cursor-active');
    
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
    });
}

// Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(176, 38, 255, ${Math.random() * 0.5 + 0.2})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((a, i) => {
            particles.slice(i + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(176, 38, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Scroll Progress
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing effect for hero subtitle
const typingText = document.querySelector('.typing-text');
const texts = ['Creo experiencias digitales únicas', 'Desarrollador Full Stack', 'Diseñador Creativo', 'Apasionado por la tecnología'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
    
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

if (typingText) {
    setTimeout(typeEffect, 1000);
}

// Counter animation for stats
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Intersection Observer for counter animation
const statsSection = document.querySelector('.stats');
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Skill bars animation on scroll
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target.querySelector('.skill-progress');
            if (skillProgress) {
                const width = skillProgress.getAttribute('data-width');
                skillProgress.style.width = width;
            }
        }
    });
}, { threshold: 0.5 });

skillCards.forEach(card => {
    skillObserver.observe(card);
});

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Testimonials slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        dots[i].classList.remove('active');
        
        if (i === index) {
            card.classList.add('active');
            dots[i].classList.add('active');
        }
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Auto-rotate testimonials
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(176, 38, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[type="text"]:nth-of-type(2)').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && subject && message) {
            alert('¡Mensaje enviado con éxito! Gracias por contactarme.');
            contactForm.reset();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input').value;
        
        if (email) {
            alert('¡Gracias por suscribirte a mi newsletter!');
            newsletterForm.reset();
        } else {
            alert('Por favor, ingresa tu email.');
        }
    });
}

// Add parallax effect to floating shapes
const floatingShapes = document.querySelector('.floating-shapes');

if (floatingShapes) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        floatingShapes.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
}

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.skill-card, .project-card, .service-card, .about-content, .contact-content, .timeline-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.style.color = 'var(--text-primary)';
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--neon-purple)';
        }
    });
});

// User Authentication System
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const userDashboard = document.getElementById('userDashboard');
const linkCreation = document.getElementById('linkCreation');
const linkForm = document.getElementById('linkForm');
const generatedLink = document.getElementById('generatedLink');
const whatsappLink = document.getElementById('whatsappLink');
const usersGrid = document.getElementById('usersGrid');
const noUsers = document.getElementById('noUsers');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const toggleText = document.getElementById('toggleText');
const dashboardName = document.getElementById('dashboardName');
const dashboardEmail = document.getElementById('dashboardEmail');

// Load users from localStorage on page load
let users = JSON.parse(localStorage.getItem('whatsappUsers')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Remove expired users (older than 24 hours)
users = users.filter(user => {
    if (!user.createdAt) return true; // Keep users without links
    const createdAt = new Date(user.createdAt);
    const now = new Date();
    const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
    return hoursDiff < 24;
});
localStorage.setItem('whatsappUsers', JSON.stringify(users));

// Check if user is logged in
if (currentUser) {
    showUserDashboard(currentUser);
} else {
    // If not logged in, show registration form and hide other sections
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'flex';
    if (toggleText) toggleText.style.display = 'block';
    if (authTitle) {
        authTitle.innerHTML = 'Crear <span class="neon-text">Cuenta</span>';
    }
    if (authSubtitle) {
        authSubtitle.textContent = 'Regístrate para crear tu link de WhatsApp';
    }
    if (toggleText) {
        toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" onclick="toggleAuth(\'login\')">Inicia Sesión</a>';
    }
}

// Hide directory if user is not logged in
const directorySection = document.getElementById('directorio');
if (directorySection) {
    directorySection.style.display = currentUser ? 'block' : 'none';
}

// Hide directory link in navbar if user is not logged in
const directoryLink = document.querySelector('a[href="#directorio"]');
if (directoryLink) {
    directoryLink.style.display = currentUser ? 'block' : 'none';
}

// Display users on page load
displayUsers();

// Toggle between login and register
function toggleAuth(mode) {
    if (mode === 'register') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        authTitle.innerHTML = 'Crear <span class="neon-text">Cuenta</span>';
        authSubtitle.textContent = 'Regístrate para crear tu link de WhatsApp';
        toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" onclick="toggleAuth(\'login\')">Inicia Sesión</a>';
    } else {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
        authTitle.innerHTML = 'Iniciar <span class="neon-text">Sesión</span>';
        authSubtitle.textContent = 'Ingresa para crear tu link de WhatsApp';
        toggleText.innerHTML = '¿No tienes cuenta? <a href="#" onclick="toggleAuth(\'register\')">Regístrate</a>';
    }
}

// Login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailOrPhone = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Find user by email or phone
        const user = users.find(u => 
            u.email === emailOrPhone || u.phone === emailOrPhone
        );
        
        if (!user) {
            alert('Usuario no encontrado. Por favor, regístrate primero.');
            return;
        }
        
        if (user.password !== password) {
            alert('Contraseña incorrecta.');
            return;
        }
        
        // Login successful
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showUserDashboard(currentUser);
        
        // Show directory section
        const directorySection = document.getElementById('directorio');
        if (directorySection) {
            directorySection.style.display = 'block';
        }
        
        // Show directory link in navbar
        const directoryLink = document.querySelector('a[href="#directorio"]');
        if (directoryLink) {
            directoryLink.style.display = 'block';
        }
        
        loginForm.reset();
        alert('¡Sesión iniciada correctamente!');
    });
}

// Registration form submission
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('userName').value;
        const email = document.getElementById('userEmail').value;
        const phone = document.getElementById('userPhone').value;
        const password = document.getElementById('userPassword').value;
        
        // Validate phone number (only digits)
        const cleanPhone = phone.replace(/\D/g, '');
        
        if (cleanPhone.length < 10) {
            alert('Por favor, ingresa un número de teléfono válido (mínimo 10 dígitos)');
            return;
        }
        
        // Check if email or phone already exists
        const existingUser = users.find(user => 
            user.email === email || user.phone === cleanPhone
        );
        
        if (existingUser) {
            alert('Este email o número de teléfono ya está registrado');
            return;
        }
        
        // Create user object WITHOUT link initially
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            phone: cleanPhone,
            password: password,
            link: null,
            createdAt: null,
            likes: 0,
            likedBy: []
        };
        
        // Save to localStorage
        users.push(newUser);
        localStorage.setItem('whatsappUsers', JSON.stringify(users));
        
        // Auto login after registration
        currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        showUserDashboard(currentUser);
        
        // Show directory section
        const directorySection = document.getElementById('directorio');
        if (directorySection) {
            directorySection.style.display = 'block';
        }
        
        // Show directory link in navbar
        const directoryLink = document.querySelector('a[href="#directorio"]');
        if (directoryLink) {
            directoryLink.style.display = 'block';
        }
        
        // Reset form
        registerForm.reset();
        
        alert('¡Cuenta creada exitosamente! Ahora puedes crear tu link de WhatsApp.');
    });
}

// Show user dashboard
function showUserDashboard(user) {
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';
    if (toggleText) toggleText.style.display = 'none';
    if (authTitle) authTitle.style.display = 'none';
    if (authSubtitle) authSubtitle.style.display = 'none';
    
    if (userDashboard) {
        userDashboard.style.display = 'block';
    }
    
    if (dashboardName) {
        dashboardName.textContent = user.name;
    }
    
    if (dashboardEmail) {
        dashboardEmail.textContent = user.email;
    }
    
    // Show delete button only if user has an active link
    const deleteLinkBtn = document.getElementById('deleteLinkBtn');
    if (deleteLinkBtn) {
        deleteLinkBtn.style.display = user.link ? 'inline-flex' : 'none';
    }
    
    // Show generated link if user has an active link
    if (user.link && generatedLink) {
        generatedLink.style.display = 'block';
        if (whatsappLink) {
            whatsappLink.value = user.link;
        }
        // Show delete button since this is user's own link
        if (deleteLinkBtn) {
            deleteLinkBtn.style.display = 'inline-flex';
        }
    }
}

// Show link creation form
function showLinkCreation() {
    if (linkCreation) {
        linkCreation.style.display = 'block';
    }
    if (generatedLink) {
        generatedLink.style.display = 'none';
    }
}

// Hide link creation
function hideLinkCreation() {
    if (linkCreation) {
        linkCreation.style.display = 'none';
    }
    if (generatedLink) {
        generatedLink.style.display = 'none';
    }
}

// Link form submission
if (linkForm) {
    linkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const displayName = document.getElementById('linkDisplayName').value;
        const phone = document.getElementById('linkPhone').value;
        const photo = document.getElementById('linkPhoto').value;
        
        // Validate phone number (only digits)
        const cleanPhone = phone.replace(/\D/g, '');
        
        if (cleanPhone.length < 10) {
            alert('Por favor, ingresa un número de teléfono válido (mínimo 10 dígitos)');
            return;
        }
        
        // Generate WhatsApp link
        const waLink = `https://wa.me/${cleanPhone}`;
        
        // Update user with link, display name, photo and timestamp
        currentUser.link = waLink;
        currentUser.phone = cleanPhone;
        currentUser.displayName = displayName;
        currentUser.photo = photo || null;
        currentUser.createdAt = new Date().toISOString();
        
        // Update in users array
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
        }
        
        // Save to localStorage
        localStorage.setItem('whatsappUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Show generated link
        if (linkCreation) {
            linkCreation.style.display = 'none';
        }
        
        if (generatedLink) {
            generatedLink.style.display = 'block';
        }
        
        if (whatsappLink) {
            whatsappLink.value = waLink;
        }
        
        // Show delete button
        const deleteLinkBtn = document.getElementById('deleteLinkBtn');
        if (deleteLinkBtn) {
            deleteLinkBtn.style.display = 'inline-flex';
        }
        
        // Update directory
        displayUsers();
        
        // Reset form
        linkForm.reset();
        if (document.getElementById('photoPreview')) {
            document.getElementById('photoPreview').style.display = 'none';
        }
        
        alert('¡Link creado exitosamente! Comparte tu link, expira en 24 horas.');
    });
}

// Photo preview on input change
const linkPhotoInput = document.getElementById('linkPhoto');
if (linkPhotoInput) {
    linkPhotoInput.addEventListener('input', (e) => {
        const photoUrl = e.target.value;
        const photoPreview = document.getElementById('photoPreview');
        const previewImage = document.getElementById('previewImage');
        
        if (photoUrl) {
            previewImage.src = photoUrl;
            photoPreview.style.display = 'block';
        } else {
            photoPreview.style.display = 'none';
        }
    });
}

// Share link function
function shareLink(platform) {
    const link = whatsappLink.value;
    const shareText = `¡Contáctame por WhatsApp: ${link}`;
    
    let shareUrlFinal = '';
    
    switch(platform) {
        case 'whatsapp':
            shareUrlFinal = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            break;
        case 'twitter':
            shareUrlFinal = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
            break;
        case 'facebook':
            shareUrlFinal = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
            break;
    }
    
    if (shareUrlFinal) {
        window.open(shareUrlFinal, '_blank', 'width=600,height=400');
    }
}

// Copy link function
function copyLink() {
    const linkInput = document.getElementById('whatsappLink');
    if (linkInput) {
        linkInput.select();
        linkInput.setSelectionRange(0, 99999);
        
        navigator.clipboard.writeText(linkInput.value).then(() => {
            alert('Link copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
            alert('Error al copiar el link');
        });
    }
}

// Logout function
function logout() {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
        localStorage.removeItem('currentUser');
        currentUser = null;
        
        // Reset to login form
        if (loginForm) loginForm.style.display = 'flex';
        if (registerForm) registerForm.style.display = 'none';
        if (userDashboard) userDashboard.style.display = 'none';
        if (linkCreation) linkCreation.style.display = 'none';
        if (generatedLink) generatedLink.style.display = 'none';
        if (toggleText) toggleText.style.display = 'block';
        if (authTitle) authTitle.style.display = 'block';
        if (authSubtitle) authSubtitle.style.display = 'block';
        
        // Hide directory section
        const directorySection = document.getElementById('directorio');
        if (directorySection) {
            directorySection.style.display = 'none';
        }
        
        // Hide directory link in navbar
        const directoryLink = document.querySelector('a[href="#directorio"]');
        if (directoryLink) {
            directoryLink.style.display = 'none';
        }
        
        if (authTitle) {
            authTitle.innerHTML = 'Iniciar <span class="neon-text">Sesión</span>';
        }
        
        if (authSubtitle) {
            authSubtitle.textContent = 'Ingresa para crear tu link de WhatsApp';
        }
        
        alert('Sesión cerrada correctamente');
    }
}

// Delete user's own link
function deleteMyLink() {
    if (!currentUser || !currentUser.link) {
        alert('No tienes un link activo para eliminar');
        return;
    }
    
    if (confirm('¿Estás seguro de eliminar tu link de WhatsApp?')) {
        // Remove link from current user
        currentUser.link = null;
        currentUser.displayName = null;
        currentUser.photo = null;
        currentUser.createdAt = null;
        
        // Update in users array
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
        }
        
        // Save to localStorage
        localStorage.setItem('whatsappUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Hide generated link
        if (generatedLink) {
            generatedLink.style.display = 'none';
        }
        
        // Hide delete button
        const deleteLinkBtn = document.getElementById('deleteLinkBtn');
        if (deleteLinkBtn) {
            deleteLinkBtn.style.display = 'none';
        }
        
        // Update directory
        displayUsers();
        
        alert('Tu link ha sido eliminado correctamente');
    }
}

// Like user function
function likeUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    // Check if current user already liked
    if (currentUser && user.likedBy && user.likedBy.includes(currentUser.id)) {
        alert('Ya has dado like a este usuario');
        return;
    }
    
    // Only logged in users can like
    if (!currentUser) {
        alert('Debes iniciar sesión para dar like');
        return;
    }
    
    // Cannot like yourself
    if (userId === currentUser.id) {
        alert('No puedes darte like a ti mismo');
        return;
    }
    
    // Add like
    user.likes += 1;
    
    // Track who liked
    if (!user.likedBy) {
        user.likedBy = [];
    }
    user.likedBy.push(currentUser.id);
    
    // Update in users array
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = user;
    }
    
    // Update localStorage
    localStorage.setItem('whatsappUsers', JSON.stringify(users));
    
    // Update display
    displayUsers();
}

// Get time remaining until expiration
function getTimeRemaining(createdAt) {
    const created = new Date(createdAt);
    const now = new Date();
    const diff = 24 - ((now - created) / (1000 * 60 * 60));
    
    if (diff <= 0) return 'Expirado';
    
    const hours = Math.floor(diff);
    const minutes = Math.floor((diff - hours) * 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m restantes`;
    }
    return `${minutes}m restantes`;
}

// Display users in directory
function displayUsers() {
    if (!usersGrid || !noUsers) return;
    
    usersGrid.innerHTML = '';
    
    // Remove expired users
    users = users.filter(user => {
        if (!user.createdAt) return true; // Keep users without links
        const createdAt = new Date(user.createdAt);
        const now = new Date();
        const hoursDiff = (now - createdAt) / (1000 * 60 * 60);
        return hoursDiff < 24;
    });
    localStorage.setItem('whatsappUsers', JSON.stringify(users));
    
    if (users.length === 0) {
        noUsers.style.display = 'block';
        return;
    }
    
    noUsers.style.display = 'none';
    
    users.forEach(user => {
        // Only show users who have created links
        if (!user.link) return;
        
        const timeRemaining = getTimeRemaining(user.createdAt);
        const isExpired = timeRemaining === 'Expirado';
        
        const displayName = user.displayName || user.name;
        const userPhoto = user.photo || null;
        
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <div class="user-avatar">
                ${userPhoto ? `<img src="${userPhoto}" alt="${displayName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"><i class="fas fa-user"></i>` : '<i class="fas fa-user"></i>'}
            </div>
            <h3>${displayName}</h3>
            <p class="user-phone">+${user.phone}</p>
            ${isExpired ? '<span class="expired-badge">Expirado</span>' : `<p class="user-time">⏰ ${timeRemaining}</p>`}
            <div class="user-actions">
                <button class="like-btn" onclick="likeUser(${user.id})">
                    <i class="fas fa-heart"></i> ${user.likes}
                </button>
                ${!isExpired ? `<a href="${user.link}" target="_blank" class="whatsapp-btn">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>` : ''}
            </div>
        `;
        usersGrid.appendChild(userCard);
    });
}

// Update time remaining every minute
setInterval(() => {
    displayUsers();
}, 60000);

console.log('Portfolio loaded successfully! ✨');
