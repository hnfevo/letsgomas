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
exports.ArticleController = void 0;
const article_service_1 = require("../service/article-service");
const logging_1 = require("../application/logging");
class ArticleController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield article_service_1.ArticleService.create(req.user, request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleId = Number(req.params.articleId);
                // Ambil article sebagai data publik tanpa autentikasi
                const response = yield article_service_1.ArticleService.getPublic(articleId);
                logging_1.logger.debug('response (public): ' + JSON.stringify(response));
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    title: req.query.title,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield article_service_1.ArticleService.getAll(request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.articleId);
                const response = yield article_service_1.ArticleService.update(req.user, request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articleId = Number(req.params.articleId);
                const response = yield article_service_1.ArticleService.remove(req.user, articleId);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json({
                    data: 'Article removed successfully',
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    title: req.query.title,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 10,
                };
                const response = yield article_service_1.ArticleService.search(req.user, request);
                logging_1.logger.debug('response : ' + JSON.stringify(response));
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ArticleController = ArticleController;
