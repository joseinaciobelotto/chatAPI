import app from '../src/api';

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173/', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

export default app;