"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const destination_controller_1 = require("../controller/destination-controller");
const article_controller_1 = require("../controller/article-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.authMiddleware);
// User APi
exports.apiRouter.get('/api/users/current', user_controller_1.UserController.get);
exports.apiRouter.patch('/api/users/current', user_controller_1.UserController.update);
exports.apiRouter.delete('/api/users/current', user_controller_1.UserController.logout);
// Destination API
exports.apiRouter.post('/api/destinations', (0, auth_middleware_1.authorizeRole)('admin'), destination_controller_1.DestinationController.create);
exports.apiRouter.put('/api/destinations/:destinationId(\\d+)', (0, auth_middleware_1.authorizeRole)('admin'), destination_controller_1.DestinationController.update);
exports.apiRouter.delete('/api/destinations/:destinationId(\\d+)', (0, auth_middleware_1.authorizeRole)('admin'), destination_controller_1.DestinationController.remove);
// Articles API
exports.apiRouter.post('/api/articles', (0, auth_middleware_1.authorizeRole)('admin'), article_controller_1.ArticleController.create);
exports.apiRouter.put('/api/articles/:articleId(\\d+)', (0, auth_middleware_1.authorizeRole)('admin'), article_controller_1.ArticleController.update);
exports.apiRouter.delete('/api/articles/:articleId(\\d+)', (0, auth_middleware_1.authorizeRole)('admin'), article_controller_1.ArticleController.remove);
