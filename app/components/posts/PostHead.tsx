'use client';

import Image from "next/image";

import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import BookmarkButton from "../BookmarkButton";
import Link from "next/link";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser
}) => {


  return ( 
    <>
      <Link href={"/"}>
        <div className="cursor-pointer hover:text-neutral-500"><span className="text-[12px]">◀</span> HOME </div>
      </Link>
      <Heading
        title={title}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <BookmarkButton
            postId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
}

export default ListingHead;