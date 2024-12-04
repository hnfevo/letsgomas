import { Article } from '@prisma/client';

export type ArticleResponse = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  author_name?: string | null;
};

export type CreateArticleRequest = {
  title: string;
  content: string;
  image?: string;
  author_name?: string;
};

export type UpdateArticleRequest = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  author_name?: string | null;
};

export type SearchArticleRequest = {
  title?: string;
  page: number;
  size: number;
};

export function toArticleResponse(article: Article): ArticleResponse {
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    image: article.image,
    author_name: article.author_name,
  };
}
