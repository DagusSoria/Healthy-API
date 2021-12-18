import { Request, Response, Router } from 'express';
import Exercise from '../models/Exercise';

class ExerciseRoutes {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getExercises(req: Request, res: Response) {
    const exercises = await Exercise.find();
    res.json(exercises);
  }

  async getExercise(req: Request, res: Response) {
    const { id } = req.params;
    const exercise = await Exercise.findById(id);
    res.json(exercise);
  }

  async createExercise(req: Request, res: Response) {
    const newExercise = new Exercise(req.body);
    await newExercise.save();
    res.json({data: newExercise});
  }

  async updateExercise(req: Request, res: Response) {
    const { id } = req.params;
    const updatedExercise = await Exercise.findByIdAndUpdate(id , req.body, {new: true});
    res.json({data: updatedExercise});
  }

  async deleteExercise(req: Request, res: Response) {
    const { id } = req.params;
    await Exercise.findByIdAndDelete(id);
    res.json({ data: `Exercise deleted` });
  }

  routes() {
    this.router.get('/', this.getExercises);
    this.router.get('/:id', this.getExercise);
    this.router.post('/', this.createExercise);
    this.router.put('/:id', this.updateExercise);
    this.router.delete('/:id', this.deleteExercise);
  }
}

const exerciseRoutes = new ExerciseRoutes();
export default exerciseRoutes.router;