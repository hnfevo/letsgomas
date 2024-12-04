"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const article_model_1 = require("../model/article-model");
const validation_1 = require("../validation/validation");
const article_validation_1 = require("../validation/article-validation");
const database_1 = require("../application/database");
const logging_1 = require("../application/logging");
const response_error_1 = require("../error/response-error");
class ArticleService {
    static create(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(article_validation_1.ArticleValidation.CREATE, request);
            const record = Object.assign(Object.assign({}, createRequest), { username: user.username });
            const article = yield database_1.prismaClient.article.create({
                data: record,
            });
            logging_1.logger.debug('record : ' + JSON.stringify(article));
            return (0, article_model_1.toArticleResponse)(article);
        });
    }
    static checkArticleMustExists(username, articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield database_1.prismaClient.article.findFirst({
                where: {
                    id: articleId,
                    username: username,
                },
            });
            if (!article) {
                throw new response_error_1.ResponseError(404, 'article not found');
            }
            return article;
        });
    }
    static get(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield this.checkArticleMustExists(user.username, id);
            return (0, article_model_1.toArticleResponse)(article);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(article_validation_1.ArticleValidation.UPDATE, request);
            yield this.checkArticleMustExists(user.username, updateRequest.id);
            const article = yield database_1.prismaClient.article.update({
                where: {
                    id: updateRequest.id,
                    username: user.username,
                },
                data: updateRequest,
            });
            return (0, article_model_1.toArticleResponse)(article);
        });
    }
    static getPublic(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Cari article berdasarkan ID
            const article = yield database_1.prismaClient.article.findUnique({
                where: {
                    id: articleId,
                },
            });
            // Jika article tidak ditemukan, kembalikan error
            if (!article) {
                throw new response_error_1.ResponseError(404, 'Article not found');
            }
            // Konversi data article ke response format
            return (0, article_model_1.toArticleResponse)(article);
        });
    }
    static remove(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkArticleMustExists(user.username, id);
            const article = yield database_1.prismaClient.article.delete({
                where: {
                    id: id,
                    username: user.username,
                },
            });
            return (0, article_model_1.toArticleResponse)(article);
        });
    }
    static getAll(request) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const articles = yield database_1.prismaClient.article.findMany({
                where: {
                    AND: filters,
                },
                take: size,
                skip: skip,
            });
            const total = yield database_1.prismaClient.article.count({
                where: {
                    AND: filters,
                },
            });
            return {
                data: articles.map(article_model_1.toArticleResponse),
                paging: {
                    current_page: page,
                    total_page: Math.ceil(total / size),
                    size,
                },
            };
        });
    }
    static search(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(article_validation_1.ArticleValidation.SEARCH, request);
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
            const article = yield database_1.prismaClient.article.findMany({
                where: {
                    username: user.username,
                    AND: filters,
                },
                take: searchRequest.size,
                skip: skip,
            });
            const total = yield database_1.prismaClient.article.count({
                where: {
                    username: user.username,
                    AND: filters,
                },
            });
            return {
                data: article.map((article) => (0, article_model_1.toArticleResponse)(article)),
                paging: {
                    current_page: searchRequest.page,
                    total_page: Math.ceil(total / searchRequest.size),
                    size: searchRequest.size,
                },
            };
        });
    }
}
exports.ArticleService = ArticleService;
