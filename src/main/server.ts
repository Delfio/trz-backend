import 'express-async-errors';
import app from './configs/app';
import database from '../usecases/typeorm';
import middlewares from './configs/middleware';

const port = process.env.PORT || 3333;

database.then(async () => {
  const routes = (await import('./routes')).default;

  app.use('/api/v1', routes);

  app.use(middlewares);
  app.listen(port, () => console.log('server alredy!!!!'));
}).catch((err) => console.log('error ocurred!!, ', err));
