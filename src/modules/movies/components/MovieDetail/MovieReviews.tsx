import { Marquee } from "@/common/components/ui/marquee";
import { MovieReview } from "../../types/movie";
import { Skeleton } from "@/common/components/ui/skeleton";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MovieReviewsProps {
    reviews: MovieReview[],
    isLoading: boolean
}

const ReviewCard: React.FC<{ review: MovieReview }> = ({ review }) => {
  const avatarUrl = review.author_details.avatar_path
    ? review.author_details.avatar_path.startsWith('/')
      ? `https://image.tmdb.org/t/p/w92${review.author_details.avatar_path}`
      : review.author_details.avatar_path
    : "https://www.gravatar.com/avatar/placeholder?d=mp";

  const timeAgo = new Date(review.created_at).toLocaleDateString();

  return (
    <figure className={cn(
      "relative w-64 min-w-64 overflow-hidden rounded-xl border p-4 mx-4 group",
      "border-gray-950/[.1] bg-card  dark:hover:bg-gray-800/80"
    )}>
      <div className="flex items-center mb-3">
        <div className="h-8 w-8 rounded-full overflow-hidden relative mr-3">
          <Image 
            src={avatarUrl} 
            alt={review.author} 
            width={32} 
            height={32}
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://www.gravatar.com/avatar/placeholder?d=mp";
            }}
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="font-medium text-sm">{review.author}</figcaption>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        {review.author_details.rating && (
          <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded ml-auto">
            ★ {review.author_details.rating}/10
          </span>
        )}
      </div>
      <blockquote className="text-sm line-clamp-4 overflow-hidden text-muted-foreground">
        {review.content}
      </blockquote>
      <a 
        href={review.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-xs text-accent mt-2 hover:underline inline-block group-hover:text-primary font-bold"
      >
        Read full review
      </a>
    </figure>
  );
};

const ReviewSkeleton = () => (
  <figure className="relative w-64 min-w-64 overflow-hidden rounded-xl border p-4 mx-4">
    <div className="flex items-center mb-3">
      <Skeleton className="h-8 w-8 rounded-full mr-3" />
      <div className="flex flex-col">
        <Skeleton className="h-4 w-24 mb-1" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-4 w-8 ml-auto" />
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4 mb-2" />
    <Skeleton className="h-3 w-20 mt-2" />
  </figure>
);

export const MovieReviews: React.FC<MovieReviewsProps> = ({
    reviews,
    isLoading
}) => {
  // Split reviews into two rows for better visual effect
  const splitReviews = () => {
    if (!reviews || reviews.length === 0) return [[], []];
    const midpoint = Math.ceil(reviews.length / 2);
    return [reviews.slice(0, midpoint), reviews.slice(midpoint)];
  };
  
  const [firstRow, secondRow] = splitReviews();

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Audience Reviews</h2>
      
      {isLoading ? (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s]">
            {Array(4).fill(0).map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s]">
            {Array(4).fill(0).map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s] mt-4">
            {secondRow.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No reviews available for this movie yet.
        </div>
      )}
    </div>
  );
};
