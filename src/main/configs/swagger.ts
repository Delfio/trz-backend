import { serve, setup } from 'swagger-ui-express';
import { Express } from 'express';
import swaggerDoc from '../../doc/api/api.js';

export default (app: Express): void => {
  app.use('/api-docs', serve, setup(swaggerDoc));
};
