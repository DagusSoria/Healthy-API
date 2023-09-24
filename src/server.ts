import express, { json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors'
import mongoose from 'mongoose';

import indexRoutes from './routes/indexRoutes';
import UserRoutes from './routes/userRoutes';
import TrainerRoutes from './routes/trainerRoutes';
import ExerciseRoutes from './routes/exerciseRoutes';
import planRoutes from './routes/planRoutes';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.start();
  }

  config() {

    //database
    const MONGO_URI = 'mongodb://localhost/healthy';
    mongoose.set('useFindAndModify', true);
    mongoose.connect(MONGO_URI || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }).then(db => console.log("db is connected"));
    
    //settings
    this.app.set('port', process.env.PORT || 3000);
    //middlewares
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());
  }

  routes() {
    this.app.use(indexRoutes);
    this.app.use('/api/trainers', TrainerRoutes); // Entrenadores
    this.app.use('/api/exercises', ExerciseRoutes); // Ejercicios
    this.app.use('/api/plans', planRoutes) // Planes
    this.app.use('/api/users', UserRoutes) // Usuarios
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log("server on port " + this.app.get('port'));
    })
  }
}

const server = new Server();