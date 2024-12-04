"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const destination_controller_1 = require("../controller/destination-controller");
const article_controller_1 = require("../controller/article-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post('/api/users', user_controller_1.UserController.register);
exports.publicRouter.post('/api/users/login', user_controller_1.UserController.login);
// Destination API (Public Read)
exports.publicRouter.get('/api/destinations/:destinationId(\\d+)', destination_controller_1.DestinationController.get);
exports.publicRouter.get('/api/destinations', destination_controller_1.DestinationController.getAll);
exports.publicRouter.get('/api/destinations', destination_controller_1.DestinationController.search);
// Articles API (Public Read)
exports.publicRouter.get('/api/articles/:articleId(\\d+)', article_controller_1.ArticleController.get);
exports.publicRouter.get('/api/articles', article_controller_1.ArticleController.getAll);
exports.publicRouter.get('/api/articles', article_controller_1.ArticleController.search);
