const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const multer = require('multer');
const path = require('path');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Configurar multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Ruta para subir imágenes
server.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No se pudo subir la imagen' });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});

