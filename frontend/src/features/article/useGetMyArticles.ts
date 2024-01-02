import { useQuery } from '@tanstack/react-query';
import { getMyArticles } from '../../services/articleApi';
import { useContext } from 'react';
import { AppContext } from '../../context/context';

export default function useGetMyArticles() {
  const { token } = useContext(AppContext);
  const {
    data: articles,
    isLoading: isLoadingArticles,
    error,
  } = useQuery({
    queryKey: ['my-articles'],
    queryFn: () => getMyArticles(token),
  });

  return { articles, isLoadingArticles, error };
}
