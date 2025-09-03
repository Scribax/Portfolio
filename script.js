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
        'boston': {
            title: '🍔 Boston Tracker - Sistema Completo de Tracking',
            category: 'Full-Stack System',
            description: 'Sistema integral de seguimiento en tiempo real para deliveries de restaurantes. Solución completa con dashboard web, API backend robusta y aplicación móvil nativa para repartidores.',
            challenge: 'Boston American Burgers necesitaba automatizar completamente el seguimiento de sus deliveries, eliminando el control manual y optimizando rutas en tiempo real para mejorar la eficiencia operativa.',
            solution: 'Desarrollé un ecosistema completo de 3 aplicaciones integradas: Dashboard web React con mapas interactivos, API REST con Node.js y PostgreSQL, y app móvil React Native con tracking GPS automático.',
            results: [
                '9,000+ líneas de código',
                '3 aplicaciones integradas',
                '25+ endpoints API REST',
                'Tracking GPS en tiempo real',
                '99.9% uptime en producción',
                'Sistema en uso comercial'
            ],
            technologies: ['React 18', 'Node.js', 'PostgreSQL', 'React Native', 'Socket.io', 'Express.js', 'Leaflet Maps', 'JWT Auth', 'Sequelize ORM', 'Nginx', 'Linux VPS'],
            architecture: {
                frontend: 'React 18 + Bootstrap 5 + Leaflet Maps + WebSocket',
                backend: 'Node.js + Express + PostgreSQL + Socket.io + JWT',
                mobile: 'React Native + Expo + GPS Tracking',
                deployment: 'Linux VPS + Nginx + PM2 + SSL'
            },
            features: [
                '✅ Dashboard en tiempo real con WebSocket',
                '🗺️ Mapas interactivos con tracking GPS en vivo',
                '📁 Gestión completa de usuarios y deliveries',
                '📊 Historial de viajes con métricas detalladas',
                '📱 App móvil nativa con GPS automático',
                '🔐 Autenticación JWT con roles y permisos',
                '📈 Analytics automáticos (distancia, tiempo, velocidad)',
                '📝 Sistema de logs profesional configurable'
            ],
            metrics: {
                codeLines: '9,000+',
                endpoints: '25+',
                models: '8 modelos DB',
                components: '25+ componentes React',
                screens: '15+ pantallas móviles'
            },
            liveUrl: 'http://185.144.157.163/',
            demoCredentials: {
                admin: 'admin@bostonburgers.com / password123',
                delivery: 'DEL001 / delivery123'
            },
            github: 'https://github.com/Scribax/BostonTracker',
            apkUrl: 'http://185.144.157.163/apk/',
            images: ['assets/project-boston-dashboard.jpg', 'assets/project-boston-mobile.jpg', 'assets/project-boston-map.jpg']
        },
        'techstore': {
            title: '🚀 TechStore - E-commerce Demo Moderno',
            category: 'E-commerce Web App',
            description: 'Demo completo de e-commerce tecnológico con carrito funcional, filtros dinámicos, animaciones avanzadas y diseño responsive. Proyecto que demuestra dominio completo del frontend moderno.',
            challenge: 'Crear una experiencia de e-commerce completa que demuestre habilidades técnicas avanzadas: carrito persistente, filtros en tiempo real, animaciones fluidas y performance optimizada.',
            solution: 'Desarrollé una web app completa usando tecnologías web puras (Vanilla JS) con arquitectura modular, sistema de estado local, animaciones GPU-aceleradas y diseño mobile-first.',
            results: [
                '95+ Lighthouse Score',
                '5,000+ líneas de código',
                '100% responsive design',
                'Carrito persistente funcional',
                'Animaciones 60fps',
                'PWA ready con Service Worker'
            ],
            technologies: ['HTML5 Semántico', 'CSS3 Avanzado (Grid/Flexbox)', 'JavaScript ES6+', 'Local Storage API', 'Intersection Observer', 'Service Worker'],
            features: [
                '🛒 Carrito de compras con localStorage persistente',
                '🔍 Filtros dinámicos por categorías con animaciones',
                '📱 Diseño mobile-first completamente responsive', 
                '⚡ Performance optimizada (sub-2s load time)',
                '🎨 Animaciones 3D y efectos glassmorphism',
                '👁️ Modal de vista rápida para productos',
                '⏱️ Countdown timer en tiempo real',
                '📊 Estadísticas animadas con scroll',
                '📝 Formularios validados con estados de carga',
                '🔔 Sistema de notificaciones toast',
                '♿ 100% accesible (WCAG 2.1)'
            ],
            liveUrl: 'https://scribax.github.io/TechStore---E-commerce-Landing---DEMO/',
            github: 'https://github.com/Scribax/TechStore---E-commerce-Landing---DEMO',
            images: ['assets/project-techstore-demo.png']
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
        
        // Check if this is Boston Tracker to show interactive roadmap
        if (project.title.includes('Boston Tracker')) {
            showBostonTrackerModal(project);
        } else {
            showStandardModal(project);
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function showBostonTrackerModal(project) {
        modalBody.innerHTML = `
            <div class="project-modal-content boston-tracker-modal">
                <div class="project-modal-header">
                    <h2 class="project-modal-title">${project.title}</h2>
                    <div class="project-status-badges">
                        <span class="status-badge production">🚀 En Producción</span>
                        <span class="status-badge commercial">💼 Uso Comercial</span>
                        <span class="project-modal-category">${project.category}</span>
                    </div>
                </div>
                
                <div class="project-tabs">
                    <button class="tab-btn active" data-tab="overview">📊 Overview</button>
                    <button class="tab-btn" data-tab="roadmap">🗺️ Roadmap</button>
                    <button class="tab-btn" data-tab="architecture">🏗️ Arquitectura</button>
                    <button class="tab-btn" data-tab="demo">🚀 Demo</button>
                </div>
                
                <div class="tab-content active" id="overview">
                    <div class="project-modal-description">
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="project-metrics-grid">
                        <div class="metric-card">
                            <div class="metric-icon">💻</div>
                            <div class="metric-value">${project.metrics.codeLines}</div>
                            <div class="metric-label">Líneas de Código</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">🔌</div>
                            <div class="metric-value">${project.metrics.endpoints}</div>
                            <div class="metric-label">API Endpoints</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">📱</div>
                            <div class="metric-value">${project.metrics.screens}</div>
                            <div class="metric-label">Pantallas Móviles</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">⚡</div>
                            <div class="metric-value">99.9%</div>
                            <div class="metric-label">Uptime</div>
                        </div>
                    </div>
                    
                    <div class="features-showcase">
                        <h3>🎯 Características Principales</h3>
                        <div class="features-grid">
                            ${project.features.map(feature => `<div class="feature-item">${feature}</div>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="roadmap">
                    <div class="roadmap-container">
                        <h3>🗺️ Roadmap de Desarrollo Interactivo</h3>
                        <div class="roadmap-timeline">
                            <div class="roadmap-phase completed" data-phase="1">
                                <div class="phase-marker">✅</div>
                                <div class="phase-content">
                                    <h4>Fase 1: Fundación (Completada)</h4>
                                    <ul>
                                        <li>✅ Configuración inicial del proyecto</li>
                                        <li>✅ Base de datos PostgreSQL</li>
                                        <li>✅ API REST con Node.js</li>
                                        <li>✅ Autenticación JWT</li>
                                    </ul>
                                    <div class="phase-tech">Node.js • PostgreSQL • JWT</div>
                                </div>
                            </div>
                            
                            <div class="roadmap-phase completed" data-phase="2">
                                <div class="phase-marker">✅</div>
                                <div class="phase-content">
                                    <h4>Fase 2: Dashboard Web (Completada)</h4>
                                    <ul>
                                        <li>✅ Interfaz React 18</li>
                                        <li>✅ Mapas interactivos Leaflet</li>
                                        <li>✅ WebSocket en tiempo real</li>
                                        <li>✅ Gestión de usuarios</li>
                                    </ul>
                                    <div class="phase-tech">React 18 • Leaflet • Socket.io</div>
                                </div>
                            </div>
                            
                            <div class="roadmap-phase completed" data-phase="3">
                                <div class="phase-marker">✅</div>
                                <div class="phase-content">
                                    <h4>Fase 3: App Móvil (Completada)</h4>
                                    <ul>
                                        <li>✅ React Native con Expo</li>
                                        <li>✅ Tracking GPS automático</li>
                                        <li>✅ Notificaciones push</li>
                                        <li>✅ Sincronización offline</li>
                                    </ul>
                                    <div class="phase-tech">React Native • GPS • Push Notifications</div>
                                </div>
                            </div>
                            
                            <div class="roadmap-phase completed" data-phase="4">
                                <div class="phase-marker">✅</div>
                                <div class="phase-content">
                                    <h4>Fase 4: Producción (Completada)</h4>
                                    <ul>
                                        <li>✅ Deploy en Linux VPS</li>
                                        <li>✅ Configuración Nginx</li>
                                        <li>✅ SSL y optimizaciones</li>
                                        <li>✅ Monitoreo y logs</li>
                                    </ul>
                                    <div class="phase-tech">Linux VPS • Nginx • SSL • PM2</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="architecture">
                    <div class="architecture-diagram">
                        <h3>🏗️ Arquitectura del Sistema</h3>
                        <div class="arch-layers">
                            <div class="arch-layer frontend">
                                <h4>🖥️ Frontend Layer</h4>
                                <div class="arch-components">
                                    <div class="arch-component">React 18 Dashboard</div>
                                    <div class="arch-component">Bootstrap 5 UI</div>
                                    <div class="arch-component">Leaflet Maps</div>
                                    <div class="arch-component">WebSocket Client</div>
                                </div>
                            </div>
                            
                            <div class="arch-layer api">
                                <h4>🔌 API Layer</h4>
                                <div class="arch-components">
                                    <div class="arch-component">Express.js Server</div>
                                    <div class="arch-component">JWT Authentication</div>
                                    <div class="arch-component">Socket.io Server</div>
                                    <div class="arch-component">25+ REST Endpoints</div>
                                </div>
                            </div>
                            
                            <div class="arch-layer database">
                                <h4>🗄️ Data Layer</h4>
                                <div class="arch-components">
                                    <div class="arch-component">PostgreSQL Database</div>
                                    <div class="arch-component">Sequelize ORM</div>
                                    <div class="arch-component">8 Data Models</div>
                                    <div class="arch-component">Backup System</div>
                                </div>
                            </div>
                            
                            <div class="arch-layer mobile">
                                <h4>📱 Mobile Layer</h4>
                                <div class="arch-components">
                                    <div class="arch-component">React Native App</div>
                                    <div class="arch-component">GPS Tracking</div>
                                    <div class="arch-component">Push Notifications</div>
                                    <div class="arch-component">Offline Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="tab-content" id="demo">
                    <div class="demo-section">
                        <h3>🚀 Demo Interactivo</h3>
                        <div class="demo-cards">
                            <div class="demo-card">
                                <h4>💻 Dashboard Boston Tracker</h4>
                                <p>Explora la demostración completa del sistema de gestión de deliveries con mapa interactivo de Boston, tracking en tiempo real y todas las funcionalidades administrativas.</p>
                                <div class="demo-credentials">
                                    <strong>🌐 Demo Público</strong><br>
                                    ✓ Acceso directo sin registro<br>
                                    ✓ Datos de demostración incluidos<br>
                                    ✓ Todas las funcionalidades activas
                                </div>
                                <div class="demo-features">
                                    <span>🗺️ Mapa Interactivo</span>
                                    <span>📍 Tracking GPS</span>
                                    <span>👥 Gestión Usuarios</span>
                                    <span>📱 Admin APK</span>
                                    <span>📊 Historial Viajes</span>
                                    <span>🎛️ Dashboard Completo</span>
                                </div>
                                <a href="https://scribax.github.io/BostonTracker-Demo/" target="_blank" class="demo-btn primary">🚀 Explorar Demo</a>
                                <a href="https://github.com/Scribax/BostonTracker-Demo" target="_blank" class="demo-btn github">📂 Ver Código</a>
                            </div>
                        </div>
                        
                        <div class="demo-highlights">
                            <h4>🌟 Características del Demo</h4>
                            <div class="highlights-grid">
                                <div class="highlight-item">
                                    <div class="highlight-icon">🗺️</div>
                                    <h5>Mapa de Boston</h5>
                                    <p>Ubicaciones reales de restaurantes y rutas de entrega visualizadas</p>
                                </div>
                                <div class="highlight-item">
                                    <div class="highlight-icon">⚡</div>
                                    <h5>Tiempo Real</h5>
                                    <p>Simulación de tracking en vivo con actualizaciones automáticas</p>
                                </div>
                                <div class="highlight-item">
                                    <div class="highlight-icon">📊</div>
                                    <h5>Dashboard Completo</h5>
                                    <p>Interfaz administrativa con métricas y gestión avanzada</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize interactive elements
        initBostonTrackerInteractions();
    }
    
    function showStandardModal(project) {
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

// Boston Tracker Modal Interactions
function initBostonTrackerInteractions() {
    console.log('Initializing Boston Tracker interactive elements...');
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Initialize specific interactions for roadmap tab
            if (targetTab === 'roadmap') {
                initRoadmapInteractions();
            }
            
            // Initialize architecture interactions
            if (targetTab === 'architecture') {
                initArchitectureInteractions();
            }
        });
    });
    
    // Initialize metric cards animations
    initMetricCardsAnimations();
    
    // Initialize features showcase
    initFeaturesShowcase();
    
    console.log('Boston Tracker interactions initialized successfully');
}

// Roadmap Interactive Functionality
function initRoadmapInteractions() {
    const roadmapPhases = document.querySelectorAll('.roadmap-phase');
    
    roadmapPhases.forEach((phase, index) => {
        // Add entrance animation delay
        phase.style.animationDelay = `${index * 0.2}s`;
        phase.classList.add('animate-in');
        
        // Click interaction
        phase.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'phase-ripple';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
            
            // Show phase details with animation
            const content = this.querySelector('.phase-content');
            if (content) {
                content.style.transform = this.classList.contains('expanded') 
                    ? 'scale(1.02)' : 'scale(1)';
            }
        });
        
        // Hover effects
        phase.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';
            
            // Highlight connected phases
            const phaseNumber = parseInt(this.getAttribute('data-phase'));
            roadmapPhases.forEach(p => {
                const pNumber = parseInt(p.getAttribute('data-phase'));
                if (Math.abs(pNumber - phaseNumber) === 1) {
                    p.style.opacity = '0.7';
                    p.style.transform = 'scale(0.98)';
                }
            });
        });
        
        phase.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            // Reset connected phases
            roadmapPhases.forEach(p => {
                p.style.opacity = '';
                p.style.transform = '';
            });
        });
    });
    
    // Progress line animation
    animateProgressLine();
}

// Architecture Interactions
function initArchitectureInteractions() {
    const archLayers = document.querySelectorAll('.arch-layer');
    const archComponents = document.querySelectorAll('.arch-component');
    
    archLayers.forEach((layer, index) => {
        // Staggered entrance animation
        layer.style.animationDelay = `${index * 0.3}s`;
        layer.classList.add('arch-animate-in');
        
        // Layer interactions
        layer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.zIndex = '10';
            
            // Dim other layers
            archLayers.forEach(l => {
                if (l !== this) {
                    l.style.opacity = '0.3';
                    l.style.transform = 'scale(0.95)';
                }
            });
        });
        
        layer.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
            
            // Reset other layers
            archLayers.forEach(l => {
                l.style.opacity = '';
                l.style.transform = '';
            });
        });
    });
    
    // Component interactions
    archComponents.forEach((component, index) => {
        component.addEventListener('click', function() {
            // Add tech badge animation
            this.classList.add('component-selected');
            
            // Create floating tech info
            showTechInfo(this, this.textContent);
            
            setTimeout(() => {
                this.classList.remove('component-selected');
            }, 1000);
        });
    });
}

// Metric Cards Animations
function initMetricCardsAnimations() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach((card, index) => {
        // Staggered entrance
        setTimeout(() => {
            card.classList.add('metric-animate-in');
        }, index * 150);
        
        // Counter animation for values
        const valueElement = card.querySelector('.metric-value');
        if (valueElement) {
            animateMetricValue(valueElement);
        }
        
        // Hover interactions
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
            
            // Icon bounce
            const icon = this.querySelector('.metric-icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotateZ(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            const icon = this.querySelector('.metric-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// Features Showcase Animation
function initFeaturesShowcase() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        // Staggered entrance
        setTimeout(() => {
            item.classList.add('feature-animate-in');
        }, index * 100);
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))';
            
            // Add glow effect
            this.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
            this.style.boxShadow = '';
        });
    });
}

// Utility Functions for Boston Tracker Modal
function animateProgressLine() {
    const timeline = document.querySelector('.roadmap-timeline');
    if (!timeline) return;
    
    // Create progress line
    const progressLine = document.createElement('div');
    progressLine.className = 'roadmap-progress-line';
    timeline.appendChild(progressLine);
    
    // Animate progress line
    setTimeout(() => {
        progressLine.style.height = '100%';
    }, 500);
}

function animateMetricValue(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/[^0-9]/g, '')) || 0;
    const suffix = text.replace(/[0-9]/g, '').replace(/\+/g, '');
    const hasPlus = text.includes('+');
    
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        current = Math.floor(number * easeOutQuart);
        element.textContent = `${current}${suffix}${hasPlus ? '+' : ''}`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    // Start animation after a delay
    setTimeout(() => {
        requestAnimationFrame(update);
    }, 300);
}

function showTechInfo(element, techName) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = `${techName} - Tecnología utilizada`;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 40}px`;
    tooltip.style.transform = 'translateX(-50%)';
    
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        tooltip.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        }, 300);
    }, 2000);
}
