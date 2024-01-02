import useComments from '../comments/useComments';
import Loader from '../../components/Loader';
import Comment from './Comment';
import { CommentType, ReplyCommentType } from '../../types';
import ErrorMessage from '../../components/ErrorMessage';

function CommentsContainer() {
  const { comments, isLoadingComments, commentsError } = useComments();

  if (commentsError) return <ErrorMessage message="Failed to load comments" />;
  if (isLoadingComments) return <Loader color="#0a0a0a" className="mt-2" />;
  if (!comments.length)
    return (
      <p className="text-gray-700 mt-2 text-center">Be first to comment :)</p>
    );

  const topLayerComments = comments.filter(
    (comment: CommentType) => comment.parent === null,
  );

  const replies = comments.filter(
    (comment: CommentType) => comment.parent !== null,
  );

  return (
    <div className="mt-2 flex flex-col gap-4">
      {topLayerComments.map((comment: CommentType) => {
        const replieComments = replies.filter(
          (replyComment: ReplyCommentType) =>
            replyComment.parent._id === comment._id,
        );
        return (
          <Comment
            replies={replieComments}
            comment={comment}
            key={comment._id}
          />
        );
      })}
    </div>
  );
}

export default CommentsContainer;
