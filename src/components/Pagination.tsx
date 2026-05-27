import Button from './Button.tsx';

interface PaginationProps {
    currentPage: number;
    lastPage?: number;
    onPageChange: (page: number) => void;
}

function Pagination(props: PaginationProps) {
    if (!props.lastPage || props.lastPage <= 1) return null;

    return (
        <section className="flex flex-wrap justify-center items-center gap-4 mt-8">
            {Array.from({ length: props.lastPage }).map((_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === props.currentPage;

                return (
                    <Button
                        key={pageNumber}
                        onClick={() => props.onPageChange(pageNumber)}
                        className={isActive ? "opacity-50 cursor-default" : ""}
                        disabled={isActive}
                    >
                        {pageNumber}
                    </Button>
                );
            })}
        </section>
    );
}

export default Pagination;