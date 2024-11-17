import app from '../src/api';

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:8081/', 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

export default app;