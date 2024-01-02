import { API_BASE_URL } from '../utils';
import useArticle from '../features/article/useArticle';
import ArticleDetailSkeleteon from '../features/article//ArticleDetailSkeleton';
import Share from '../components/Share';
import CommentsContainer from '../features/comments/CommentsContainer';
import CommentForm from '../features/comments/CommentForm';
import ErrorMessage from '../components/ErrorMessage';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ArticleDetails() {
  const { article, isLoadingArticle, articleError } = useArticle();

  if (articleError)
    return (
      <ErrorMessage
        className="my-20"
        message="Couldn't fetch the article data"
      />
    );
  if (isLoadingArticle) return <ArticleDetailSkeleteon />;

  return (
    <div className="p-6 md:flex lg:mx-auto lg:max-w-5xl xl:max-w-6xl lg:px-12 gap-6">
      <div className="flex-1">
        <Link
          to="/"
          className="hover:underline mb-2 flex gap-2 items-center text-blue-800"
        >
          <FaLongArrowAltLeft />
          <span>Back</span>
        </Link>
        <div className="w-full h-20rem">
          <img
            crossOrigin="anonymous"
            className="w-full rounded-xl h-[23rem] object-contain bg-gray-300"
            src={`${API_BASE_URL}/articles/${article?.photo}`}
            alt="article photo"
          />
        </div>
        <h1 className="text-blue-800 mt-2">{article?.title}</h1>
        <p className="text-gray-600">{article?.caption}</p>
        <CommentForm />
        <CommentsContainer />
      </div>
      <div className="mt-7 md:mt-0 md:w-[20rem]">
        <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
          Share on:
        </h2>
        <Share
          url={encodeURI(window.location.href)} // if there is a wierd character, this function will transform it into utf-8 format
          title={encodeURIComponent(
            // difference is that this does not take full url, this is just querystring
            article?.title!,
          )}
        />
      </div>
    </div>
  );
}

export default ArticleDetails;
