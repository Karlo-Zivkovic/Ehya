import { ArticleType } from '../../types';
import { API_BASE_URL, formatDate } from '../../utils';
import { Link } from 'react-router-dom';

interface ArticleProps {
  article: ArticleType;
}

function Article({ article }: ArticleProps) {
  const { title, createdAt, caption, photo, user } = article;

  return (
    <Link
      to={`/article/${article?.slug}`}
      className="overflow-hidden w-full shadow-lg rounded-lg max-w-xl md:h-[40rem] flex flex-col mx-auto"
    >
      <img
        crossOrigin="anonymous"
        className="w-full h-[23rem] object-cover"
        src={`${API_BASE_URL}/articles/${photo}`}
        alt="article photo"
      />
      <div className="px-4 text-gray-600 mt-2 pb-4 flex-1 flex flex-col gap-2 overflow-hidden">
        <h1 className="text-blue-800 font-semibold text-lg overflow-hidden">
          {title}
        </h1>
        <p className="overflow-hidden text-gray-600">{caption}</p>
        <div className="flex items-center overflow-hidden justify-between mt-auto">
          <div className="flex items-center gap-3">
            <img
              crossOrigin="anonymous"
              className="h-14 object-cover rounded-full"
              src={
                `${API_BASE_URL}/users/${user.photo}` ||
                `${API_BASE_URL}/users/default.jpg`
              }
              alt="profile picture"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-blue-800 font-semibold text-medium">
                {user.name}
              </h3>
            </div>
          </div>
          <p className="italic">{formatDate(createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}

export default Article;

