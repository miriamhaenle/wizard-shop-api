import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import shoppingCartRoutes from './routes/shoppingCartRoutes.routes.js';
import productRoutes from './routes/products.routes.js';
import customerRoutes from './routes/customerRoutes.routes.js';

const server = express();
server.use(express.json());

const connectionString = `mongodb://localhost:27017/wizard-shop`;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.get('/', (req, res) =>
  res.json({ status: 'Server is up and running.' })
);

server.use(shoppingCartRoutes);
server.use(customerRoutes);
server.use(productRoutes);

fs.readFile('./swagger.json', (error, data) => {
  if (error) {
    console.error(error);
  }
  const swaggerDocument = JSON.parse(data);

  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});

const port = 4000;
server.listen(port, () => console.log(`Server listens on port ${port}.`));
