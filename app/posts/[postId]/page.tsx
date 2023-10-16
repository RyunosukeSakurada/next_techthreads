
import getCurrentUser from "@/app/actions/getCurrentUser";
import getPostById from "@/app/actions/getPostById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import PostClient from "./PostClient";

interface IParams {
  postId?: string;
}

const PostPage = async ({ params }: { params: IParams }) => {

  const post = await getPostById(params);
  const currentUser = await getCurrentUser();

  if (!post) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PostClient
        post={post}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default PostPage;