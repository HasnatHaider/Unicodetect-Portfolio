import { ArrowRight } from "lucide-react";
import { clientReviews } from "../../utils/clientReviews";
import ReviewCard from "../sharedUi/ReviewCard";
import { SiteLink } from "../sharedUi/Interactive";
import UiUxSectionHeading from "./UiUxSectionHeading";

const UiUxClientReview = () => (
  <section
    id="uiux-client-review"
    className="uiux-section uiux-client-review"
    aria-labelledby="uiux-client-review-title"
  >
    <div className="uiux-container">
      <div className="uiux-heading-row">
        <UiUxSectionHeading
          eyebrow="CLIENT FEEDBACK"
          id="uiux-client-review-title"
        >
          What the LiftPitch client said
        </UiUxSectionHeading>
        <SiteLink className="uiux-text-link" href="/case-studies/liftpitch">
          Read LiftPitch Story{" "}
          <span aria-hidden="true">
            <ArrowRight size={"1em"} aria-hidden="true" />
          </span>
        </SiteLink>
      </div>
      <ReviewCard review={clientReviews.nesloang} variant="case-study" />
    </div>
  </section>
);

export default UiUxClientReview;
