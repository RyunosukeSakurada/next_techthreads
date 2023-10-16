'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafePost, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import PostCard from "@/app/components/posts/PostCard";

interface MyPostsClientProps {
  posts: SafePost[],
  currentUser?: SafeUser | null,
}

const PropertiesClient: React.FC<MyPostsClientProps> = ({
  posts,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/posts/${id}`)
    .then(() => {
      toast.success('Post deleted');
      router.refresh();
    })
    .catch((error) => {
      toast.error(error?.response?.data?.error)
    })
    .finally(() => {
      setDeletingId('');
    })
  }, [router]);


  return ( 
    <Container>
      <Heading
        title="Posts"
        subtitle="List of your posts"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          gap-8
        "
      >
        {posts.map((post: any) => (
          <PostCard
            key={post.id}
            data={post}
            actionId={post.id}
            onAction={onDelete}
            disabled={deletingId === post.id}
            actionLabel="Delete Post"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;