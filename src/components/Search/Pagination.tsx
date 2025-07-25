type PaginationProps = {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
};

const RESULTS_PER_PAGE = 10;

function Pagination({
  currentPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center mt-6 mb-6 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded border ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'
          }`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
