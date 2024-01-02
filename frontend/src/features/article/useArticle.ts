import { useQuery } from '@tanstack/react-query';
import { getArticle } from '../../services/articleApi';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import { ArticleType } from '../../types';

export default function useArticle() {
  const { token } = useContext(AppContext);
  const { slug } = useParams();
  
  const {
    data: article,
    isLoading: isLoadingArticle,
    error: articleError,
  } = useQuery<ArticleType>({
    queryKey: ['article', slug],
    queryFn: () => getArticle({ slug, token }),
  });

  return { article, isLoadingArticle, articleError };
}

