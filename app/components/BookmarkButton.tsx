'use client';

import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";


interface HeartButtonProps {
  postId: string
  currentUser?: SafeUser | null
}

const BookmarkButton: React.FC<HeartButtonProps> = ({ 
  postId,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    postId,
    currentUser
  });

  return (
    <div 
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <FaRegBookmark
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <FaBookmark
        size={24}
        className={
          hasFavorited ? 'fill-green-600' : 'fill-neutral-400/70'
        }
      />
    </div>
  );
}

export default BookmarkButton;