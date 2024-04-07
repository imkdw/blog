interface CreateArticleCategoryParam {
  articleId: string;
  categoryId: number;
}

// eslint-disable-next-line import/prefer-default-export
export const createArticleCategory = async ({ categoryId, articleId }: CreateArticleCategoryParam) => {
  const createdArticleCategory = await prisma.articleCategory.create({
    data: {
      articleId,
      categoryId,
    },
  });

  return createdArticleCategory;
};
