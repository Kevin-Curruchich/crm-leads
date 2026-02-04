import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
}

/**
 * Custom hook for infinite scroll using Intersection Observer API
 * @param onLoadMore - Callback to load more items
 * @param hasMore - Whether there are more items to load
 * @param isLoading - Whether currently loading (optional)
 * @returns ref to attach to sentinel element
 */
export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  isLoading = false,
}: UseInfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // When sentinel becomes visible, load more
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null, // viewport
        rootMargin: "100px", // trigger 100px before reaching sentinel
        threshold: 0.1,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, hasMore, isLoading]);

  return sentinelRef;
};
