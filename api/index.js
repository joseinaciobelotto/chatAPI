import app from '../src/api';

const cors = require('cors');

const corsOptions = {
  origin: true, // Permite todas as origens
  optionsSuccessStatus: 200 // Para compatibilidade com alguns navegadores
};

app.use(cors(corsOptions));

export default app;