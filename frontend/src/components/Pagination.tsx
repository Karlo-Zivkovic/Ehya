import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const showPages = () => {
    const pages = [];
    const minPagesToShow = 2;

    for (
      let i = Math.max(1, currentPage - minPagesToShow + 1);
      i <= Math.min(totalPages, currentPage + minPagesToShow - 1);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <SlArrowLeft />
      </button>
      <div className="flex items-center justify-center gap-2">
        {showPages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? 'font-semibold' : 'opacity-50'}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <SlArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
