'use client';

interface PostCategoryProps {
  label: string,
}

const PostCategory: React.FC<PostCategoryProps> = ({ 
  label,
}) => {
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col">
            <div 
              className="text-lg font-semibold"
            >
              {label}
            </div>
        </div>
      </div>
    </div>
  );
}

export default PostCategory;