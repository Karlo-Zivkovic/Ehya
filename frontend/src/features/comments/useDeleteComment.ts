import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteComment as deleteCommentApi } from '../../services/commentApi';
import { useContext } from 'react';
import { AppContext } from '../../context/context';

export function useDeleteComment() {
  const { token } = useContext(AppContext);
  const queryclient = useQueryClient();
  const { mutate: deleteComment, isPending: isDeletingComment } = useMutation({
    mutationFn: ({ _id }: { _id: string }) => deleteCommentApi({ _id, token }),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['comments'] });
      toast.success('Comment successfully deleted');
    },
    onError: () => {
      toast.error('Failed to delete a comment');
    },
  });
  return { deleteComment, isDeletingComment };
}
