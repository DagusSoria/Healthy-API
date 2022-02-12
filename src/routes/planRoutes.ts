import { Request, Response, Router } from 'express';
import Plan from '../models/Plan';
import Exercise from '../models/Exercise';

class PlanRoutes {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getPlans(req: Request, res: Response) {
    const plans = await Plan.find();
    console.log(plans);

    //Esto se puede hacer con un populate, pero hasta que no sepa hacerlo bien no queda otra.
    for (let i = 0; i != plans.length; i++){
      let plan = plans[i];
      
      for (let j = 0; j != plan.days.length; j++){
        let planDay = plan.days[j];
        for (let k = 0; k != planDay.exercises.length; k++){
          let exercise = planDay.exercises[k];
          console.log("ejercicio", exercise);
          let exerciseFromDb = await Exercise.findById(exercise.exercise);
          console.log("ejercicio de la base de datos", exerciseFromDb);
          exercise.exercise = exerciseFromDb;
        }
      }
    }

    res.json(plans);
  }

  async getPlan(req: Request, res: Response) {
    const { id } = req.params;
    const plan = await Plan.findById(id);

    console.log(plan);
    for (let j = 0; j != plan.days.length; j++){
      let planDay = plan.days[j];
      for (let k = 0; k != planDay.exercises.length; k++){
        let exercise = planDay.exercises[k];
        console.log("ejercicio", exercise);
        let exerciseFromDb = await Exercise.findById(exercise.exercise);
        console.log("ejercicio de la base de datos", exerciseFromDb);
        exercise.exercise = exerciseFromDb;
      }
    }
    
    res.json(plan);
  }

  async createPlan(req: Request, res: Response) {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.json({data: newPlan});
  }

  async updatePlan(req: Request, res: Response) {
    const { id } = req.params;
    const updatedPlan = await Plan.findByIdAndUpdate(id , req.body, {new: true});
    res.json({data: updatedPlan});
  }

  async deletePlan(req: Request, res: Response) {
    const { id } = req.params;
    await Plan.findByIdAndDelete(id);
    res.json({ data: `Plan deleted` });
  }

  routes() {
    this.router.get('/', this.getPlans);
    this.router.get('/:id', this.getPlan);
    this.router.post('/', this.createPlan);
    this.router.put('/:id', this.updatePlan);
    this.router.delete('/:id', this.deletePlan);
  }
}

const planRoutes = new PlanRoutes();
export default planRoutes.router;