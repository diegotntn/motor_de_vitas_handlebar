require('dotenv').config();
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

// Función para obtener una imagen aleatoria
const getRandomImage = () => {
  const images = [
    { src: "/images/drumspleasefabb.jpg", alt: "Descripción de la primera imagen" },
    { src: "/images/drumspleasefabbb.jpg", alt: "Descripción de la segunda imagen" }
  ];
  return images[Math.floor(Math.random() * images.length)];
};

// Configuración de Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: 'views/layouts/'
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});

// Ruta dinámica para mostrar una imagen aleatoria
app.get('/imagen-aleatoria', (req, res) => {
  const image = getRandomImage();
  res.render('image', { image: image });
});

// Ruta de ejemplo usando la imagen aleatoria
app.get('/', (req, res) => {
  const image = getRandomImage();
  res.render('home', { image, title: "Página Principal", header: "Bienvenido a la Página Principal" });
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Manejo de errores 500
app.use((err, req, res, next) => {
  res.status(500).render('500');
});

  