import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";

export const PER_PAGE_OPTIONS = [15, 25, 50];

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  onLimitChange?: (limit: number) => void;
  className?: string;
  perPageOptions?: number[];
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 20,
  onLimitChange,
  className,
  perPageOptions = PER_PAGE_OPTIONS,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    pages.push(1);

    if (showEllipsisStart) pages.push("...");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (showEllipsisEnd) pages.push("...");

    if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 !my-0 !mt-inner py-section",
        className,
      )}
    >
      <p className="text-body-3 text-content-tertiary tabular-nums shrink-0">
        {typeof totalItems === "number" && itemsPerPage ? (
          <>
            Showing{" "}
            <span className="font-medium text-content-secondary">
              {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>
            {"–"}
            <span className="font-medium text-content-secondary">
              {Math.min(currentPage * itemsPerPage, totalItems)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-content-secondary">
              {totalItems}
            </span>
          </>
        ) : (
          <>
            Page{" "}
            <span className="font-medium text-content-secondary">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-medium text-content-secondary">
              {totalPages}
            </span>
          </>
        )}
      </p>

      <div className="flex items-center gap-inner self-end sm:self-auto">
        {onLimitChange && (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-body-3 text-content-tertiary whitespace-nowrap">
              Rows per page
            </span>
            <Select
              value={perPageOptions.includes(itemsPerPage) ? String(itemsPerPage) : String(perPageOptions[0])}
              onValueChange={(v) => onLimitChange(Number(v))}
            >
              <SelectTrigger className="h-8 w-16 text-body-3 px-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {perPageOptions.map((n) => (
                  <SelectItem key={n} value={String(n)} className="text-body-3">
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center gap-inner">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1">
            {renderPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-inner text-body-3 text-content-tertiary"
                  >
                    ...
                  </span>
                );
              }

              const pageNumber = page as number;
              const isActive = pageNumber === currentPage;

              return (
                <Button
                  key={pageNumber}
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange(pageNumber)}
                  className={cn(
                    "h-8 min-w-8 w-auto px-1.5 p-0 text-body-3",
                    isActive
                      ? "bg-primary text-content-white hover:bg-primary rounded"
                      : "text-content-primary hover:bg-muted",
                  )}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

Pagination.displayName = "Pagination";

export { Pagination };
export type { PaginationProps };
