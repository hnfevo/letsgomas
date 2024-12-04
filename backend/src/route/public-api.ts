import express from 'express';
import { UserController } from '../controller/user-controller';
import { DestinationController } from '../controller/destination-controller';
import { ArticleController } from '../controller/article-controller';

export const publicRouter = express.Router();
publicRouter.post('/api/users', UserController.register);
publicRouter.post('/api/users/login', UserController.login);

// Destination API (Public Read)
publicRouter.get('/api/destinations/:destinationId(\\d+)', DestinationController.get);
publicRouter.get('/api/destinations', DestinationController.getAll);
publicRouter.get('/api/destinations', DestinationController.search);

// Articles API (Public Read)
publicRouter.get('/api/articles/:articleId(\\d+)', ArticleController.get);
publicRouter.get('/api/articles', ArticleController.getAll);
publicRouter.get('/api/articles', ArticleController.search);
