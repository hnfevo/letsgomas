"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleValidation = void 0;
const zod_1 = require("zod");
class ArticleValidation {
}
exports.ArticleValidation = ArticleValidation;
ArticleValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    content: zod_1.z.string().min(1).max(10000),
    image: zod_1.z.string().url().optional(),
    author_name: zod_1.z.string().min(1).max(100).optional(),
});
ArticleValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(1).max(255).optional(),
    content: zod_1.z.string().min(1).max(10000).optional(),
    image: zod_1.z.string().url().optional(),
    author_name: zod_1.z.string().min(1).max(100).optional(),
});
ArticleValidation.SEARCH = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive(),
});
