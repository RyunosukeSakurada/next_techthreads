import prisma from "@/app/libs/prismadb";

export interface IPostsParams {
  userId?: string;
  category?: string;
}

export default async function getListings(
  params: IPostsParams
) {
  try {
    const {
      userId,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }


    const posts = await prisma.post.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
    }));

    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
}