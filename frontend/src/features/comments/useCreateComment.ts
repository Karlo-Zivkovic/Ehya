import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment as createCommentApi } from '../../services/commentApi';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useCreateComment() {
  const { token } = useContext(AppContext);
  const { slug } = useParams<{ slug: string }>();
  const queryclient = useQueryClient();

  const {
    mutate: createComment,
    isPending: isCreatingComment,
  } = useMutation({
    mutationFn: ({ desc, parent }: { desc: string; parent: string | null }) =>
      createCommentApi({ slug, desc, token, parent }),
    onSuccess: () => {
      toast.success('Comment created')
      queryclient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: () => {
      toast.error('Failed to create a comment');
    },
  });

  return { createComment, isCreatingComment,  };
}
