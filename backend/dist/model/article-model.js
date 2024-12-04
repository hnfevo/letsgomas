"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArticleResponse = toArticleResponse;
function toArticleResponse(article) {
    return {
        id: article.id,
        title: article.title,
        content: article.content,
        image: article.image,
        author_name: article.author_name,
    };
}
