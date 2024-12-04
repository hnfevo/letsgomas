import { Article, User } from '@prisma/client';
import { ArticleResponse, CreateArticleRequest, SearchArticleRequest, toArticleResponse, UpdateArticleRequest } from '../model/article-model';
import { Validation } from '../validation/validation';
import { ArticleValidation } from '../validation/article-validation';
import { prismaClient } from '../application/database';
import { logger } from '../application/logging';
import { ResponseError } from '../error/response-error';
import { Pageable } from '../model/page';

export class ArticleService {
  static async create(user: User, request: CreateArticleRequest): Promise<ArticleResponse> {
    const createRequest = Validation.validate(ArticleValidation.CREATE, request);
    const record = {
      ...createRequest,
      ...{ username: user.username },
    };

    const article = await prismaClient.article.create({
      data: record,
    });

    logger.debug('record : ' + JSON.stringify(article));
    return toArticleResponse(article);
  }

  static async checkArticleMustExists(username: string, articleId: number): Promise<Article> {
    const article = await prismaClient.article.findFirst({
      where: {
        id: articleId,
        username: username,
      },
    });

    if (!article) {
      throw new ResponseError(404, 'article not found');
    }

    return article;
  }

  static async get(user: User, id: number): Promise<ArticleResponse> {
    const article = await this.checkArticleMustExists(user.username, id);
    return toArticleResponse(article);
  }

  static async update(user: User, request: UpdateArticleRequest): Promise<ArticleResponse> {
    const updateRequest = Validation.validate(ArticleValidation.UPDATE, request);
    await this.checkArticleMustExists(user.username, updateRequest.id);

    const article = await prismaClient.article.update({
      where: {
        id: updateRequest.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return toArticleResponse(article);
  }

  static async getPublic(articleId: number): Promise<ArticleResponse> {
    // Cari article berdasarkan ID
    const article = await prismaClient.article.findUnique({
      where: {
        id: articleId,
      },
    });

    // Jika article tidak ditemukan, kembalikan error
    if (!article) {
      throw new ResponseError(404, 'Article not found');
    }

    // Konversi data article ke response format
    return toArticleResponse(article);
  }

  static async remove(user: User, id: number): Promise<ArticleResponse> {
    await this.checkArticleMustExists(user.username, id);

    const article = await prismaClient.article.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    return toArticleResponse(article);
  }

  static async getAll(request: SearchArticleRequest): Promise<Pageable<ArticleResponse>> {
    const { title, page, size } = request;
    const skip = (page - 1) * size;

    const filters = [];
    if (title) {
      filters.push({
        title: {
          contains: title,
        },
      });
    }

    const articles = await prismaClient.article.findMany({
      where: {
        AND: filters,
      },
      take: size,
      skip: skip,
    });

    const total = await prismaClient.article.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: articles.map(toArticleResponse),
      paging: {
        current_page: page,
        total_page: Math.ceil(total / size),
        size,
      },
    };
  }

  static async search(user: User, request: SearchArticleRequest): Promise<Pageable<ArticleResponse>> {
    const searchRequest = Validation.validate(ArticleValidation.SEARCH, request);
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters = [];
    // check if title exists
    if (searchRequest.title) {
      filters.push({
        title: {
          contains: searchRequest.title,
        },
      });
    }

    const article = await prismaClient.article.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await prismaClient.article.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: article.map((article) => toArticleResponse(article)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
