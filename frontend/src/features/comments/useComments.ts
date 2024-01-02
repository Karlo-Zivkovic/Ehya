import { useQuery } from '@tanstack/react-query';
import { AppContext } from '../../context/context';
import { useContext } from 'react';
import { getAllComments } from '../../services/commentApi';
import { useParams } from 'react-router-dom';

export default function useComments() {
  const { token } = useContext(AppContext);
  const { slug } = useParams();
  const {
    data: comments,
    isLoading: isLoadingComments,
    error: commentsError,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getAllComments({ token, slug }),
  });

  return { comments, isLoadingComments, commentsError };
}
