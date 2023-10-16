'use client';

import { useRouter } from "next/navigation";
import DOMPurify from 'dompurify';
import { useCallback } from "react";
import Button from "../Button";

import { 
  SafePost, 
  SafeUser 
} from "@/app/types";

import BookmarkButton from "../BookmarkButton";

interface PostCardProps {
  data: SafePost;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const PostCard: React.FC<PostCardProps> = ({
  data,
  currentUser,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
}) => {
  const router = useRouter();

  function stripHtml(html: string): string {
    const cleanHtml = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    const doc = new DOMParser().parseFromString(cleanHtml, 'text/html');
    return doc.body.textContent || "";
  }

  function truncateTitle(title: string, maxLength: number = 30): string {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + '...';
  }

  function truncateDescription(description: string, maxLength: number = 70): string {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
  }

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  }
  

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);
    

  return (
    <div 
      onClick={() => router.push(`/posts/${data.id}`)} 
      className="cursor-pointer group border rounded-lg px-4 py-2 h-50 md:h-80  2xl:h-60"
    >
      <div className="flex flex-col justify-between h-full w-full pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row gap-x-2 font-light text-neutral-500 items-center">
              <div>{data.category}</div>
              <div className="text-[12px]">{formatDate(data.createdAt)}</div>
            </div>
            <BookmarkButton
              postId={data.id} 
              currentUser={currentUser}
            />
          </div>
          <div className="font-semibold text-[20px] break-words">{truncateTitle(data.title)}</div>
          <div className="font-semibold text-[14px] text-zinc-500 break-words">{truncateDescription(stripHtml(data.description))}</div>
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default PostCard;