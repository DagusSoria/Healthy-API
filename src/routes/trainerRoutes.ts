import { Request, Response, Router } from 'express';
import Trainer from '../models/Trainer';

class TrainerRoutes {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getTrainers(req: Request, res: Response) {
    const trainers = await Trainer.find();
    res.json(trainers);
  }

  async getTrainer(req: Request, res: Response) {
    const { username } = req.params;
    const trainer = await Trainer.findOne({ username });
    res.json(trainer);
  }

  async createTrainer(req: Request, res: Response) {
    const newTrainer = new Trainer(req.body);
    await newTrainer.save();
    res.json({data: newTrainer});
  }

  async updateTrainer(req: Request, res: Response) {
    const { username } = req.params;
    const updatedTrainer = await Trainer.findOneAndUpdate({ username }, req.body, {new: true});
    res.json({data: updatedTrainer});
  }

  async deleteTrainer(req: Request, res: Response) {
    const { username } = req.params;
    await Trainer.findOneAndDelete({ username });
    res.json({ data: `${username} Trainer deleted` });
  }

  routes() {
    this.router.get('/', this.getTrainers);
    this.router.get('/:username', this.getTrainer);
    this.router.post('/', this.createTrainer);
    this.router.put('/:username', this.updateTrainer);
    this.router.delete('/:username', this.deleteTrainer);
  }
}

const trainerRoutes = new TrainerRoutes();
export default trainerRoutes.router;