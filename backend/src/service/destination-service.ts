import { Destination, User } from '@prisma/client';
import { DestinationResponse, CreateDestinationRequest, SearchDestinationRequest, toDestinationResponse, UpdateDestinationRequest } from '../model/destination-model';
import { DestinationValidation } from '../validation/destination-validation';
import { Validation } from '../validation/validation';
import { prismaClient } from '../application/database';
import { logger } from '../application/logging';
import { ResponseError } from '../error/response-error';
import { Pageable } from '../model/page';

export class DestinationService {
  static async create(user: User, request: CreateDestinationRequest): Promise<DestinationResponse> {
    const createRequest = Validation.validate(DestinationValidation.CREATE, request);

    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const destination = await prismaClient.destination.create({
      data: record,
    });

    logger.debug('record : ' + JSON.stringify(destination));
    return toDestinationResponse(destination);
  }

  static async checkDestinationMustExists(username: string, destinationId: number): Promise<Destination> {
    const destination = await prismaClient.destination.findFirst({
      where: {
        id: destinationId,
        username: username,
      },
    });

    if (!destination) {
      throw new ResponseError(404, 'Destination not found');
    }

    return destination;
  }

  static async get(user: User, id: number): Promise<DestinationResponse> {
    const destination = await this.checkDestinationMustExists(user.username, id);
    return toDestinationResponse(destination);
  }

  static async getPublic(destinationId: number): Promise<DestinationResponse> {
    // Cari destinasi berdasarkan ID
    const destination = await prismaClient.destination.findUnique({
      where: {
        id: destinationId,
      },
    });

    // Jika destinasi tidak ditemukan, kembalikan error
    if (!destination) {
      throw new ResponseError(404, 'Destination not found');
    }

    // Konversi data destinasi ke response format
    return toDestinationResponse(destination);
  }

  static async update(user: User, request: UpdateDestinationRequest): Promise<DestinationResponse> {
    const updateRequest = Validation.validate(DestinationValidation.UPDATE, request);
    await this.checkDestinationMustExists(user.username, updateRequest.id);

    const destination = await prismaClient.destination.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toDestinationResponse(destination);
  }

  static async remove(user: User, id: number): Promise<DestinationResponse> {
    await this.checkDestinationMustExists(user.username, id);

    const destination = await prismaClient.destination.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    return toDestinationResponse(destination);
  }

  static async getAll(request: SearchDestinationRequest): Promise<Pageable<DestinationResponse>> {
    const { name, page, size } = request;
    const skip = (page - 1) * size;

    const filters = [];
    if (name) {
      filters.push({
        name: {
          contains: name,
        },
      });
    }

    const destinations = await prismaClient.destination.findMany({
      where: {
        AND: filters,
      },
      take: size,
      skip: skip,
    });

    const total = await prismaClient.destination.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: destinations.map(toDestinationResponse),
      paging: {
        current_page: page,
        total_page: Math.ceil(total / size),
        size,
      },
    };
  }

  static async search(user: User, request: SearchDestinationRequest): Promise<Pageable<DestinationResponse>> {
    const searchRequest = Validation.validate(DestinationValidation.SEARCH, request);
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters = [];
    // check if name exists
    if (searchRequest.name) {
      filters.push({
        name: {
          contains: searchRequest.name,
        },
      });
    }

    const destination = await prismaClient.destination.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await prismaClient.destination.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: destination.map((destination) => toDestinationResponse(destination)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
