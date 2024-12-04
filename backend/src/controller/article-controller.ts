import { UserRequest } from '../type/user-request';
import { Response, NextFunction } from 'express';
import { CreateArticleRequest, SearchArticleRequest, UpdateArticleRequest } from '../model/article-model';
import { ArticleService } from '../service/article-service';
import { logger } from '../application/logging';

export class ArticleController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateArticleRequest = req.body as CreateArticleRequest;
      const response = await ArticleService.create(req.user!, request);
      logger.debug('response : ' + JSON.stringify(response));
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const articleId = Number(req.params.articleId);

      // Ambil article sebagai data publik tanpa autentikasi
      const response = await ArticleService.getPublic(articleId);

      logger.debug('response (public): ' + JSON.stringify(response));
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchArticleRequest = {
        title: req.query.title as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await ArticleService.getAll(request);
      logger.debug('response : ' + JSON.stringify(response));
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateArticleRequest = req.body as UpdateArticleRequest;
      request.id = Number(req.params.articleId);

      const response = await ArticleService.update(req.user!, request);
      logger.debug('response : ' + JSON.stringify(response));
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const articleId = Number(req.params.articleId);
      const response = await ArticleService.remove(req.user!, articleId);
      logger.debug('response : ' + JSON.stringify(response));
      res.status(200).json({
        data: 'Article removed successfully',
      });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchArticleRequest = {
        title: req.query.title as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await ArticleService.search(req.user!, request);
      logger.debug('response : ' + JSON.stringify(response));
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
