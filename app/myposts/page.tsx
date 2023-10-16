
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getPosts from "@/app/actions/getPosts";

import MyPostsClient from "./MyPostsClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const posts = await getPosts({ userId: currentUser.id });

  if (posts.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MyPostsClient
        posts={posts}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default PropertiesPage;