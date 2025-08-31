// Portfolio JavaScript with enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    initNavigation();
    initProjectFilter();
    initProjectModals();
    initContactForm();
    initScrollAnimations();
    initLazyLoading();
    initProjectInteractions();
    initCounterAnimations();
    initThemeToggle();
    console.log('All modules initialized');
});

// Theme Toggle Functionality - MOVED TO TOP FOR PRIORITY
function initThemeToggle() {
    console.log('Initializing theme toggle...');
    
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Verificar que el elemento existe
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    console.log('Theme toggle button found successfully');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    body.setAttribute('data-theme', savedTheme);
    console.log('Applied saved theme:', savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Theme toggle clicked!');
        
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Switching from', currentTheme, 'to', newTheme);
        
        // Switch theme immediately
        body.setAttribute('data-theme', newTheme);
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Add visual feedback
        this.style.transform = 'scale(0.95) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Show theme change notification
        const themeName = newTheme === 'dark' ? 'Modo Oscuro' : 'Modo Claro';
        showThemeNotification(`Cambiado a ${themeName}`);
    });
    
    // Add hover effect to theme toggle
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    function showThemeNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '80px',
            right: '20px',
            padding: '12px 20px',
            background: 'var(--accent-color)',
            color: 'white',
            borderRadius: '25px',
            fontSize: '0.875rem',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
            zIndex: '3000',
            transform: 'translateX(300px) scale(0.8)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            backdropFilter: 'blur(10px)'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(300px) scale(0.8)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, 2500);
    }
}

// Enhanced project card interactions
function initProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add entrance animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Click effect
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn-view')) {
                this.classList.add('pop');
                setTimeout(() => {
                    this.classList.remove('pop');
                }, 600);
            }
        });
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            // Add glow to nearby cards
            const siblings = Array.from(this.parentElement.children);
            const currentIndex = siblings.indexOf(this);
            
            siblings.forEach((sibling, siblingIndex) => {
                if (Math.abs(siblingIndex - currentIndex) === 1) {
                    sibling.style.transform = 'translateY(-5px) scale(1.01)';
                    sibling.style.filter = 'brightness(1.05)';
                }
            });
            
            // Animate metrics with stagger
            const metrics = this.querySelectorAll('.metric');
            metrics.forEach((metric, metricIndex) => {
                setTimeout(() => {
                    metric.style.transform = 'translateY(-8px) scale(1.1)';
                    metric.style.background = 'rgba(59, 130, 246, 0.15)';
                }, metricIndex * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset nearby cards
            const siblings = Array.from(this.parentElement.children);
            siblings.forEach(sibling => {
                sibling.style.transform = '';
                sibling.style.filter = '';
            });
            
            // Reset metrics
            const metrics = this.querySelectorAll('.metric');
            metrics.forEach(metric => {
                metric.style.transform = '';
                metric.style.background = '';
            });
        });
        
        // Random subtle animation every few seconds
        setTimeout(() => {
            setInterval(() => {
                if (!card.matches(':hover')) {
                    card.classList.add('shimmer');
                    setTimeout(() => {
                        card.classList.remove('shimmer');
                    }, 2000);
                }
            }, 8000 + (index * 1500)); // Stagger the intervals
        }, index * 2000);
    });
}

// Counter animations for stats
function initCounterAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            if (element.textContent.includes('%')) {
                element.textContent = `${current}%`;
            } else if (element.textContent.includes('+')) {
                element.textContent = `${current}+`;
            } else {
                element.textContent = current.toString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                animateCounter(element, number, 1500);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });

    // Active link highlighting based on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;

        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionBottom = sectionTop + targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Project filtering functionality - SIMPLIFIED AND FIXED
function initProjectFilter() {
    console.log('Initializing project filter...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found project cards:', projectCards.length);
    
    // Log initial data for debugging
    projectCards.forEach(card => {
        console.log('Card category:', card.getAttribute('data-category'));
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            console.log('Filter clicked:', filter);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                console.log('Checking card with category:', category, 'against filter:', filter);
                
                if (filter === 'all' || category === filter) {
                    console.log('Showing card');
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    console.log('Hiding card');
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
            
            // Update project count
            updateProjectCount();
        });
    });
    
    console.log('Project filter initialized successfully');
}

// Project modal functionality
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.btn-view');

    // Project data
    const projectsData = {
        '1': {
            title: 'TechStore - E-commerce Landing',
            category: 'E-commerce',
            description: 'Landing page para una tienda de tecnología que aumentó las conversiones en un 45%. Diseño centrado en productos destacados con call-to-actions estratégicos.',
            challenge: 'El cliente tenía un bounce rate muy alto (78%) y conversiones bajas. Los usuarios no entendían la propuesta de valor.',
            solution: 'Implementé un diseño limpio con jerarquía visual clara, testimonios prominentes y un proceso de compra simplificado.',
            results: [
                '+45% en conversiones',
                '-60% en bounce rate',
                '+120% tiempo en página',
                '+85% en CTR del CTA principal'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Shopify', 'Google Analytics'],
            liveUrl: '#',
            images: ['assets/project-1-full.jpg', 'assets/project-1-mobile.jpg']
        },
        '2': {
            title: 'CloudSync - SaaS Platform',
            category: 'SaaS',
            description: 'Página de registro para una plataforma de sincronización en la nube. Logró aumentar los sign-ups en un 80% con un diseño enfocado en beneficios.',
            challenge: 'La página anterior era muy técnica y no comunicaba claramente los beneficios del producto.',
            solution: 'Creé una narrativa visual que muestra el problema, la solución y los beneficios. Incluí una demo interactiva.',
            results: [
                '+80% en sign-ups',
                '35% CTR en botón principal',
                '+65% completación de formulario',
                '4.2/5 satisfaction score'
            ],
            technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
            liveUrl: '#',
            images: ['assets/project-2-full.jpg', 'assets/project-2-mobile.jpg']
        },
        '3': {
            title: 'ConsultPro - Servicios Profesionales',
            category: 'Servicios',
            description: 'Landing page para una consultora que triplicó la generación de leads. Enfoque en credibilidad y casos de éxito.',
            challenge: 'Los usuarios no confiaban en el servicio y había pocas conversiones de la página anterior.',
            solution: 'Diseño profesional con testimonios verificados, casos de estudio detallados y formulario de contacto optimizado.',
            results: [
                '+120% en generación de leads',
                '28% tasa de conversión',
                '+200% consultas calificadas',
                '92% satisfacción del cliente'
            ],
            technologies: ['WordPress', 'Custom CSS', 'PHP', 'HubSpot', 'Google Optimize'],
            liveUrl: '#',
            images: ['assets/project-3-full.jpg', 'assets/project-3-mobile.jpg']
        },
        '4': {
            title: 'InnovateLab - Startup Launch',
            category: 'Startup',
            description: 'Landing page de pre-lanzamiento que generó más de 500 registros previos. Diseño que comunica innovación y crea expectativa.',
            challenge: 'Startup sin producto finalizado necesitaba generar interés y capturar early adopters.',
            solution: 'Página de coming soon con storytelling compelling, preview del producto y sistema de referidos.',
            results: [
                '500+ pre-registros',
                '42% CTR en CTA principal',
                '25% tasa de referidos',
                '$50K+ funding generado'
            ],
            technologies: ['Next.js', 'Styled Components', 'EmailJS', 'Netlify', 'Figma'],
            liveUrl: '#',
            images: ['assets/project-4-full.jpg', 'assets/project-4-mobile.jpg']
        }
    };

    // Open modal
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                showProjectModal(project);
            }
        });
    });

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function showProjectModal(project) {
        if (!modalBody) return;
        
        modalBody.innerHTML = `
            <div class="project-modal-content">
                <div class="project-modal-header">
                    <h2 class="project-modal-title">${project.title}</h2>
                    <span class="project-modal-category">${project.category}</span>
                </div>
                
                <div class="project-modal-description">
                    <p>${project.description}</p>
                </div>
                
                <div class="project-modal-details">
                    <div class="project-detail">
                        <h3>Desafío</h3>
                        <p>${project.challenge}</p>
                    </div>
                    
                    <div class="project-detail">
                        <h3>Solución</h3>
                        <p>${project.solution}</p>
                    </div>
                    
                    <div class="project-detail">
                        <h3>Resultados</h3>
                        <ul class="results-list">
                            ${project.results.map(result => `<li>${result}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-detail">
                        <h3>Tecnologías</h3>
                        <div class="tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
}

// Contact form functionality with Netlify Forms
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            message: formData.get('message')
        };
        
        // Enhanced validation
        const validation = validateForm(data);
        if (!validation.isValid) {
            e.preventDefault(); // Only prevent default if validation fails
            showFormError(validation.message, validation.field);
            highlightErrorField(validation.field);
            return;
        }
        
        // Clear any previous errors
        clearErrorHighlights();
        clearFormStatus();
        
        // Show loading state for better UX
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
        }
        
        // Track successful submission (optional)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'Contact',
                event_label: 'Portfolio Contact Form - Netlify'
            });
        }
        
        // CRITICAL: Allow form to submit naturally to Netlify
        // But add a timeout to redirect if Netlify doesn't
        setTimeout(() => {
            window.location.href = '/thank-you.html';
        }, 1000); // Wait 1 second then redirect
    });
    
    // Enhanced form validation
    function validateForm(data) {
        // Check required fields
        if (!data.name || data.name.trim().length < 2) {
            return {
                isValid: false,
                message: 'El nombre debe tener al menos 2 caracteres',
                field: 'name'
            };
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            return {
                isValid: false,
                message: 'Por favor ingresa un email válido',
                field: 'email'
            };
        }
        
        if (!data.message || data.message.trim().length < 10) {
            return {
                isValid: false,
                message: 'El mensaje debe tener al menos 10 caracteres',
                field: 'message'
            };
        }
        
        // Check for spam patterns
        const spamPatterns = [
            /https?:\/\//gi, // URLs
            /\b(click here|free money|make money|guaranteed)\b/gi
        ];
        
        const fullText = `${data.name} ${data.email} ${data.message}`.toLowerCase();
        const hasSpam = spamPatterns.some(pattern => pattern.test(fullText));
        
        if (hasSpam) {
            return {
                isValid: false,
                message: 'Tu mensaje parece contener contenido no permitido',
                field: 'message'
            };
        }
        
        return { isValid: true };
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormError(message, fieldName) {
        const formStatus = document.getElementById('formStatus');
        if (formStatus) {
            formStatus.innerHTML = `
                <div class="error-message-global">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2"/>
                        <line x1="15" y1="9" x2="9" y2="15" stroke="#ef4444" stroke-width="2"/>
                        <line x1="9" y1="9" x2="15" y2="15" stroke="#ef4444" stroke-width="2"/>
                    </svg>
                    <span>${message}</span>
                </div>
            `;
            formStatus.style.display = 'block';
        }
    }
    
    function clearFormStatus() {
        const formStatus = document.getElementById('formStatus');
        if (formStatus) {
            formStatus.innerHTML = '';
            formStatus.style.display = 'none';
        }
    }
    
    function highlightErrorField(fieldName) {
        clearErrorHighlights();
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = '#ef4444';
            field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            field.classList.add('error');
            
            // Add shake animation
            field.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                field.style.animation = '';
            }, 500);
            
            // Focus the field
            field.focus();
        }
    }
    
    function clearErrorHighlights() {
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.style.borderColor = '';
            field.style.boxShadow = '';
            field.classList.remove('error');
        });
    }
    
    // Add real-time validation feedback
    const formFields = form.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            clearErrorHighlights();
            clearFormStatus();
            
            // Real-time validation feedback
            if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
                field.style.borderColor = '#f59e0b';
                field.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
            } else if (field.value && field.checkValidity()) {
                field.style.borderColor = '#10b981';
                field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
            }
        });
        
        field.addEventListener('blur', function() {
            if (field.value && !field.checkValidity()) {
                field.style.borderColor = '#ef4444';
                field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            }
        });
    });
}

// Enhanced scroll animations with project card interactions
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('glow');
                        setTimeout(() => {
                            entry.target.classList.remove('glow');
                        }, 2000);
                    }, 500);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .stat, .about-text, .contact-form');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add mouse move parallax effect to project cards
    const projectsSection = document.querySelector('.projects');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (window.innerWidth > 768 && projectsSection) {
        projectsSection.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            projectCards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
                const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;
                
                const deltaX = (x - cardCenterX) / centerX;
                const deltaY = (y - cardCenterY) / centerY;
                
                const rotateX = deltaY * -5;
                const rotateY = deltaX * 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
        
        projectsSection.addEventListener('mouseleave', function() {
            projectCards.forEach(card => {
                card.style.transform = '';
            });
        });
    }
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => imageObserver.observe(img));
    }
}

// Additional modal styles (injected dynamically)
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-modal-content {
            max-width: 100%;
        }
        
        .project-modal-header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .project-modal-title {
            font-size: 2rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        
        .project-modal-category {
            font-size: 0.875rem;
            color: var(--accent-color);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 500;
        }
        
        .project-modal-description {
            margin-bottom: 2rem;
            font-size: 1.125rem;
            line-height: 1.7;
            color: var(--text-secondary);
        }
        
        .project-modal-details {
            margin-bottom: 2rem;
        }
        
        .project-detail {
            margin-bottom: 1.5rem;
        }
        
        .project-detail h3 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }
        
        .project-detail p {
            color: var(--text-secondary);
            line-height: 1.6;
        }
        
        .results-list {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 0.5rem;
        }
        
        .results-list li {
            padding: 0.5rem 1rem;
            background: var(--background-alt);
            border-radius: var(--border-radius);
            color: var(--text-primary);
            font-weight: 500;
            text-align: center;
        }
        
        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .tech-tag {
            padding: 0.25rem 0.75rem;
            background: var(--accent-color);
            color: white;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .results-list {
                grid-template-columns: 1fr;
            }
            
            .project-modal-title {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize modal styles
addModalStyles();

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
window.addEventListener('load', function() {
    // Remove any loading classes
    document.body.classList.remove('loading');
    
    // Preload critical images
    const criticalImages = [
        'assets/project-1.jpg',
        'assets/project-2.jpg',
        'assets/project-3.jpg',
        'assets/project-4.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Handle scroll performance
let ticking = false;
function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const nav = document.querySelector('.nav');
    
    // Add shadow to nav when scrolled
    if (nav) {
        if (scrolled > 100) {
            nav.style.boxShadow = 'var(--shadow-lg)';
        } else {
            nav.style.boxShadow = 'none';
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Initialize tooltips for metrics
function initTooltips() {
    const metrics = document.querySelectorAll('.metric');
    
    metrics.forEach(metric => {
        metric.addEventListener('mouseenter', function() {
            // Add tooltip functionality here if needed
        });
    });
}

// Call tooltip initialization
initTooltips();

// Magnetic hover effect for filter buttons
function initMagneticButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.3;
            const moveY = y * 0.3;
            
            this.style.setProperty('--mouse-x', `${moveX}px`);
            this.style.setProperty('--mouse-y', `${moveY}px`);
            this.classList.add('magnetic');
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.setProperty('--mouse-x', '0px');
            this.style.setProperty('--mouse-y', '0px');
            this.classList.remove('magnetic');
        });
    });
}

// Enhanced ripple effect
function addRippleEffect(element, event) {
    element.classList.add('ripple');
    
    setTimeout(() => {
        element.classList.add('active');
    }, 10);
    
    setTimeout(() => {
        element.classList.remove('ripple', 'active');
    }, 600);
}

// Add dynamic project count animation
function updateProjectCount() {
    const activeFilter = document.querySelector('.filter-btn.active');
    if (!activeFilter) return;
    
    const filter = activeFilter.getAttribute('data-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    let visibleCount = 0;
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            visibleCount++;
        }
    });
    
    // Update section subtitle with count
    const subtitle = document.querySelector('.projects .section-subtitle');
    if (subtitle) {
        const baseText = 'Una selección de landing pages que han generado resultados excepcionales';
        subtitle.textContent = `${baseText} (${visibleCount} proyecto${visibleCount !== 1 ? 's' : ''})`;
    }
}

// Enhanced project card interactions with sound effects simulation
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add progressive loading effect
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Enhanced click interaction
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.btn-view')) {
                // Visual feedback
                this.style.transform = 'scale(0.98)';
                this.style.filter = 'brightness(1.1)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.filter = '';
                }, 150);
                
                // Add ripple effect
                addRippleEffect(this, e);
            }
        });
        
        // Parallax effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const rotateX = deltaY * -10;
            const rotateY = deltaX * 10;
            const translateZ = 20;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(${translateZ}px)
                translateY(-15px)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initMagneticButtons();
        enhanceProjectCards();
        updateProjectCount();
    }, 500);
});

// Update count when filter changes
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
        setTimeout(updateProjectCount, 500);
    }
});

// Auto-detect system theme preference
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
        }
    });
}
