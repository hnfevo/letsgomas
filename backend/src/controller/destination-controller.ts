import { Response, NextFunction } from 'express';
import { UserRequest } from '../type/user-request';
import { CreateDestinationRequest, SearchDestinationRequest, UpdateDestinationRequest } from '../model/destination-model';
import { DestinationService } from '../service/destination-service';
import { logger } from '../application/logging';

export class DestinationController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateDestinationRequest = req.body as CreateDestinationRequest;
      const response = await DestinationService.create(req.user!, request);
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
      const destinationId = Number(req.params.destinationId);

      // Ambil destinasi sebagai data publik tanpa autentikasi
      const response = await DestinationService.getPublic(destinationId);

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
      const request: SearchDestinationRequest = {
        name: req.query.name as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await DestinationService.getAll(request);
      logger.debug('response : ' + JSON.stringify(response));
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateDestinationRequest = req.body as UpdateDestinationRequest;
      request.id = Number(req.params.destinationId);

      const response = await DestinationService.update(req.user!, request);
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
      const destinationId = Number(req.params.destinationId);
      const response = await DestinationService.remove(req.user!, destinationId);
      logger.debug('response : ' + JSON.stringify(response));
      res.status(200).json({
        data: 'Destination removed successfully',
      });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchDestinationRequest = {
        name: req.query.name as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await DestinationService.search(req.user!, request);
      logger.debug('response : ' + JSON.stringify(response));
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
