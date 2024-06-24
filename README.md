# Photo Gallery App

Esta aplicación fue creada con expo.

## Descripción

La Photo Gallery App es una aplicación móvil construida con React Native que permite a los usuarios tomar fotos, verlas en una galería y compartirlas. Esta aplicación está diseñada para proporcionar una experiencia sencilla y fluida, con una pantalla de inicio, una galería de fotos en formato de mosaico y una pantalla de detalles que muestra la ubicación de la foto y permite compartirla.

## Características

1. Pantalla de Inicio (Splash Screen)
   1. Muestra una pantalla de bienvenida al abrir la aplicación.
   2. La pantalla de bienvenida se mantiene visible durante al menos 2 segundos para mejorar la experiencia del usuario.
2. Pantalla Principal (Galería)
   1. Muestra las fotos tomadas por el usuario como miniaturas listadas una al lado de la otra en formato de mosaico.
   2. Permite al usuario tocar una miniatura para acceder a la pantalla de detalles de la imagen.
3. Pantalla de Detalles de la Imagen
   1. Muestra la imagen seleccionada en tamaño completo.
   2. Muestra la latitud y longitud de la ubicación donde se tomó la foto.
   3. Incluye una opción para compartir la imagen.
4. Camara
   1. Permite a los usuarios tomar nuevas fotos.
   2. Las fotos tomadas se añaden automáticamente a la galería.
   
Estas fotos son guardadas en el storage de la aplicación.

1. Clonar repositorio:

```bash
   git clone https://github.com/davisLjr/Gallery-app.git
   cd Gallery-app
```
2. Instalar dependencias:

```bash
   npm install
```

3. Ejecutar aplicación: 

```bash
   npx expo start
```