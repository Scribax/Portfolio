#!/usr/bin/env python3
"""
Generador de imágenes placeholder para el portfolio
Ejecuta este script para crear imágenes placeholder profesionales
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(width, height, text, filename, color_scheme):
    """Crear una imagen placeholder con gradiente y texto"""
    
    # Crear imagen
    img = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(img)
    
    # Definir colores según el esquema
    color_schemes = {
        'ecommerce': [(102, 126, 234), (118, 75, 162)],  # Purple gradient
        'saas': [(240, 147, 251), (245, 87, 108)],        # Pink gradient
        'services': [(79, 172, 254), (0, 242, 254)],     # Blue gradient
        'startup': [(67, 233, 123), (56, 249, 215)]      # Green gradient
    }
    
    colors = color_schemes.get(color_scheme, [(59, 130, 246), (29, 78, 216)])
    
    # Crear gradiente
    for y in range(height):
        # Calcular ratio para el gradiente
        ratio = y / height
        
        # Interpolar colores
        r = int(colors[0][0] * (1 - ratio) + colors[1][0] * ratio)
        g = int(colors[0][1] * (1 - ratio) + colors[1][1] * ratio)
        b = int(colors[0][2] * (1 - ratio) + colors[1][2] * ratio)
        
        # Dibujar línea horizontal
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Agregar overlay sutil
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 30))
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(img)
    
    # Agregar texto
    try:
        # Intentar usar una fuente del sistema
        font_large = ImageFont.truetype("arial.ttf", 40)
        font_small = ImageFont.truetype("arial.ttf", 20)
    except:
        # Usar fuente por defecto si no encuentra arial
        font_large = ImageFont.load_default()
        font_small = ImageFont.load_default()
    
    # Título principal
    title_bbox = draw.textbbox((0, 0), text, font=font_large)
    title_width = title_bbox[2] - title_bbox[0]
    title_height = title_bbox[3] - title_bbox[1]
    title_x = (width - title_width) // 2
    title_y = (height - title_height) // 2 - 20
    
    # Sombra del texto
    draw.text((title_x + 2, title_y + 2), text, fill=(0, 0, 0, 100), font=font_large)
    # Texto principal
    draw.text((title_x, title_y), text, fill='white', font=font_large)
    
    # Subtítulo
    subtitle = "Landing Page Preview"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=font_small)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = title_y + title_height + 10
    
    draw.text((subtitle_x + 1, subtitle_y + 1), subtitle, fill=(0, 0, 0, 80), font=font_small)
    draw.text((subtitle_x, subtitle_y), subtitle, fill='white', font=font_small)
    
    # Agregar elementos decorativos
    # Círculos decorativos
    for i in range(3):
        circle_x = 50 + (i * 80)
        circle_y = height - 60
        draw.ellipse([circle_x, circle_y, circle_x + 20, circle_y + 20], 
                    fill=(255, 255, 255, 60))
    
    # Líneas decorativas
    for i in range(5):
        line_y = 40 + (i * 15)
        line_width = 200 - (i * 30)
        draw.rectangle([50, line_y, 50 + line_width, line_y + 3], 
                      fill=(255, 255, 255, 40))
    
    # Guardar imagen
    img.save(filename, 'JPEG', quality=85, optimize=True)
    print(f"✓ Creada: {filename}")

def main():
    """Función principal para generar todas las imágenes"""
    
    # Crear directorio assets si no existe
    assets_dir = "assets"
    if not os.path.exists(assets_dir):
        os.makedirs(assets_dir)
    
    # Configuración de imágenes
    projects = [
        ("TechStore", "project-1.jpg", "ecommerce"),
        ("CloudSync", "project-2.jpg", "saas"),
        ("ConsultPro", "project-3.jpg", "services"),
        ("InnovateLab", "project-4.jpg", "startup")
    ]
    
    print("Generando imágenes placeholder para el portfolio...")
    print("=" * 50)
    
    # Generar cada imagen
    for title, filename, scheme in projects:
        filepath = os.path.join(assets_dir, filename)
        create_placeholder_image(800, 500, title, filepath, scheme)
    
    print("=" * 50)
    print("✅ ¡Todas las imágenes han sido generadas exitosamente!")
    print(f"📁 Ubicación: {os.path.abspath(assets_dir)}")
    print("💡 Recuerda reemplazar estas imágenes con screenshots reales de tus proyectos")

if __name__ == "__main__":
    main()
