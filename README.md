# Portfolio - Landing Pages Designer

Un portfolio minimalista y moderno para mostrar proyectos de landing pages con enfoque en conversión.

## 🎨 Características

- **Diseño Minimalista**: Interfaz limpia y moderna
- **Totalmente Responsive**: Se ve perfecto en todos los dispositivos
- **Interactivo**: Filtros de proyectos, modales informativos, animaciones sutiles
- **Optimizado**: Carga rápida y SEO friendly
- **Formulario de Contacto**: Validación y envío funcional

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html          # Página principal
├── styles.css          # Estilos minimalistas
├── script.js           # JavaScript para interactividad
├── assets/             # Imágenes y recursos
└── README.md           # Documentación
```

## 🚀 Instalación y Uso

1. **Clonar o descargar** el proyecto
2. **Personalizar contenido**:
   - Edita `index.html` con tu información personal
   - Reemplaza las imágenes en `/assets/` con screenshots de tus proyectos
   - Actualiza los datos de proyectos en `script.js`
3. **Publicar**: Sube los archivos a tu hosting preferido

## 📝 Personalización

### Información Personal
Edita estas secciones en `index.html`:
- **Hero Section**: Tu nombre y propuesta de valor
- **About Section**: Tu biografía y habilidades
- **Contact Section**: Tus datos de contacto

### Proyectos
En `script.js`, actualiza el objeto `projectsData` con tus proyectos reales:

```javascript
const projectsData = {
    '1': {
        title: 'Nombre del Proyecto',
        category: 'Categoría',
        description: 'Descripción breve...',
        challenge: 'El desafío que resolviste...',
        solution: 'Cómo lo resolviste...',
        results: ['Resultado 1', 'Resultado 2', ...],
        technologies: ['Tech 1', 'Tech 2', ...],
        liveUrl: 'https://proyecto-live.com'
    }
}
```

### Colores y Estilos
En `styles.css`, modifica las variables CSS:

```css
:root {
    --accent-color: #3b82f6;  /* Color principal */
    --text-primary: #1a1a1a;  /* Color de texto */
    /* ... más variables ... */
}
```

## 🖼️ Imágenes Requeridas

Coloca estas imágenes en la carpeta `/assets/`:

- `project-1.jpg` - Preview del proyecto 1 (recomendado: 800x500px)
- `project-2.jpg` - Preview del proyecto 2
- `project-3.jpg` - Preview del proyecto 3
- `project-4.jpg` - Preview del proyecto 4

**Formato recomendado**: JPG optimizado, máximo 200KB por imagen.

## 📱 Funcionalidades Incluidas

### Navegación
- Menú responsive con hamburger para móvil
- Scroll suave entre secciones
- Indicador de sección activa

### Galería de Proyectos
- Filtros por categoría (E-commerce, SaaS, Servicios, Startups)
- Efectos hover elegantes
- Modal con detalles completos del proyecto

### Formulario de Contacto
- Validación en tiempo real
- Estados de carga
- Notificaciones de éxito/error

### Optimizaciones
- Lazy loading de imágenes
- Animaciones al hacer scroll
- Performance optimizado

## 🌐 Hosting Recomendado

- **GitHub Pages**: Gratis, ideal para portfolios
- **Netlify**: Fácil deployment, dominio custom gratuito
- **Vercel**: Excelente performance, integración con Git
- **Hosting tradicional**: Cualquier proveedor con soporte HTML

## 📧 Configuración del Formulario de Contacto

El formulario actualmente usa una simulación. Para hacerlo funcional:

1. **EmailJS**: Servicio gratuito para envío de emails
2. **Netlify Forms**: Si usas Netlify como hosting
3. **Backend propio**: Con Node.js, PHP, etc.
4. **Servicios como Formspree**: Para formularios estáticos

### Ejemplo con EmailJS:

```javascript
// En script.js, reemplaza la función de envío:
emailjs.send('service_id', 'template_id', data)
    .then(() => {
        showNotification('¡Mensaje enviado!', 'success');
    })
    .catch(() => {
        showNotification('Error al enviar', 'error');
    });
```

## 🎯 Consejos para Maximizar Conversiones

1. **Screenshots reales**: Usa capturas de tus proyectos reales
2. **Métricas verificables**: Solo incluye resultados que puedas respaldar
3. **Testimonios**: Agrega reseñas de clientes reales
4. **Call-to-actions claros**: Guía al visitante hacia el contacto
5. **Carga rápida**: Optimiza todas las imágenes

## 📞 Soporte

Si necesitas ayuda con la personalización o tienes preguntas, no dudes en contactarme.

---

**¡Tu portfolio está listo para generar clientes!** 🚀
