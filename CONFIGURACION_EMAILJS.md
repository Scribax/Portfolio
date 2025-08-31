# Configuración EmailJS para Portfolio

## ¿Qué es EmailJS?

EmailJS es un servicio que permite enviar emails directamente desde JavaScript sin necesidad de un servidor backend. Es ideal para formularios de contacto en sitios web estáticos.

## Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Confirma tu email

### 2. Configurar servicio de email

1. Una vez dentro del dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, Yahoo, etc.)
4. Sigue las instrucciones para conectar tu cuenta de email
5. **Anota el SERVICE_ID** que se genera (ejemplo: `service_abc123`)

### 3. Crear plantilla de email

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Configura la plantilla con el siguiente contenido:

**Subject:** Nuevo mensaje desde tu portfolio - {{from_name}}

**Content:**
```
Has recibido un nuevo mensaje desde tu portfolio web:

Nombre: {{from_name}}
Email: {{from_email}}
Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu formulario de contacto.
```

4. **Anota el TEMPLATE_ID** que se genera (ejemplo: `template_xyz789`)

### 4. Obtener clave pública

1. Ve a "Account" → "General"
2. Busca tu **Public Key** (ejemplo: `Ab1Cd2Ef3Gh4Ij5`)

### 5. Configurar el código

Abre el archivo `script.js` y busca esta sección:

```javascript
// Configuración EmailJS - REEMPLAZAR CON TUS DATOS REALES
const EMAILJS_CONFIG = {
    publicKey: 'TU_CLAVE_PUBLICA_AQUI',    // ⬅️ Reemplazar
    serviceID: 'TU_SERVICE_ID_AQUI',       // ⬅️ Reemplazar  
    templateID: 'TU_TEMPLATE_ID_AQUI'      // ⬅️ Reemplazar
};
```

Reemplaza los valores con tus datos reales:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'Ab1Cd2Ef3Gh4Ij5',        // Tu clave pública real
    serviceID: 'service_abc123',          // Tu service ID real
    templateID: 'template_xyz789'         // Tu template ID real
};
```

### 6. Probar el formulario

1. Abre `index.html` en tu navegador
2. Ve a la sección de contacto
3. Llena el formulario y envía un mensaje de prueba
4. Verifica que recibas el email en tu bandeja de entrada

## Límites del plan gratuito

- **200 emails/mes** en el plan gratuito
- Si necesitas más, puedes upgradear a un plan de pago

## Resolución de problemas

### Error: "EmailJS not defined"
- Verifica que el script CDN esté cargado correctamente en el HTML
- Asegúrate de que tienes conexión a internet

### Error: "Invalid service ID"
- Verifica que el SERVICE_ID sea correcto
- Revisa que el servicio esté activo en tu dashboard de EmailJS

### Error: "Template not found"
- Verifica que el TEMPLATE_ID sea correcto
- Asegúrate de que la plantilla esté publicada

### Los emails no llegan
- Verifica tu carpeta de spam
- Asegúrate de que el servicio de email esté correctamente configurado
- Revisa los logs en el dashboard de EmailJS

## Seguridad

- La clave pública (Public Key) es segura para usar en el frontend
- **NUNCA** uses tu clave privada en código JavaScript
- EmailJS incluye protección anti-spam automática

## Funcionalidades implementadas

✅ **Validación en tiempo real**
- Verificación de formato de email
- Validación de longitud de campos
- Detección básica de spam

✅ **Interfaz mejorada**
- Estados de carga con spinner
- Animaciones de error (shake)
- Feedback visual de éxito/error
- Resaltado de campos con error

✅ **Experiencia de usuario**
- Deshabilitación del botón durante envío
- Mensajes informativos
- Reset automático del formulario tras envío exitoso

---

**¡Tu formulario de contacto está listo para usar!** 🚀

Solo necesitas reemplazar las credenciales en `script.js` con tus datos reales de EmailJS.
