import { useQuery } from '@tanstack/react-query';
import { getAllArticles } from '../../services/articleApi';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/context';
import { useSearchParams } from 'react-router-dom';

export default function useArticles(searchQuery: string) {
  const { token } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const {
    data,
    isLoading: isLoadingArticles,
    error: articleError,
    refetch,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getAllArticles(token, page, searchQuery),
  });

  useEffect(() => {
    refetch();
  }, [page, refetch,searchQuery]);

  return { data, isLoadingArticles, articleError };
}

