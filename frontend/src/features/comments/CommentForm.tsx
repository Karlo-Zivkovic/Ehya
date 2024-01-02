import useCreateComment from '../comments/useCreateComment';
import { useForm, SubmitHandler } from 'react-hook-form';
import useEditComment from './useEditComment';

interface CommentFormProps {
  parent?: string | null;
  setFormIsOpen?: (cur: boolean) => void;
  setEditMode?: (cur: boolean) => void;
  editMode?: boolean;
}

type SubmitCommentType = { desc: string };

function CommentForm({
  setFormIsOpen,
  setEditMode,
  editMode,
  parent = null,
}: CommentFormProps) {
  const { createComment, isCreatingComment } = useCreateComment();
  const { editComment, isEditingComment } = useEditComment();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubmitCommentType>();

  const onSubmit: SubmitHandler<SubmitCommentType> = ({ desc }) => {
    if (editMode) {
      editComment({ desc, _id: parent! });
      setEditMode!(false);
    } else {
      createComment({ desc, parent });
    }

    if (setFormIsOpen) setFormIsOpen(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
      <textarea
        {...register('desc', {
          required: {
            value: true,
            message: 'Description is required',
          },
        })}
        className={`${
          isCreatingComment && 'bg-gray-100'
        } mt-2 rounded-lg border border-blue-500 w-full p-2`}
        name="desc"
        id="desc"
        cols={30}
        rows={8}
        placeholder="Leave your comment here..."
      />
      {errors?.desc?.message && (
        <p className="text-red-500 overflow-hidden text-xs">
          {errors.desc.message}
        </p>
      )}
      <button
        disabled={isCreatingComment && isEditingComment}
        className={`${
          isCreatingComment && 'opacity-60'
        } disabled:opacity-60 disabled:cursor-not-allowed absolute bottom-5 text-lg right-3 bg-blue-500 text-white rounded-md px-5 hover:bg-blue-600 py-1.5`}
      >
        {editMode ? 'Edit' : 'Create'}
      </button>
    </form>
  );
}

export default CommentForm;
