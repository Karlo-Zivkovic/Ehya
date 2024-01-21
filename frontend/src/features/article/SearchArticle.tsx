import { IoIosSearch } from 'react-icons/io';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SearchArticleProps {
  setSearchQuery: (val: string) => void;
}

function SearchArticle({ setSearchQuery }: SearchArticleProps) {
  const {
    register,
    handleSubmit,
  } = useForm<{ searchQuery: string }>();

  const onSubmit: SubmitHandler<{ searchQuery: string }> = (formData) =>
    setSearchQuery(formData.searchQuery);

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
        <input
          className="relative py-3 border border-gray-200 rounded-lg pl-10 pr-2 w-full outline-none  focus:outline-1 focus:border-gray-500 shadow-lg"
          type="text"
          placeholder="Search article"
          {...register('searchQuery')}
        />
        <IoIosSearch className="absolute left-2 h-7 w-7 top-2.5 text-gray-600" />
        <button className="bg-blue-700 hover:bg-blue-600 md:absolute md:-top-[9px] md:right-2 md:w-auto md:py-1.5 md:px-4 w-full mt-4 text-white py-3 rounded-md font-semibold">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchArticle;

