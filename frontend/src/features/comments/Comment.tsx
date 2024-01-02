import { FiMessageSquare, FiTrash, FiEdit2 } from 'react-icons/fi';
import { CommentType } from '../../types';
import { API_BASE_URL, formatDate } from '../../utils';
import { useContext, useState } from 'react';
import CommentForm from './CommentForm';
import { AppContext } from '../../context/context';
import { useDeleteComment } from './useDeleteComment';

interface CommentProps {
  comment: CommentType;
  replies?: CommentType[];
}

function Comment({ comment, replies }: CommentProps) {
  const { userInfo } = useContext(AppContext);
  const { deleteComment, isDeletingComment } = useDeleteComment();
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const isReply = comment.parent !== null;
  const commentBelongsToUser = comment.user._id === userInfo!._id;

  function handleReplyOpenForm() {
    setFormIsOpen((cur) => !cur);
  }

  function handleEditOpenForm() {
    setFormIsOpen((cur) => !cur);
    setEditMode(true);
  }
  function deleteCommentHandler() {
    deleteComment({ _id: comment._id });
  }

  return (
    <div className={`bg-gray-200 p-3 rounded-md ${isReply && 'pl-12'}`}>
      <div className="flex items-center gap-3 h-14">
        <img
              crossOrigin="anonymous"
          src={
            `${API_BASE_URL}/users/${comment.user.photo}` ||
            `${API_BASE_URL}/users/default.jpg`
          }
          alt="profile picture"
          className="rounded-full h-[36px]"
        />
        <div className="flex flex-col">
          <p>{comment.user.name}</p>
          <p className="text-sm text-gray-700 opacity-80">
            {formatDate(comment.createdAt, true)}
          </p>
        </div>
      </div>
      <p className="pl-12 text-gray-700 opacity-80">{comment.desc}</p>
      <div className="mt-2 pl-12 text-gray-700 opacity-80 flex gap-3 items-center">
        {!isReply && (
          <button
            onClick={handleReplyOpenForm}
            className="flex items-center gap-1.5"
          >
            <FiMessageSquare className="w-4 h-auto" />
            <span>Reply</span>
          </button>
        )}
        {commentBelongsToUser && (
          <button
            onClick={handleEditOpenForm}
            className="flex items-center gap-1.5"
          >
            <FiEdit2 className="w-4 h-auto" />
            <span>Edit</span>
          </button>
        )}
        {commentBelongsToUser && (
          <button
            disabled={isDeletingComment}
            onClick={deleteCommentHandler}
            className="disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <FiTrash className="w-4 h-auto" />
            <span>{isDeletingComment ? 'Deleting...' : 'Delete'}</span>
          </button>
        )}
      </div>
      {formIsOpen && (
        <CommentForm
          setFormIsOpen={setFormIsOpen}
          editMode={editMode}
          setEditMode={setEditMode}
          parent={comment._id}
        />
      )}
      {replies?.map((reply: CommentType) => (
        <Comment comment={reply} key={reply.id} />
      ))}
    </div>
  );
}

export default Comment;
