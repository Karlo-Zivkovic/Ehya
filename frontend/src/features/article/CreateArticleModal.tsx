import { useForm, SubmitHandler } from 'react-hook-form';
import useCreateArticle from './useCreateArticle';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import Loader from '../../components/Loader';

type AddArticleType = {
  title: string;
  caption: string;
  image: FileList;
};

interface CreateArticleModalProps {
  onCloseModal: () => void;
}

function CreateArticleModal({ onCloseModal }: CreateArticleModalProps) {
  const { userInfo, token } = useContext(AppContext);
  const { creatingArticle, isCreatingArticle } = useCreateArticle();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddArticleType>();

  const onSubmit: SubmitHandler<AddArticleType> = ({
    title,
    caption,
    image,
  }) => {
    const photo = image[0];
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    creatingArticle(
      { title, token, caption, photo, slug, _id: userInfo!._id },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      },
    );
  };

  return (
    <form className="z-50 max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-24 flex-col gap-2 pt-4">
        <label
          className="text-sm overflow-hidden font-semibold"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="border outline-none px-2 text-sm py-1.5 border-gray-500 rounded-md  focus:bg-gray-100 focus:border-blue-800"
          type="string"
          id="title"
          {...register('title', {
            required: {
              value: true,
              message: 'Title is required',
            },
          })}
        />
        {errors.title?.message && (
          <p className="text-red-500 overflow-hidden text-xs">
            {errors.title.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 h-36 mt-1">
        <label
          className="text-sm font-semibold overflow-hidden"
          htmlFor="caption"
        >
          Caption
        </label>
        <textarea
          id="caption"
          className="text-sm border outline-none focus:bg-gray-100 focus:border-blue-800 px-2 py-1.5 border-gray-500 rounded-md"
          rows={4}
          {...register('caption', {
            required: {
              value: true,
              message: 'Caption is required',
            },
          })}
        />
        {errors.caption?.message && (
          <p className="text-red-500 text-xs">{errors.caption.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold" htmlFor="image">
          Image
        </label>
        <input
          className="file:border-blue-500 text-sm file:text-base file:bg-white file:text-blue-800 file:hover:bg-blue-500 file:hover:text-white file:cursor-pointer file:transition-all duration-300"
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          {...register('image', {
            required: {
              value: true,
              message: 'Image is required',
            },
          })}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          disabled={isCreatingArticle}
          className="absolute bottom-4 right-4 px-4 py-1 text-lg font-semibold text-blue-700 hover:bg-blue-500 hover:text-white border-2 border-blue-500 rounded-md"
        >
          {isCreatingArticle ? (
            <Loader color="#1d4ed8" size={30} />
          ) : (
            'Add Article'
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateArticleModal;

