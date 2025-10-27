import { FC } from "react";
import { useNavigate } from "react-router-dom";

type JournalCardProps = {
  id: number; // index or unique id
  title: string;
  description: string;
  tags: string[];
  shortsCount: number;
  isPrivate: boolean;
};

const JournalCard: FC<JournalCardProps> = ({ id, title, description, tags, shortsCount, isPrivate }) => {
  const navigate = useNavigate();

  // Description preview (first 120 chars)
  const preview = description.slice(0, 120) + (description.length > 120 ? "..." : "");

  return (
    <div
      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer"
      onClick={() => navigate(`/journals/${id}`)}
    >
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h2>

      {/* Description */}
      {description && <p className="text-gray-700 dark:text-gray-300 mb-2">{preview}</p>}

      {/* Shorts count */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {shortsCount} short{shortsCount !== 1 ? "s" : ""}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-green-600 text-white text-xs px-2 py-1 rounded-full"
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

export default JournalCard;
