import { FC } from "react";
import { useNavigate } from "react-router-dom";

type ShortCardProps = {
  id: number; // index or unique id of short
  title: string;
  content: string;
  tags: string[];
  isPrivate: boolean;
  journalTitle?: string;
};

const ShortCard: FC<ShortCardProps> = ({ id, title, content, tags, isPrivate, journalTitle }) => {
  const navigate = useNavigate();

  // Simple content preview (first 100 characters)
  const preview = content.replace(/<[^>]+>/g, "").slice(0, 100) + (content.length > 100 ? "..." : "");

  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/shorts/${id}`)}
    >
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h2>

      {/* Journal */}
      {journalTitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          Journal: <span className="font-medium">{journalTitle}</span>
        </p>
      )}

      {/* Preview */}
      <p className="text-gray-700 dark:text-gray-300 mb-3">{preview}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Privacy */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {isPrivate ? "Private" : "Public"}
      </p>
    </div>
  );
};

export default ShortCard;
