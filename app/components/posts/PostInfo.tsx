'use client';


import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import PostCategory from "./PostCategory";
import DOMPurify from 'dompurify';


interface PostInfoProps {
  user: SafeUser,
  description: string;
  category: {
    label: string;
  } | undefined
}

function stripHtml(html: string): string {
  const cleanHtml = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  const doc = new DOMParser().parseFromString(cleanHtml, 'text/html');
  return doc.body.textContent || "";
}

const PostInfo: React.FC<PostInfoProps> = ({
  user,
  description,
  category,
}) => {

  return ( 
    <div className="flex flex-col gap-8">
      <div className="flex flex-row justify-between gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Written by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        {category && (
          <PostCategory
            label={category?.label}
          />
        )}
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {stripHtml(description)}
      </div>
      <hr />
    </div>
  );
}

export default PostInfo;