import { Router } from 'express';
import SurvivorControllerBuilder from '../builders/SurvivorControllerBuilder';
import SurvivorInfectedControllerBuilder from '../builders/SurvivorInfectedControllerBuilder';

const survivorRoutes = Router();

const survivorControllerBuilder = SurvivorControllerBuilder();
const survivorInfectedControllerBuilder = SurvivorInfectedControllerBuilder();

survivorRoutes.get('/', async (req, res) => {
  const allSurvivors = await survivorControllerBuilder.index();
  res.json(allSurvivors);
});

survivorRoutes.post('/', async (req, res) => {
  const survivor = await survivorControllerBuilder.store(req.body);
  res.json(survivor);
});

survivorRoutes.get('/:survivor_id', async (req, res) => {
  const survivor = await survivorControllerBuilder.show(req.params.survivor_id);
  res.json(survivor);
});

survivorRoutes.post('/:survivor_id', async (req, res) => {
  const survivor = await survivorControllerBuilder.update({
    ...req.body,
    survivor_id: req.params.survivor_id,
  });
  res.json(survivor);
});

survivorRoutes.get('/infected', async (req, res) => {
  const allSurvivorsInfected = await survivorInfectedControllerBuilder.index();
  res.json(allSurvivorsInfected);
});

survivorRoutes.get('/infected/:survivor_id', async (req, res) => {
  const survivorInfected = await survivorInfectedControllerBuilder.show(req.params.survivor_id);
  res.json(survivorInfected);
});

survivorRoutes.post('/infected/:infected_survivor_id/vote/:reporter_survivor_id', async (req, res) => {
  await survivorInfectedControllerBuilder.store({
    survivor_infected: req.params.infected_survivor_id,
    survivor_reported: req.params.reporter_survivor_id,
  });

  res.status(204);
  res.json({});
});

export default survivorRoutes;
