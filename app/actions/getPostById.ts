import prisma from "@/app/libs/prismadb";

interface IParams {
  postId?: string;
}

export default async function getPostById(
  params: IParams
) {
  try {
    const { postId } = params;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true
      }
    });

    if (!post) {
      return null;
    }

    return {
      ...post,
      createdAt: post.createdAt.toString(),
      user: {
        ...post.user,
        createdAt: post.user.createdAt.toString(),
        updatedAt: post.user.updatedAt.toString(),
        emailVerified: 
          post.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}