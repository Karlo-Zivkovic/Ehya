import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editComment as editCommentApi } from '../../services/commentApi';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import toast from 'react-hot-toast';

export default function useEditComment() {
  const { token } = useContext(AppContext);
  const queryclient = useQueryClient();

  const { mutate: editComment, isPending: isEditingComment } = useMutation({
    mutationFn: ({ desc, _id }: { desc: string; _id: string }) =>
      editCommentApi({ desc, token, _id }),
    onSuccess: () => {
      toast.success('Comment edited');
      queryclient.invalidateQueries({ queryKey: ['comments'] });
    },
    onError: () => {
      toast.error('Failed to edit a comment');
    },
  });

  return { editComment, isEditingComment };
}
