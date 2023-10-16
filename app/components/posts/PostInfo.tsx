'use client';


import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import PostCategory from "./PostCategory";
import DOMPurify from 'dompurify';


interface PostInfoProps {
  user: SafeUser,
  description: string;
  createdAt: Date;
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
  createdAt,
}) => {

  return ( 
    <div className="flex flex-col gap-8">
      <div className="md:hidden text-sm text-neutral-500">
        {createdAt.toLocaleDateString()}
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-xl font-semibold flex flex-col md:flex-row md:items-center gap-y-4 gap-x-8">
          <div className="flex flex-row items-center gap-x-2">
            <div>Written by {user?.name}</div>
            <Avatar src={user?.image} />
          </div>
          {category && (
            <PostCategory
              label={category?.label}
            />
          )}
        </div>
        <div className="hidden md:block text-sm text-neutral-500">
          {createdAt.toLocaleDateString()}
        </div>
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500 break-words">
        {stripHtml(description)}
      </div>
      <hr />
    </div>
  );
}

export default PostInfo;