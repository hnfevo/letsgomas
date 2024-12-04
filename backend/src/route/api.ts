import express from 'express';
import { authMiddleware, authorizeRole } from '../middleware/auth-middleware';
import { UserController } from '../controller/user-controller';
import { DestinationController } from '../controller/destination-controller';
import { ArticleController } from '../controller/article-controller';

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// User APi
apiRouter.get('/api/users/current', UserController.get);
apiRouter.patch('/api/users/current', UserController.update);
apiRouter.delete('/api/users/current', UserController.logout);

// Destination API
apiRouter.post('/api/destinations', authorizeRole('admin'), DestinationController.create);
apiRouter.put('/api/destinations/:destinationId(\\d+)', authorizeRole('admin'), DestinationController.update);
apiRouter.delete('/api/destinations/:destinationId(\\d+)', authorizeRole('admin'), DestinationController.remove);

// Articles API
apiRouter.post('/api/articles', authorizeRole('admin'), ArticleController.create);
apiRouter.put('/api/articles/:articleId(\\d+)', authorizeRole('admin'), ArticleController.update);
apiRouter.delete('/api/articles/:articleId(\\d+)', authorizeRole('admin'), ArticleController.remove);
