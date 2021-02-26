import express from 'express';
import swagger from './swagger';

const app = express();

app.use(express.json());
swagger(app);

export default app;
