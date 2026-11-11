import { IMAGES } from "../../utils/Constant";
const AiCaseStudySpotlight = () => {
  return (
    <div
      className="layout-item ai-case-study-spotlight layout-full layout-flex layout section-root is-loaded"
      id="ai-case-study-spotlight"
    >
      <div className="layout-item ai-case-study-spotlight__image width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="664"
            height="664"
            src={IMAGES.unicode_ai_3df464bc_a0d2_43fc_9cfe_8245030f8c73}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item ai-case-study-spotlight__image-2 width-custom position-absolute hide-on-mobile content-block block-image">
        <div className="content-inner">
          <img
            loading="lazy"
            decoding="async"
            width="704"
            height="704"
            src={IMAGES.unicode_ai_ce5916d3_277a_4a23_81b3_ad2f7879b6e6}
            alt=""
          />
        </div>
      </div>
      <div className="layout-item ai-case-study-spotlight__layout layout-flex layout-boxed layout is-loaded">
        <div className="layout-inner is-loaded">
          <div className="layout-item ai-case-study-spotlight__layout-2 layout-full layout-flex layout is-loaded">
            <div className="layout-item ai-case-study-spotlight__layout-3 layout-full layout-flex layout is-loaded">
              <div className="layout-item ai-case-study-spotlight__image-3 width-custom content-block block-image">
                <div className="content-inner">
                  <img
                    loading="lazy"
                    decoding="async"
                    width="6"
                    height="6"
                    src={IMAGES.unicode_ai_abdd0feb_07f5_4c4a_8390_9c82de0c31f9}
                    alt=""
                  />
                </div>
              </div>
              <div className="layout-item ai-case-study-spotlight__featured-case-study content-block block-heading">
                <div className="content-inner">
                  <p className="heading">EXAMPLE SCENARIO</p>
                </div>
              </div>
            </div>
            <div className="layout-item ai-case-study-spotlight__deploying-ai-voice-dispatching-to-mo content-block block-heading">
              <div className="content-inner">
                <h2 className="heading">
                  BellReserve: AI voice receptionist for restaurant calls and
                  reservations.
                </h2>
              </div>
            </div>
            <div className="layout-item ai-case-study-spotlight__we-built-a-customized-conversational content-block block-heading">
              <div className="content-inner">
                <p className="heading">
                  We built BellReserve to answer incoming restaurant calls,
                  capture reservation or order intent, and deliver structured
                  transcripts and recordings to operators. For regulated
                  healthcare or enterprise workflows, we can design for HIPAA
                  and SOC 2 requirements with your compliance team.
                </p>
              </div>
            </div>
            <div className="layout-item ai-case-study-spotlight__layout-4 layout-full layout-flex layout is-loaded">
              <div className="layout-item ai-case-study-spotlight__layout-5 layout-full layout-flex layout is-loaded">
                <div className="layout-item ai-case-study-spotlight__67 content-block block-heading">
                  <div className="content-inner">
                    <h2 className="heading">Live</h2>
                  </div>
                </div>
                <div className="layout-item ai-case-study-spotlight__missed-slot-reduction content-block block-heading">
                  <div className="content-inner">
                    <p className="heading">Voice &amp; Intent Capture</p>
                  </div>
                </div>
              </div>
              <div className="layout-item ai-case-study-spotlight__layout-6 layout-full layout-flex layout is-loaded">
                <div className="layout-item ai-case-study-spotlight__24-7 content-block block-heading">
                  <div className="content-inner">
                    <h2 className="heading">24/7</h2>
                  </div>
                </div>
                <div className="layout-item ai-case-study-spotlight__autonomous-dispatch content-block block-heading">
                  <div className="content-inner">
                    <p className="heading">Automated Call Handling</p>
                  </div>
                </div>
              </div>
              <div className="layout-item ai-case-study-spotlight__layout-7 layout-full layout-flex layout is-loaded">
                <div className="layout-item ai-case-study-spotlight__3-weeks content-block block-heading">
                  <div className="content-inner">
                    <h2 className="heading">Full Context</h2>
                  </div>
                </div>
                <div className="layout-item ai-case-study-spotlight__production-deployment content-block block-heading">
                  <div className="content-inner">
                    <p className="heading">Transcripts &amp; Operator View</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="layout-item ai-case-study-spotlight__layout-8 layout-full layout-flex layout is-loaded">
            <div className="layout-item ai-case-study-spotlight__image-4 content-block block-image">
              <div className="content-inner">
                <img
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="1024"
                  src={IMAGES.unicode_ai_10c3a007_cf7b_4f0b_b939_4b03534ab595}
                  alt="AI voice dispatching system for patient scheduling automation"
                  srcSet={`${IMAGES.unicode_ai_10c3a007_cf7b_4f0b_b939_4b03534ab595} 1024w, ${IMAGES.unicode_ai_10c3a007_cf7b_4f0b_b939_4b03534ab595_300x300} 300w, ${IMAGES.unicode_ai_10c3a007_cf7b_4f0b_b939_4b03534ab595_150x150} 150w, ${IMAGES.unicode_ai_10c3a007_cf7b_4f0b_b939_4b03534ab595_768x768} 768w, ${IMAGES.unicode_ai_10c3a007_cf7b_4f0b_b939_4b03534ab595_650x650} 650w`}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiCaseStudySpotlight;
