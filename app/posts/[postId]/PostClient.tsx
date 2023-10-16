'use client';

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafePost, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import PostHead from "@/app/components/posts/PostHead";
import PostInfo from "@/app/components/posts/PostInfo";


interface PostClientProps {
  post: SafePost & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<PostClientProps> = ({
  post,
  currentUser
}) => {
  const category = useMemo(() => {
    return categories.find((items) => 
      items.label === post.category);
  }, [post.category]);

  
  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <PostHead
            title={post.title}
            imageSrc={post.imageSrc}
            id={post.id}
            currentUser={currentUser}
          />
          <div className="mt-6">
            <PostInfo
              user={post.user}
              category={category}
              description={post.description}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;