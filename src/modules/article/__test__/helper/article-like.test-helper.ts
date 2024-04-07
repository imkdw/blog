interface CreateArticleLikeParam {
  articleId: string;
  userId: string;
}
// eslint-disable-next-line import/prefer-default-export
export const createArticleLike = async ({ articleId, userId }: CreateArticleLikeParam) => {
  const createdArticleLike = await prisma.articleLike.create({
    data: {
      articleId,
      userId,
    },
  });

  return createdArticleLike;
};
