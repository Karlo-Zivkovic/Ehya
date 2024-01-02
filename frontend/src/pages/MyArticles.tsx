import { FaLongArrowAltLeft } from 'react-icons/fa';
import ErrorMessage from '../components/ErrorMessage';
import Article from '../features/article/Article';
import ArticleSkeleton from '../features/article/ArticleSkeleton';
import useGetMyArticles from '../features/article/useGetMyArticles';
import { ArticleType } from '../types';
import { Link } from 'react-router-dom';

function MyArticles() {
  const { articles, isLoadingArticles, error } = useGetMyArticles();

  return (
    <div className="p-4 sm:mx-auto sm:max-w-xl lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[90rem] ">
      <div className="flex justify-between items-center xl:px-4 2xl:px-14">
        <h1 className="text-3xl text-blue-800">My Articles</h1>
        <Link
          to="/"
          className="flex justify-end gap-2 items-center text-blue-800 hover:underline"
        >
          <FaLongArrowAltLeft />
          <span>Back</span>
        </Link>
      </div>
      <div className="flex flex-col gap-8 md:grid grid-cols-2 pb-2 mt-4">
        {isLoadingArticles ? (
          [...Array(3)].map((_, index) => <ArticleSkeleton key={index} />)
        ) : error ? (
          <ErrorMessage message="Couldn't fetch the posts data" />
        ) : articles.length > 0 ? (
          articles.map((article: ArticleType) => (
            <Article key={article?._id} article={article} />
          ))
        ) : (
          <p className="text-center italic mb-[40rem]">
            No articles yet. Be first to write one :)
          </p>
        )}
      </div>
    </div>
  );
}

export default MyArticles;
