import ClientLogo from "./ClientLogo";
import "../../assets/styles/components/reviewCard.css";

const ReviewCard = ({ review, variant = "home" }) => {
  if (!review) return null;

  const rating = Number(review.rating);
  const ratingLabel = `${rating.toFixed(1)} out of 5 stars`;

  return (
    <article className={`review-card review-card--${variant}`}>
      {review.logoId && (
        <ClientLogo
          id={review.logoId}
          size={44}
          className="review-card__logo"
        />
      )}
      <p className="review-card__attribution">{review.attribution}</p>
      <div className="review-card__rating-row">
        <span className="review-card__stars" role="img" aria-label={ratingLabel}>
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} aria-hidden="true">
              ★
            </span>
          ))}
        </span>
        <span className="review-card__rating-value">{rating.toFixed(1)}</span>
      </div>

      <blockquote className="review-card__quote">
        <p>{review.quote}</p>
      </blockquote>

      <footer className="review-card__footer">
        <div className="review-card__reviewer">
          <strong>{review.reviewer}</strong>
          <span>{review.country}</span>
        </div>
        <div className="review-card__project">
          <span>{review.project}</span>
          <span>{review.year}</span>
        </div>
        <span className="review-card__verified">Verified on Fiverr</span>
      </footer>
    </article>
  );
};

export default ReviewCard;
