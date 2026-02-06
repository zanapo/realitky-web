import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { buildQueryString } from "@/lib/url";

type PaginationLinksProps = {
  page: number;
  totalPages: number;
  baseParams: Record<string, string | number | undefined>;
};

const buildPageLink = (
  baseParams: Record<string, string | number | undefined>,
  page: number
) => `/nemovitosti${buildQueryString({ ...baseParams, page })}`;

export const PaginationLinks = ({
  page,
  totalPages,
  baseParams,
}: PaginationLinksProps) => {
  if (totalPages <= 1) return null;

  const items = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((pageNumber) => {
      if (totalPages <= 5) return true;
      return (
        pageNumber === 1 ||
        pageNumber === totalPages ||
        Math.abs(pageNumber - page) <= 1
      );
    })
    .reduce<(number | "ellipsis")[]>((acc, current, index, array) => {
      if (index > 0 && current - (array[index - 1] as number) > 1) {
        acc.push("ellipsis");
      }
      acc.push(current);
      return acc;
    }, []);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildPageLink(baseParams, Math.max(page - 1, 1))}
          />
        </PaginationItem>
        {items.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href={buildPageLink(baseParams, item)}
                isActive={item === page}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href={buildPageLink(baseParams, Math.min(page + 1, totalPages))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
