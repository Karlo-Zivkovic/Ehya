import Modal from '../components/Modal';
import Article from '../features/article/Article';
import CreateArticleModal from '../features/article/CreateArticleModal';
import SearchArticle from '../features/article/SearchArticle';
import useArticles from '../features/article/useArticles';
import { ArticleType } from '../types';
import ArticleSkeleton from '../features/article/ArticleSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RESULTS_PER_PAGE } from '../utils';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data, isLoadingArticles, articleError } = useArticles(searchQuery);
  const articles = data?.articles;

  const totalPages = Math.ceil(data?.totalCount / RESULTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(+searchParams.get('page')! || 1);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    searchParams.set('page', `${newPage}`);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="flex w-full items-center justify-between lg:max-w-5xl lg:mx-auto xl:max-w-7xl 2xl:max-w-[90rem]">
        <div className="flex flex-col p-6 lg:mt-0 2xl:-translate-y-10 mt-10 gap-10 lg:max-w-auto lg:mx-0 md:max-w-3xl md:mx-auto lg:w-1/2">
          <div className="flex flex-col gap-4 ">
            <h1 className="p-1 text-4xl text-center lg:text-left text-blue-900 md:text-5xl overflow-y-hidden">
              Read the most interesting articles
            </h1>
            <p className="text-center lg:text-left text-gray-600 md:text-lg">
              Words have the power to transport, enlighten, and captivate. Dive
              into our collection of thought-provoking articles
            </p>
          </div>

          <div>
            <SearchArticle setSearchQuery={setSearchQuery} />
            <Modal>
              <Modal.Open opens="createArticle">
                <button className="mt-3 border-2 w-full hover:text-white hover:bg-blue-500 border-blue-500 rounded-md py-2 font-semibold text-blue-700">
                  Add Article
                </button>
              </Modal.Open>
              <Modal.Window name="createArticle">
                <CreateArticleModal onCloseModal={undefined as never} />
              </Modal.Window>
            </Modal>
          </div>
        </div>
        <div className="hidden lg:block w-1/2 h-full">
          <img className="" src="/HeroImage.svg" alt="hero" />
        </div>
      </div>
      <div className="flex flex-col gap-8 p-6 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl  2xl:max-w-[90rem] mx-auto ">
        <div className="flex flex-col gap-8 md:grid grid-cols-2 pb-2">
          {isLoadingArticles ? (
            [...Array(3)].map((_, index) => <ArticleSkeleton key={index} />)
          ) : articleError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : articles.length > 0 ? (
            articles.map((article: ArticleType) => (
              <Article key={article?._id} article={article} />
            ))
          ) : (
            <p className="text-center italic">
              No articles yet. Be first to write one :)
            </p>
          )}
        </div>
        {!articleError && !isLoadingArticles && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <div className="w-full">
        <img className="w-full" src="/blueBg.svg" alt="" />
      </div>
    </>
  );
}

export default HomePage;

